import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Droplet, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: isLogin 
        ? "You've been signed in successfully." 
        : "Please check your email to verify your account.",
    });
    
    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Droplet className="w-8 h-8 text-primary fill-primary" />
            <span className="text-2xl font-bold">
              Red<span className="text-primary">Drop</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Join our community of life-savers today"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 h-12"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center mt-6 text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-12 relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-primary-foreground rounded-full" />
          <div className="absolute bottom-20 right-20 w-60 h-60 border-2 border-primary-foreground rounded-full" />
        </div>

        <div className="relative z-10 text-center text-primary-foreground max-w-md">
          <Droplet className="w-20 h-20 mx-auto mb-8 fill-primary-foreground/30" />
          <h2 className="text-3xl font-bold mb-4">Save Lives Today</h2>
          <p className="text-primary-foreground/80 text-lg">
            Every donation you make can save up to three lives. Join our community of heroes making a real difference.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            <div>
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm text-primary-foreground/70">Donors</p>
            </div>
            <div>
              <p className="text-3xl font-bold">25K+</p>
              <p className="text-sm text-primary-foreground/70">Lives Saved</p>
            </div>
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-primary-foreground/70">Blood Banks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
