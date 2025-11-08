import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, ShoppingBag, Clock, Star } from "lucide-react";
import heroFood from "@/assets/hero-food.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroFood} 
            alt="Delicious food spread" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-lg">
            <UtensilsCrossed className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Campus Canteen
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Order delicious meals from your campus canteen with just a few taps
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/auth")} size="lg" className="text-lg px-8">
              Get Started
            </Button>
            <Button onClick={() => navigate("/menu")} variant="outline" size="lg" className="text-lg px-8">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-muted-foreground">
                Browse menu, select items, and place orders in seconds
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Service</h3>
              <p className="text-muted-foreground">
                Get real-time updates on your order status
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
              <p className="text-muted-foreground">
                Fresh, delicious meals prepared with care
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
