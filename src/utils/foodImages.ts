// Import all food images
import vegBiryani from "@/assets/food/veg-biryani.jpg";
import paneerMasala from "@/assets/food/paneer-masala.jpg";
import chickenBiryani from "@/assets/food/chicken-biryani.jpg";
import friedRice from "@/assets/food/fried-rice.jpg";
import pizza from "@/assets/food/pizza.jpg";
import pasta from "@/assets/food/pasta.jpg";
import tacos from "@/assets/food/tacos.jpg";
import sushi from "@/assets/food/sushi.jpg";
import idli from "@/assets/food/idli.jpg";
import dosa from "@/assets/food/dosa.jpg";
import pancakes from "@/assets/food/pancakes.jpg";
import samosa from "@/assets/food/samosa.jpg";
import fries from "@/assets/food/fries.jpg";
import orangeJuice from "@/assets/food/orange-juice.jpg";
import smoothie from "@/assets/food/smoothie.jpg";
import icecream from "@/assets/food/icecream.jpg";
import sundae from "@/assets/food/sundae.jpg";
import gulabJamun from "@/assets/food/gulab-jamun.jpg";
import tiramisu from "@/assets/food/tiramisu.jpg";
import brownie from "@/assets/food/brownie.jpg";
import dal from "@/assets/food/dal.jpg";
import wings from "@/assets/food/wings.jpg";
import steak from "@/assets/food/steak.jpg";
import burrito from "@/assets/food/burrito.jpg";
import chai from "@/assets/food/chai.jpg";
import poha from "@/assets/food/poha.jpg";
import cheesecake from "@/assets/food/cheesecake.jpg";
import rasmalai from "@/assets/food/rasmalai.jpg";

// Map food item IDs to images
export const foodImageMap: Record<string, string> = {
  // Breakfast Veg
  "bf-veg-1": idli,
  "bf-veg-2": dosa,
  "bf-veg-3": poha,
  "bf-veg-4": pancakes,
  "bf-veg-5": pancakes,
  
  // Breakfast Non-Veg
  "bf-nv-1": pancakes,
  "bf-nv-2": fries,
  "bf-nv-3": pancakes,
  
  // Main Veg
  "mn-veg-1": vegBiryani,
  "mn-veg-2": paneerMasala,
  "mn-veg-3": dal,
  "mn-veg-4": paneerMasala,
  "mn-veg-5": friedRice,
  "mn-veg-6": friedRice,
  "mn-veg-7": friedRice,
  "mn-veg-8": pizza,
  "mn-veg-9": pasta,
  "mn-veg-10": pasta,
  "mn-veg-11": pasta,
  "mn-veg-12": pasta,
  "mn-veg-13": tacos,
  "mn-veg-14": burrito,
  "mn-veg-15": tacos,
  
  // Main Non-Veg
  "mn-nv-1": chickenBiryani,
  "mn-nv-2": wings,
  "mn-nv-3": dal,
  "mn-nv-4": paneerMasala,
  "mn-nv-5": friedRice,
  "mn-nv-6": friedRice,
  "mn-nv-7": friedRice,
  "mn-nv-8": pizza,
  "mn-nv-9": pasta,
  "mn-nv-10": steak,
  "mn-nv-11": steak,
  "mn-nv-12": tacos,
  "mn-nv-13": burrito,
  "mn-nv-14": steak,
  "mn-nv-15": sushi,
  
  // Snacks Veg
  "sn-veg-1": samosa,
  "sn-veg-2": samosa,
  "sn-veg-3": fries,
  "sn-veg-4": fries,
  "sn-veg-5": fries,
  "sn-veg-6": samosa,
  
  // Snacks Non-Veg
  "sn-nv-1": wings,
  "sn-nv-2": fries,
  "sn-nv-3": wings,
  "sn-nv-4": wings,
  
  // Beverages
  "bv-1": orangeJuice,
  "bv-2": orangeJuice,
  "bv-3": smoothie,
  "bv-4": smoothie,
  "bv-5": smoothie,
  "bv-6": chai,
  "bv-7": smoothie,
  
  // Ice Cream
  "ic-1": icecream,
  "ic-2": icecream,
  "ic-3": icecream,
  "ic-4": sundae,
  "ic-5": sundae,
  "ic-6": icecream,
  
  // Desserts
  "ds-1": gulabJamun,
  "ds-2": rasmalai,
  "ds-3": tiramisu,
  "ds-4": brownie,
  "ds-5": cheesecake,
  "ds-6": icecream,
  "ds-7": brownie,
};

export const getImageForItem = (id: string): string => {
  return foodImageMap[id] || vegBiryani; // Default fallback image
};
