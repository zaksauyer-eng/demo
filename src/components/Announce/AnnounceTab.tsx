import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Send, AlertTriangle, Waves, Wind, Zap, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const hazardTypes = [
  { value: 'high-waves', label: 'High Waves', icon: Waves },
  { value: 'flooding', label: 'Coastal Flooding', icon: AlertTriangle },
  { value: 'storm', label: 'Storm/Cyclone', icon: Wind },
  { value: 'erosion', label: 'Beach Erosion', icon: Zap },
  { value: 'tsunami', label: 'Tsunami Warning', icon: Waves },
  { value: 'other', label: 'Other Hazard', icon: AlertTriangle },
];

const AnnounceTab = () => {
  const [description, setDescription] = useState('');
  const [hazardType, setHazardType] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!description.trim() || !hazardType || !location.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report Submitted",
        description: "Your hazard report has been submitted for verification",
      });
      
      // Reset form
      setDescription('');
      setHazardType('');
      setLocation('');
      setIsSubmitting(false);
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          toast({
            title: "Location Added",
            description: "Current location has been captured",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <div className="h-full overflow-y-auto pb-20 pt-20">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-ocean rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Report a Hazard</h2>
          <p className="text-muted-foreground">
            Help your community stay safe by reporting coastal hazards in real-time
          </p>
        </div>

        {/* Report Form */}
        <Card className="p-6 space-y-6">
          {/* Hazard Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Hazard Type *</label>
            <Select value={hazardType} onValueChange={setHazardType}>
              <SelectTrigger>
                <SelectValue placeholder="Select hazard type" />
              </SelectTrigger>
              <SelectContent>
                {hazardTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Location *</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter location or coordinates"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={getCurrentLocation}>
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Description *</label>
            <Textarea
              placeholder="Describe what you're observing. Be specific about the conditions, timing, and any immediate dangers."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Photos/Videos (Optional)</label>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col">
                <Camera className="w-6 h-6 mb-2" />
                <span className="text-sm">Take Photo</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-sm">Upload File</span>
              </Button>
            </div>
          </div>

          {/* Priority Badge */}
          {hazardType && (
            <div className="flex items-center justify-center">
              <Badge 
                className={
                  hazardType === 'tsunami' ? 'bg-destructive text-destructive-foreground' :
                  hazardType === 'storm' ? 'bg-warning text-warning-foreground' :
                  'bg-secondary text-secondary-foreground'
                }
              >
                {hazardType === 'tsunami' ? 'HIGH PRIORITY' : 
                 hazardType === 'storm' ? 'MEDIUM PRIORITY' : 
                 'STANDARD PRIORITY'}
              </Badge>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full bg-gradient-ocean hover:bg-primary-hover shadow-ocean"
          >
            {isSubmitting ? (
              "Submitting Report..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            All reports are reviewed before being published. Emergency situations should also be reported to local authorities.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AnnounceTab;