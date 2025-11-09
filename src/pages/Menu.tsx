import { useState } from "react";
import { FoodCard } from "@/components/FoodCard";
import { CartSheet, CartItem } from "@/components/CartSheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";
import { getImageForItem } from "@/utils/foodImages";
// Firebase imports
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const menuItems = {
  // Breakfast
  breakfast: {
    veg: [
      { id: "bf-veg-1", name: "Idli Sambar", cost: 50, special: false, cuisine: "Indian" },
      { id: "bf-veg-2", name: "Masala Dosa", cost: 70, special: true, cuisine: "Indian" },
      { id: "bf-veg-3", name: "Poha", cost: 40, special: false, cuisine: "Indian" },
      { id: "bf-veg-4", name: "Pancakes", cost: 80, special: false, cuisine: "Continental" },
      { id: "bf-veg-5", name: "French Toast", cost: 90, special: true, cuisine: "Continental" },
    ],
    nonveg: [
      { id: "bf-nv-1", name: "Egg Omelette", cost: 60, special: false, cuisine: "Continental" },
      { id: "bf-nv-2", name: "Chicken Sandwich", cost: 100, special: false, cuisine: "Continental" },
      { id: "bf-nv-3", name: "Bacon & Eggs", cost: 120, special: true, cuisine: "Continental" },
    ],
  },
  
  // Lunch & Dinner
  main: {
    veg: [
      // Indian
      { id: "mn-veg-1", name: "Veg Biryani", cost: 90, special: false, cuisine: "Indian" },
      { id: "mn-veg-2", name: "Paneer Butter Masala", cost: 120, special: true, cuisine: "Indian" },
      { id: "mn-veg-3", name: "Dal Tadka with Rice", cost: 80, special: false, cuisine: "Indian" },
      { id: "mn-veg-4", name: "Chole Bhature", cost: 100, special: true, cuisine: "Indian" },
      // Chinese
      { id: "mn-veg-5", name: "Veg Fried Rice", cost: 110, special: false, cuisine: "Chinese" },
      { id: "mn-veg-6", name: "Veg Manchurian", cost: 130, special: true, cuisine: "Chinese" },
      { id: "mn-veg-7", name: "Veg Hakka Noodles", cost: 120, special: false, cuisine: "Chinese" },
      // Italian
      { id: "mn-veg-8", name: "Margherita Pizza", cost: 180, special: true, cuisine: "Italian" },
      { id: "mn-veg-9", name: "Pasta Alfredo", cost: 150, special: false, cuisine: "Italian" },
      { id: "mn-veg-10", name: "Veg Lasagna", cost: 170, special: true, cuisine: "Italian" },
      // Continental
      { id: "mn-veg-11", name: "Grilled Veg Platter", cost: 160, special: false, cuisine: "Continental" },
      { id: "mn-veg-12", name: "Mushroom Risotto", cost: 190, special: true, cuisine: "Continental" },
      // Mexican
      { id: "mn-veg-13", name: "Veg Tacos", cost: 140, special: false, cuisine: "Mexican" },
      { id: "mn-veg-14", name: "Bean Burrito", cost: 150, special: true, cuisine: "Mexican" },
      { id: "mn-veg-15", name: "Veg Quesadilla", cost: 130, special: false, cuisine: "Mexican" },
    ],
    nonveg: [
      // Indian
      { id: "mn-nv-1", name: "Chicken Biryani", cost: 160, special: true, cuisine: "Indian" },
      { id: "mn-nv-2", name: "Chicken Fry", cost: 130, special: false, cuisine: "Indian" },
      { id: "mn-nv-3", name: "Fish Curry Meal", cost: 180, special: true, cuisine: "Indian" },
      { id: "mn-nv-4", name: "Mutton Rogan Josh", cost: 220, special: true, cuisine: "Indian" },
      // Chinese
      { id: "mn-nv-5", name: "Chicken Fried Rice", cost: 140, special: false, cuisine: "Chinese" },
      { id: "mn-nv-6", name: "Chicken Manchurian", cost: 160, special: true, cuisine: "Chinese" },
      { id: "mn-nv-7", name: "Prawns in Szechuan Sauce", cost: 200, special: true, cuisine: "Chinese" },
      // Italian
      { id: "mn-nv-8", name: "Chicken Pizza", cost: 220, special: true, cuisine: "Italian" },
      { id: "mn-nv-9", name: "Chicken Pasta", cost: 180, special: false, cuisine: "Italian" },
      // Continental
      { id: "mn-nv-10", name: "Grilled Chicken Steak", cost: 240, special: true, cuisine: "Continental" },
      { id: "mn-nv-11", name: "Fish & Chips", cost: 200, special: false, cuisine: "Continental" },
      // Mexican
      { id: "mn-nv-12", name: "Chicken Tacos", cost: 170, special: false, cuisine: "Mexican" },
      { id: "mn-nv-13", name: "Beef Burrito", cost: 190, special: true, cuisine: "Mexican" },
      // Japanese
      { id: "mn-nv-14", name: "Chicken Teriyaki", cost: 210, special: true, cuisine: "Japanese" },
      { id: "mn-nv-15", name: "Salmon Sushi Roll", cost: 250, special: true, cuisine: "Japanese" },
    ],
  },
  
  // Snacks
  snacks: {
    veg: [
      { id: "sn-veg-1", name: "Samosa", cost: 30, special: false, cuisine: "Indian" },
      { id: "sn-veg-2", name: "Veg Spring Rolls", cost: 80, special: false, cuisine: "Chinese" },
      { id: "sn-veg-3", name: "Garlic Bread", cost: 90, special: false, cuisine: "Italian" },
      { id: "sn-veg-4", name: "French Fries", cost: 70, special: false, cuisine: "Continental" },
      { id: "sn-veg-5", name: "Nachos with Salsa", cost: 100, special: true, cuisine: "Mexican" },
      { id: "sn-veg-6", name: "Pakora Platter", cost: 60, special: false, cuisine: "Indian" },
    ],
    nonveg: [
      { id: "sn-nv-1", name: "Chicken Wings", cost: 120, special: true, cuisine: "Continental" },
      { id: "sn-nv-2", name: "Fish Fingers", cost: 110, special: false, cuisine: "Continental" },
      { id: "sn-nv-3", name: "Chicken Nuggets", cost: 100, special: false, cuisine: "Continental" },
      { id: "sn-nv-4", name: "Prawn Tempura", cost: 180, special: true, cuisine: "Japanese" },
    ],
  },
  
  // Beverages
  beverages: [
    { id: "bv-1", name: "Fresh Orange Juice", cost: 60, special: false, cuisine: "Juice" },
    { id: "bv-2", name: "Watermelon Juice", cost: 50, special: false, cuisine: "Juice" },
    { id: "bv-3", name: "Mango Smoothie", cost: 80, special: true, cuisine: "Juice" },
    { id: "bv-4", name: "Mixed Fruit Juice", cost: 70, special: false, cuisine: "Juice" },
    { id: "bv-5", name: "Cold Coffee", cost: 90, special: true, cuisine: "Beverage" },
    { id: "bv-6", name: "Masala Chai", cost: 30, special: false, cuisine: "Beverage" },
    { id: "bv-7", name: "Lassi", cost: 50, special: false, cuisine: "Indian" },
  ],
  
  // Ice Creams
  icecream: [
    { id: "ic-1", name: "Vanilla Scoop", cost: 40, special: false, cuisine: "Dessert" },
    { id: "ic-2", name: "Chocolate Scoop", cost: 40, special: false, cuisine: "Dessert" },
    { id: "ic-3", name: "Strawberry Scoop", cost: 45, special: false, cuisine: "Dessert" },
    { id: "ic-4", name: "Butterscotch Sundae", cost: 80, special: true, cuisine: "Dessert" },
    { id: "ic-5", name: "Chocolate Fudge Sundae", cost: 90, special: true, cuisine: "Dessert" },
    { id: "ic-6", name: "Kulfi", cost: 50, special: false, cuisine: "Indian" },
  ],
  
  // Desserts
  desserts: [
    { id: "ds-1", name: "Gulab Jamun", cost: 50, special: false, cuisine: "Indian" },
    { id: "ds-2", name: "Ras Malai", cost: 60, special: true, cuisine: "Indian" },
    { id: "ds-3", name: "Tiramisu", cost: 120, special: true, cuisine: "Italian" },
    { id: "ds-4", name: "Chocolate Brownie", cost: 80, special: false, cuisine: "Continental" },
    { id: "ds-5", name: "Cheesecake", cost: 110, special: true, cuisine: "Continental" },
    { id: "ds-6", name: "Mochi", cost: 90, special: false, cuisine: "Japanese" },
    { id: "ds-7", name: "Churros", cost: 100, special: true, cuisine: "Mexican" },
  ],
};

