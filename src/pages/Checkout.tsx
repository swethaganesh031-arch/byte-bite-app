import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/components/CartSheet";
import { CreditCard, Banknote, Smartphone, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const cartItems = (location.state?.cartItems || []) as CartItem[];
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order placed successfully!",
        description: "Your food is being prepared",
      });
      navigate("/order-status", { 
        state: { 
          orderId: `ORD${Date.now()}`,
          total,
          items: cartItems 
        } 
      });
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => navigate("/menu")}>Go to Menu</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/menu")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Menu
        </Button>

        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 border-2 ${
                    item.category === "veg" ? "border-veg" : "border-nonveg"
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      item.category === "veg" ? "bg-veg" : "bg-nonveg"
                    }`} />
                  </div>
                  <span>{item.name} × {item.quantity}</span>
                </div>
                <span className="font-medium">₹{item.cost * item.quantity}</span>
              </div>
            ))}
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount</span>
                  <span className="text-secondary">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>GST (5%)</span>
                <span>₹{(subtotal * 0.05).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total Payment</span>
                <span className="text-primary">₹{(subtotal * 1.05).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <span>UPI</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span>Card</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                  <span>Cash</span>
                </Label>
              </div>
            </RadioGroup>

            <Button 
              onClick={handlePlaceOrder} 
              className="w-full mt-6" 
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Place Order • ₹${total}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
