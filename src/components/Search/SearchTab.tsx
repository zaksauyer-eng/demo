import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MapPin, Phone, TrendingUp, Clock, AlertTriangle, Waves, Wind } from "lucide-react";

// Mock data
const coastalCities = [
  {
    id: 1,
    name: 'Chennai',
    state: 'Tamil Nadu',
    elevation: '6m above sea level',
    climate: 'Tropical wet and dry',
    hazardHistory: ['Cyclone Vardah (2016)', 'Tsunami (2004)', 'Coastal flooding'],
    emergencyNumber: '+91-44-25619131',
    recentReports: 12
  },
  {
    id: 2,
    name: 'Puducherry',
    state: 'Puducherry',
    elevation: '3m above sea level',
    climate: 'Tropical savanna',
    hazardHistory: ['Cyclone Thane (2011)', 'Coastal erosion', 'High waves'],
    emergencyNumber: '+91-413-2334139',
    recentReports: 8
  },
  {
    id: 3,
    name: 'Kochi',
    state: 'Kerala',
    elevation: '0m above sea level',
    climate: 'Tropical monsoon',
    hazardHistory: ['Cyclone Ockhi (2017)', 'Storm surge', 'Flooding'],
    emergencyNumber: '+91-484-2668272',
    recentReports: 5
  }
];

const hazardTypes = [
  { name: 'High Waves', icon: Waves, description: 'Wave heights exceeding normal conditions', reports: 24 },
  { name: 'Coastal Flooding', icon: AlertTriangle, description: 'Inundation of coastal areas', reports: 15 },
  { name: 'Storm/Cyclone', icon: Wind, description: 'Severe weather systems', reports: 8 },
  { name: 'Tsunami', icon: Waves, description: 'Seismic sea waves', reports: 0 },
];

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'cities' | 'hazards'>('cities');
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const filteredCities = coastalCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHazards = hazardTypes.filter(hazard =>
    hazard.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: any) => {
    setSelectedCity(city);
  };

  if (selectedCity) {
    return (
      <div className="h-full overflow-y-auto pb-20 pt-20">
        <div className="p-4">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedCity(null)}
            className="mb-4 text-primary"
          >
            ← Back to Search
          </Button>
          
          <Card className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{selectedCity.name}</h2>
              <Badge variant="outline">{selectedCity.state}</Badge>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">ELEVATION</h3>
                  <p className="font-medium">{selectedCity.elevation}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">CLIMATE</h3>
                  <p className="font-medium">{selectedCity.climate}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">RECENT REPORTS</h3>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-medium">{selectedCity.recentReports} reports in the last 30 days</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">HAZARD HISTORY</h3>
                <div className="space-y-2">
                  {selectedCity.hazardHistory.map((hazard: string, index: number) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {hazard}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">EMERGENCY CONTACT</h3>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${selectedCity.emergencyNumber}`} className="font-medium text-primary">
                    {selectedCity.emergencyNumber}
                  </a>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-ocean shadow-ocean">
              <MapPin className="w-4 h-4 mr-2" />
              View on Threat Map
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden pt-20 pb-20">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-ocean rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Search</h2>
          <p className="text-muted-foreground">
            Find information about coastal cities and hazard types
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search cities or hazard types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Search Type Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={searchType === 'cities' ? 'default' : 'outline'}
            onClick={() => setSearchType('cities')}
            className="flex-1"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Cities
          </Button>
          <Button
            variant={searchType === 'hazards' ? 'default' : 'outline'}
            onClick={() => setSearchType('hazards')}
            className="flex-1"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Hazards
          </Button>
        </div>
      </div>

      {/* Results */}
      <ScrollArea className="h-full px-4">
        <div className="space-y-3 pb-4">
          {searchType === 'cities' ? (
            filteredCities.map((city) => (
              <Card 
                key={city.id} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCitySelect(city)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">{city.state}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {city.elevation}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        {city.recentReports} recent reports
                      </div>
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    →
                  </div>
                </div>
              </Card>
            ))
          ) : (
            filteredHazards.map((hazard, index) => (
              <Card key={index} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <hazard.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{hazard.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{hazard.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {hazard.reports} active reports
                      </Badge>
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Last updated: 2h ago</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SearchTab;