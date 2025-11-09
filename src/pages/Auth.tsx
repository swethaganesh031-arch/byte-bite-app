import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { UtensilsCrossed } from "lucide-react";
// Firebase imports
import { auth, analytics } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { logEvent } from "firebase/analytics";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    loginId: "",
    loginPassword: "",
    signupName: "",
    signupEmail: "",
    signupPhone: "",
    signupPassword: "",
    signupConfirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Check if trying to access admin panel with special credentials
      if (formData.loginId === "admin" && formData.loginPassword === "admin123") {
        // For demo purposes, we'll create a temporary admin user
        // In a real app, you would have a proper admin user in Firebase
        logEvent(analytics, 'admin_login', { method: 'admin_panel' });
        toast({
          title: "Admin Access",
          description: "Redirecting to admin panel",
        });
        navigate("/admin");
        return;
      }
      
      // Using email as login ID for Firebase authentication
      await signInWithEmailAndPassword(auth, formData.loginId, formData.loginPassword);
      
      // Log login event
      logEvent(analytics, 'login', { method: 'email' });
      
      // Check if user is admin
      if (formData.loginId === "admin@bytebite.com") {
        navigate("/admin");
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in",
        });
        navigate("/menu");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      logEvent(analytics, 'login_error', { error: error.message });
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again or sign up for a new account.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if passwords match
    if (formData.signupPassword !== formData.signupConfirmPassword) {
      toast({
        title: "Signup failed",
        description: "Passwords do not match",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.signupEmail, 
        formData.signupPassword
      );
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: formData.signupName
      });
      
      // Log signup event
      logEvent(analytics, 'sign_up', { method: 'email' });
      
      // Save additional user data (phone) to Firestore could be added here
      
      toast({
        title: "Account created!",
        description: "Welcome to Campus Canteen",
      });
      
      navigate("/menu");
    } catch (error: any) {
      console.error("Signup error:", error);
      logEvent(analytics, 'signup_error', { error: error.message });
      toast({
        title: "Signup failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Campus Canteen</CardTitle>
          <CardDescription>Order delicious meals from your campus canteen</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginId">Email</Label>
                  <Input 
                    id="loginId" 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    value={formData.loginId}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input 
                    id="loginPassword" 
                    type="password" 
                    placeholder="Enter your password" 
                    required 
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                
                {/* Login instructions */}
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p className="mb-2">First time? <button 
                    type="button" 
                    className="text-primary underline"
                    onClick={() => {
                      // Switch to signup tab
                      const tabsList = document.querySelector('[role="tablist"]');
                      if (tabsList) {
                        const signupTab = tabsList.querySelector('[value="signup"]') as HTMLButtonElement;
                        if (signupTab) signupTab.click();
                      }
                    }}
                  >
                    Create an account
                  </button></p>
                  <p>Admin login: admin@bytebite.com / admin123</p>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signupName">Name</Label>
                  <Input 
                    id="signupName" 
                    type="text" 
                    placeholder="Enter your name" 
                    required 
                    value={formData.signupName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input 
                    id="signupEmail" 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    value={formData.signupEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPhone">Phone</Label>
                  <Input 
                    id="signupPhone" 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    required 
                    value={formData.signupPhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input 
                    id="signupPassword" 
                    type="password" 
                    placeholder="Create a password" 
                    required 
                    value={formData.signupPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupConfirmPassword">Confirm Password</Label>
                  <Input 
                    id="signupConfirmPassword" 
                    type="password" 
                    placeholder="Confirm your password" 
                    required 
                    value={formData.signupConfirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
                
                {/* Signup instructions */}
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>Already have an account? <button 
                    type="button" 
                    className="text-primary underline"
                    onClick={() => {
                      // Switch to login tab
                      const tabsList = document.querySelector('[role="tablist"]');
                      if (tabsList) {
                        const loginTab = tabsList.querySelector('[value="login"]') as HTMLButtonElement;
                        if (loginTab) loginTab.click();
                      }
                    }}
                  >
                    Log in
                  </button></p>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;