import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Waves, Phone, Mail, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (userData: any) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    location: '',
    profession: '',
    govId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // For multi-step registration
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "Welcome to Argus!",
      });
      
      onLogin({
        name: "Dr. Priya Sharma",
        email: formData.email,
        verified: true,
        location: "Chennai, Tamil Nadu"
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleRegister = async () => {
    if (step === 1) {
      if (!formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.fullName || !formData.location || !formData.govId) {
        toast({
          title: "Missing Information",
          description: "Please complete all verification fields",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Registration Successful",
          description: "Your account is pending verification. You'll receive an SMS confirmation.",
        });
        
        onLogin({
          name: formData.fullName,
          email: formData.email,
          verified: false,
          location: formData.location
        });
        
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-coastal">
      <Card className="w-full max-w-md p-8 shadow-ocean">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-ocean rounded-full flex items-center justify-center mb-4">
            <Waves className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Argus</h1>
          <p className="text-muted-foreground">
            Coastal Hazard Monitoring Platform
          </p>
          <Badge className="mt-2 bg-primary/10 text-primary">
            <Shield className="w-3 h-3 mr-1" />
            Verified Users Only
          </Badge>
        </div>

        {/* Auth Toggle */}
        <div className="flex mb-6 p-1 bg-muted rounded-lg">
          <Button
            variant={isLogin ? "default" : "ghost"}
            className="flex-1"
            onClick={() => {
              setIsLogin(true);
              setStep(1);
            }}
          >
            Login
          </Button>
          <Button
            variant={!isLogin ? "default" : "ghost"}
            className="flex-1"
            onClick={() => {
              setIsLogin(false);
              setStep(1);
            }}
          >
            Register
          </Button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button 
              onClick={handleLogin} 
              disabled={isLoading}
              className="w-full bg-gradient-ocean hover:bg-primary-hover shadow-ocean"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        ) : (
          /* Registration Form */
          <div className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    OTP verification required for all reports
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password *</Label>
                  <Input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password *</Label>
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleRegister}
                  className="w-full bg-gradient-ocean hover:bg-primary-hover shadow-ocean"
                >
                  Continue to Verification
                </Button>
              </>
            ) : (
              <>
                <div className="text-center mb-4">
                  <h3 className="font-semibold">Account Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete verification to prevent misinformation
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name *</Label>
                  <Input
                    id="full-name"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession">Profession (Optional)</Label>
                  <Input
                    id="profession"
                    placeholder="e.g., Marine Biologist, Fisherman"
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gov-id">Government ID Number *</Label>
                  <Input
                    id="gov-id"
                    placeholder="Aadhaar/PAN/Passport Number"
                    value={formData.govId}
                    onChange={(e) => handleInputChange('govId', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used for verification only. Not stored permanently.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-ocean hover:bg-primary-hover shadow-ocean"
                  >
                    {isLoading ? "Verifying..." : "Complete Registration"}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            By using Argus, you agree to help maintain data integrity and prevent misinformation in coastal hazard reporting.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;