const Menu = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (item: { id: string; name: string; cost: number; cuisine?: string }, category: "veg" | "nonveg") => {
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

  const simulateOrderNotifications = () => {
    setTimeout(() => {
      toast({
        title: "Food is being prepared! 👨‍🍳",
        description: "Your order is being prepared by our chefs",
      });
    }, 2000);

    setTimeout(() => {
      toast({
        title: "Food is Ready! 🍽️",
        description: "Your order is ready for pickup",
      });
    }, 8000);

    setTimeout(() => {
      toast({
        title: "Order Delivered! ✅",
        description: "Enjoy your meal!",
      });
    }, 14000);
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
    if (cartItems.length > 0) {
      simulateOrderNotifications();
      navigate("/checkout", { state: { cartItems } });
    } else {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart first",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
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
        <Tabs defaultValue="breakfast" className="w-full">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="main">Lunch/Dinner</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
            <TabsTrigger value="beverages">Beverages</TabsTrigger>
            <TabsTrigger value="icecream">Ice Cream</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
          </TabsList>

          {/* Breakfast */}
          <TabsContent value="breakfast">
            <Tabs defaultValue="veg" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                <TabsTrigger value="veg">Veg</TabsTrigger>
                <TabsTrigger value="nonveg">Non-Veg</TabsTrigger>
              </TabsList>
              
              <TabsContent value="veg" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.breakfast.veg.map((item) => (
                    <FoodCard
                      key={item.id}
                      name={item.name}
                      cost={item.cost}
                      category="veg"
                      special={item.special}
                      image={getImageForItem(item.id)}
                      onAddToCart={() => handleAddToCart(item, "veg")}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="nonveg" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.breakfast.nonveg.map((item) => (
                    <FoodCard
                      key={item.id}
                      name={item.name}
                      cost={item.cost}
                      category="nonveg"
                      special={item.special}
                      image={getImageForItem(item.id)}
                      onAddToCart={() => handleAddToCart(item, "nonveg")}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Main Meals (Lunch/Dinner) */}
          <TabsContent value="main">
            <Tabs defaultValue="veg" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                <TabsTrigger value="veg">Veg</TabsTrigger>
                <TabsTrigger value="nonveg">Non-Veg</TabsTrigger>
              </TabsList>
              
              <TabsContent value="veg" className="space-y-6">
                {["Indian", "Chinese", "Italian", "Continental", "Mexican"].map(cuisine => {
                  const items = menuItems.main.veg.filter(item => item.cuisine === cuisine);
                  if (items.length === 0) return null;
                  return (
                    <div key={cuisine}>
                      <h3 className="text-xl font-semibold mb-4 text-foreground">{cuisine} Cuisine</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((item) => (
                          <FoodCard
                            key={item.id}
                            name={item.name}
                            cost={item.cost}
                            category="veg"
                            special={item.special}
                            image={getImageForItem(item.id)}
                            onAddToCart={() => handleAddToCart(item, "veg")}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="nonveg" className="space-y-6">
                {["Indian", "Chinese", "Italian", "Continental", "Mexican", "Japanese"].map(cuisine => {
                  const items = menuItems.main.nonveg.filter(item => item.cuisine === cuisine);
                  if (items.length === 0) return null;
                  return (
                    <div key={cuisine}>
                      <h3 className="text-xl font-semibold mb-4 text-foreground">{cuisine} Cuisine</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((item) => (
                          <FoodCard
                            key={item.id}
                            name={item.name}
                            cost={item.cost}
                            category="nonveg"
                            special={item.special}
                            image={getImageForItem(item.id)}
                            onAddToCart={() => handleAddToCart(item, "nonveg")}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Snacks */}
          <TabsContent value="snacks">
            <Tabs defaultValue="veg" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                <TabsTrigger value="veg">Veg</TabsTrigger>
                <TabsTrigger value="nonveg">Non-Veg</TabsTrigger>
              </TabsList>
              
              <TabsContent value="veg" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.snacks.veg.map((item) => (
                    <FoodCard
                      key={item.id}
                      name={item.name}
                      cost={item.cost}
                      category="veg"
                      special={item.special}
                      image={getImageForItem(item.id)}
                      onAddToCart={() => handleAddToCart(item, "veg")}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="nonveg" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.snacks.nonveg.map((item) => (
                    <FoodCard
                      key={item.id}
                      name={item.name}
                      cost={item.cost}
                      category="nonveg"
                      special={item.special}
                      image={getImageForItem(item.id)}
                      onAddToCart={() => handleAddToCart(item, "nonveg")}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Beverages */}
          <TabsContent value="beverages" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.beverages.map((item) => (
                <FoodCard
                  key={item.id}
                  name={item.name}
                  cost={item.cost}
                  category="veg"
                  special={item.special}
                  image={getImageForItem(item.id)}
                  onAddToCart={() => handleAddToCart(item, "veg")}
                />
              ))}
            </div>
          </TabsContent>

          {/* Ice Cream */}
          <TabsContent value="icecream" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.icecream.map((item) => (
                <FoodCard
                  key={item.id}
                  name={item.name}
                  cost={item.cost}
                  category="veg"
                  special={item.special}
                  image={getImageForItem(item.id)}
                  onAddToCart={() => handleAddToCart(item, "veg")}
                />
              ))}
            </div>
          </TabsContent>

          {/* Desserts */}
          <TabsContent value="desserts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.desserts.map((item) => (
                <FoodCard
                  key={item.id}
                  name={item.name}
                  cost={item.cost}
                  category="veg"
                  special={item.special}
                  image={getImageForItem(item.id)}
                  onAddToCart={() => handleAddToCart(item, "veg")}
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