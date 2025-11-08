import { useState } from "react";
import { FoodCard } from "@/components/FoodCard";
import { CartSheet, CartItem } from "@/components/CartSheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";

const menuItems = {
  veg: [
    { id: "veg-1", name: "Veg Biryani", cost: 90, special: false },
    { id: "veg-2", name: "Paneer Butter Masala", cost: 120, special: true },
    { id: "veg-3", name: "Veg Combo Meal", cost: 150, special: true },
  ],
  nonveg: [
    { id: "nonveg-1", name: "Chicken Biryani", cost: 160, special: true },
    { id: "nonveg-2", name: "Chicken Fry", cost: 130, special: false },
    { id: "nonveg-3", name: "Fish Curry Meal", cost: 180, special: true },
  ],
};

const Menu = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (item: { id: string; name: string; cost: number }, category: "veg" | "nonveg") => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, category, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} added to your cart`,
    });
  };

  const handleUpdateQuantity = (id: string, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroFood} 
          alt="Delicious food" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">Campus Canteen</h1>
          <p className="text-muted-foreground">Order your favorite meals</p>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Menu</h2>
          <div className="flex items-center gap-2">
            <CartSheet
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="veg" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="veg">Veg</TabsTrigger>
            <TabsTrigger value="nonveg">Non-Veg</TabsTrigger>
          </TabsList>
          
          <TabsContent value="veg" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.veg.map((item) => (
                <FoodCard
                  key={item.id}
                  name={item.name}
                  cost={item.cost}
                  category="veg"
                  special={item.special}
                  onAddToCart={() => handleAddToCart(item, "veg")}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="nonveg" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.nonveg.map((item) => (
                <FoodCard
                  key={item.id}
                  name={item.name}
                  cost={item.cost}
                  category="nonveg"
                  special={item.special}
                  onAddToCart={() => handleAddToCart(item, "nonveg")}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Menu;
