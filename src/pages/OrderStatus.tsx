import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, UtensilsCrossed, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { orderId, total, items } = location.state || {};
  const [status, setStatus] = useState<"preparing" | "ready" | "completed">("preparing");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Simulate order status updates
    const timer1 = setTimeout(() => setStatus("ready"), 3000);
    const timer2 = setTimeout(() => setStatus("completed"), 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSubmitFeedback = () => {
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate your input",
    });
    navigate("/menu");
  };

  if (!orderId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">No order found</p>
            <Button onClick={() => navigate("/menu")}>Go to Menu</Button>
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
            <CardTitle>Order #{orderId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Timeline */}
            <div className="space-y-4">
              <div className={`flex items-center gap-4 ${status === "preparing" ? "text-primary" : "text-muted-foreground"}`}>
                <div className={`rounded-full p-2 ${status !== "preparing" ? "bg-primary text-primary-foreground" : "bg-primary/10"}`}>
                  {status !== "preparing" ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-semibold">Order Accepted</p>
                  <p className="text-sm text-muted-foreground">Your food is being prepared</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-4 ${status === "ready" ? "text-primary" : status === "completed" ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                <div className={`rounded-full p-2 ${status === "completed" ? "bg-primary text-primary-foreground" : status === "ready" ? "bg-primary/10" : "bg-muted"}`}>
                  {status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : <UtensilsCrossed className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-semibold">Food Ready</p>
                  <p className="text-sm text-muted-foreground">Your order is ready for pickup</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-4 ${status === "completed" ? "text-primary" : "text-muted-foreground/50"}`}>
                <div className={`rounded-full p-2 ${status === "completed" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
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
              {items?.map((item: any) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.cost * item.quantity}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        {status === "completed" && (
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
