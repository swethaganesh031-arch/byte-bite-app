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
import omelette from "@/assets/food/omelette.jpg";
import sandwich from "@/assets/food/sandwich.jpg";
import baconEggs from "@/assets/food/bacon-eggs.jpg";
import frenchToast from "@/assets/food/french-toast.jpg";
import choleBhature from "@/assets/food/chole-bhature.jpg";
import vegManchurian from "@/assets/food/veg-manchurian.jpg";
import hakkaNoodles from "@/assets/food/hakka-noodles.jpg";
import lasagna from "@/assets/food/lasagna.jpg";
import grilledVeg from "@/assets/food/grilled-veg.jpg";
import risotto from "@/assets/food/risotto.jpg";
import quesadilla from "@/assets/food/quesadilla.jpg";
import chickenFry from "@/assets/food/chicken-fry.jpg";
import fishCurry from "@/assets/food/fish-curry.jpg";
import muttonRoganJosh from "@/assets/food/mutton-rogan-josh.jpg";
import chickenManchurian from "@/assets/food/chicken-manchurian.jpg";
import prawnsSzechuan from "@/assets/food/prawns-szechuan.jpg";
import chickenPasta from "@/assets/food/chicken-pasta.jpg";
import fishChips from "@/assets/food/fish-chips.jpg";
import beefBurrito from "@/assets/food/beef-burrito.jpg";
import teriyaki from "@/assets/food/teriyaki.jpg";
import springRolls from "@/assets/food/spring-rolls.jpg";
import garlicBread from "@/assets/food/garlic-bread.jpg";
import nachos from "@/assets/food/nachos.jpg";
import pakora from "@/assets/food/pakora.jpg";
import fishFingers from "@/assets/food/fish-fingers.jpg";
import nuggets from "@/assets/food/nuggets.jpg";
import tempura from "@/assets/food/tempura.jpg";
import watermelonJuice from "@/assets/food/watermelon-juice.jpg";
import mangoSmoothie from "@/assets/food/mango-smoothie.jpg";
import mixedJuice from "@/assets/food/mixed-juice.jpg";
import coldCoffee from "@/assets/food/cold-coffee.jpg";
import lassi from "@/assets/food/lassi.jpg";
import vanilla from "@/assets/food/vanilla.jpg";
import chocolateIce from "@/assets/food/chocolate-ice.jpg";
import strawberryIce from "@/assets/food/strawberry-ice.jpg";
import butterscotchSundae from "@/assets/food/butterscotch-sundae.jpg";
import chocoSundae from "@/assets/food/choco-sundae.jpg";
import kulfi from "@/assets/food/kulfi.jpg";
import mochi from "@/assets/food/mochi.jpg";
import churros from "@/assets/food/churros.jpg";

// Map food item IDs to images
export const foodImageMap: Record<string, string> = {
  // Breakfast Veg
  "bf-veg-1": idli,
  "bf-veg-2": dosa,
  "bf-veg-3": poha,
  "bf-veg-4": pancakes,
  "bf-veg-5": frenchToast,
  
  // Breakfast Non-Veg
  "bf-nv-1": omelette,
  "bf-nv-2": sandwich,
  "bf-nv-3": baconEggs,
  
  // Main Veg
  "mn-veg-1": vegBiryani,
  "mn-veg-2": paneerMasala,
  "mn-veg-3": dal,
  "mn-veg-4": choleBhature,
  "mn-veg-5": friedRice,
  "mn-veg-6": vegManchurian,
  "mn-veg-7": hakkaNoodles,
  "mn-veg-8": pizza,
  "mn-veg-9": pasta,
  "mn-veg-10": lasagna,
  "mn-veg-11": grilledVeg,
  "mn-veg-12": risotto,
  "mn-veg-13": tacos,
  "mn-veg-14": burrito,
  "mn-veg-15": quesadilla,
  
  // Main Non-Veg
  "mn-nv-1": chickenBiryani,
  "mn-nv-2": chickenFry,
  "mn-nv-3": fishCurry,
  "mn-nv-4": muttonRoganJosh,
  "mn-nv-5": friedRice,
  "mn-nv-6": chickenManchurian,
  "mn-nv-7": prawnsSzechuan,
  "mn-nv-8": pizza,
  "mn-nv-9": chickenPasta,
  "mn-nv-10": steak,
  "mn-nv-11": fishChips,
  "mn-nv-12": tacos,
  "mn-nv-13": beefBurrito,
  "mn-nv-14": teriyaki,
  "mn-nv-15": sushi,
  
  // Snacks Veg
  "sn-veg-1": samosa,
  "sn-veg-2": springRolls,
  "sn-veg-3": garlicBread,
  "sn-veg-4": fries,
  "sn-veg-5": nachos,
  "sn-veg-6": pakora,
  
  // Snacks Non-Veg
  "sn-nv-1": wings,
  "sn-nv-2": fishFingers,
  "sn-nv-3": nuggets,
  "sn-nv-4": tempura,
  
  // Beverages
  "bv-1": orangeJuice,
  "bv-2": watermelonJuice,
  "bv-3": mangoSmoothie,
  "bv-4": mixedJuice,
  "bv-5": coldCoffee,
  "bv-6": chai,
  "bv-7": lassi,
  
  // Ice Cream
  "ic-1": vanilla,
  "ic-2": chocolateIce,
  "ic-3": strawberryIce,
  "ic-4": butterscotchSundae,
  "ic-5": chocoSundae,
  "ic-6": kulfi,
  
  // Desserts
  "ds-1": gulabJamun,
  "ds-2": rasmalai,
  "ds-3": tiramisu,
  "ds-4": brownie,
  "ds-5": cheesecake,
  "ds-6": mochi,
  "ds-7": churros,
};

export const getImageForItem = (id: string): string => {
  return foodImageMap[id] || vegBiryani; // Default fallback image
};
