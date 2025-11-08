import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface FoodCardProps {
  name: string;
  cost: number;
  category: "veg" | "nonveg";
  special: boolean;
  image?: string;
  onAddToCart: () => void;
}

export const FoodCard = ({ name, cost, category, special, image, onAddToCart }: FoodCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-4 h-4 border-2 flex items-center justify-center ${
                category === "veg" ? "border-veg" : "border-nonveg"
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  category === "veg" ? "bg-veg" : "bg-nonveg"
                }`} />
              </div>
              <h3 className="font-semibold text-card-foreground">{name}</h3>
            </div>
            {special && (
              <Badge variant="secondary" className="bg-special text-special-foreground mb-2">
                Special
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-primary">₹{cost}</p>
          <Button 
            onClick={onAddToCart}
            size="icon"
            className="rounded-full transition-transform group-hover:scale-110"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
