import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Heart, Home, Baby, CheckCircle, Phone, Mail, User } from "lucide-react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.role) {
      toast.error("Please fill in all fields to complete your application");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send form data to Netlify function
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("🎉 Application submitted successfully! We'll contact you within 24 hours.");
        console.log("Application submitted:", formData);
        
        // Reset form
        setFormData({ name: "", email: "", phone: "", role: "" });
      } else {
        toast.error(result.message || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const roles = [
    { value: "caregiver", label: "Caregiver", icon: Heart, description: "Care for elderly & disabled" },
    { value: "housekeeper", label: "Housekeeper", icon: Home, description: "Home cleaning & maintenance" },
    { value: "nanny", label: "Nanny/Childcare", icon: Baby, description: "Childcare & development" }
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="shadow-large border-0 bg-gradient-card backdrop-blur-sm animate-fade-in">
        <CardHeader className="text-center pb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-hero rounded-full flex items-center justify-center animate-pulse-glow">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground mb-2">
            Apply Now
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Start your rewarding career today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-semibold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-border focus:ring-primary h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-border focus:ring-primary h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0700 000 000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-border focus:ring-primary h-12 text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground font-semibold">
                Position You're Applying For
              </Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="border-border focus:ring-primary h-12 text-lg">
                  <SelectValue placeholder="Choose your preferred position" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <SelectItem key={role.value} value={role.value} className="py-3">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-semibold">{role.label}</div>
                            <div className="text-sm text-muted-foreground">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full mt-8 bg-gradient-cta hover:opacity-90 text-white font-bold py-4 text-lg h-14 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Submitting Application...
                </>
              ) : (
                "Submit Application Now 🚀"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ✅ Immediate consideration • ✅ Competitive salary • ✅ Flexible hours
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;