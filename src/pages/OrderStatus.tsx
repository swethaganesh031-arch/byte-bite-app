import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, UtensilsCrossed, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
// Firebase imports
import { db, analytics } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { logEvent } from "firebase/analytics";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  cost: number;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "accepted" | "rejected" | "preparing" | "ready" | "completed";
  timestamp: Date;
}

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { orderId } = location.state || {};
  const [order, setOrder] = useState<Order | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Fetch order data from Firestore
  useEffect(() => {
    if (!orderId) {
      navigate("/menu");
      return;
    }

    const orderRef = doc(db, "orders", orderId);
    const unsubscribe = onSnapshot(orderRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setOrder({
          id: doc.id,
          userId: data.userId,
          userName: data.userName,
          userEmail: data.userEmail,
          items: data.items,
          total: data.total,
          status: data.status,
          timestamp: data.timestamp.toDate()
        });
      } else {
        navigate("/menu");
      }
    }, (error) => {
      console.error("Error fetching order:", error);
      if (analytics) {
        logEvent(analytics, 'order_status_fetch_error', { error: error.message });
      }
      navigate("/menu");
    });

    return () => unsubscribe();
  }, [orderId, navigate]);

  const handleSubmitFeedback = () => {
    // Log feedback submission
    if (analytics) {
      logEvent(analytics, 'submit_feedback', {
        order_id: orderId,
        rating: rating,
        has_feedback: !!feedback
      });
    }
    
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input",
    });
    navigate("/menu");
  };

  if (!orderId || !order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">Loading order...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Timeline */}
            <div className="space-y-4">
              <div className={`flex items-center gap-4 ${order.status === "pending" || order.status === "accepted" || order.status === "preparing" ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`rounded-full p-2 ${order.status !== "pending" ? "bg-primary text-primary-foreground" : "bg-primary/10"}`}>
                  {order.status !== "pending" ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-semibold">Order Accepted</p>
                  <p className="text-sm text-muted-foreground">Your food is being prepared</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-4 ${order.status === "preparing" || order.status === "ready" || order.status === "completed" ? "text-primary" : order.status === "accepted" ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                <div className={`rounded-full p-2 ${order.status === "preparing" || order.status === "ready" || order.status === "completed" ? "bg-primary text-primary-foreground" : order.status === "accepted" ? "bg-primary/10" : "bg-muted"}`}>
                  {order.status === "preparing" || order.status === "ready" || order.status === "completed" ? <UtensilsCrossed className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-semibold">Food Ready</p>
                  <p className="text-sm text-muted-foreground">Your order is ready for pickup</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-4 ${order.status === "completed" ? "text-primary" : "text-muted-foreground/50"}`}>
                <div className={`rounded-full p-2 ${order.status === "completed" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Completed</p>
                  <p className="text-sm text-muted-foreground">Order delivered successfully</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Order Items</h3>
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.cost * item.quantity}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        {order.status === "completed" && (
          <Card>
            <CardHeader>
              <CardTitle>Rate Your Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating ? "fill-accent text-accent" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="feedback">Comments</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your feedback..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button onClick={handleSubmitFeedback} className="w-full">
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;