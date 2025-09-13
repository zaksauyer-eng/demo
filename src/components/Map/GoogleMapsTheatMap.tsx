import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Waves, Wind, Zap, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

// Extend Window interface to include google
declare global {
  interface Window {
    google: typeof google;
  }
}

// Mock data for demonstration
const mockHazards = [
  {
    id: 1,
    type: 'high-waves',
    latitude: 13.0827,
    longitude: 80.2707,
    severity: 'high',
    description: 'High waves reported at Marina Beach',
    timestamp: '2 hours ago',
    verified: true
  },
  {
    id: 2,
    type: 'flooding',
    latitude: 11.9416,
    longitude: 79.8083,
    severity: 'medium',
    description: 'Coastal flooding in Puducherry',
    timestamp: '1 hour ago',
    verified: false
  },
  {
    id: 3,
    type: 'storm',
    latitude: 8.5241,
    longitude: 76.9366,
    severity: 'high',
    description: 'Storm warning for Kerala coast',
    timestamp: '30 minutes ago',
    verified: true
  }
];

const GoogleMapsTheatMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState('');
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedHazard, setSelectedHazard] = useState<any>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'high-waves': return <Waves className="w-4 h-4" />;
      case 'flooding': return <AlertTriangle className="w-4 h-4" />;
      case 'storm': return <Wind className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const createCustomMarkerIcon = (hazard: any) => {
    const color = hazard.verified ? '#dc2626' : '#f59e0b'; // red for verified, amber for unverified
    const iconSvg = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(iconSvg)}`;
  };

  useEffect(() => {
    if (!googleMapsApiKey) return;

    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        setIsApiLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&loading=async&libraries=marker&v=beta`;
      script.async = true;
      script.onload = () => setIsApiLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, [googleMapsApiKey]);

  useEffect(() => {
    if (!isApiLoaded || !mapRef.current) return;

    // Initialize the map
    const googleMap = new google.maps.Map(mapRef.current, {
      center: { lat: 13.0827, lng: 80.2707 }, // Chennai coordinates
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      styles: [
        {
          featureType: "all",
          stylers: [{ saturation: -10 }]
        }
      ]
    });

    setMap(googleMap);

    // Add markers for each hazard
    mockHazards.forEach(hazard => {
      const marker = new google.maps.Marker({
        position: { lat: hazard.latitude, lng: hazard.longitude },
        map: googleMap,
        title: hazard.description,
        icon: {
          url: createCustomMarkerIcon(hazard),
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      });

      marker.addListener('click', () => {
        setSelectedHazard(hazard);
      });
    });

  }, [isApiLoaded]);

  if (!googleMapsApiKey) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="p-6 w-full max-w-md">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-gradient-ocean rounded-full flex items-center justify-center">
              <Waves className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Google Maps API Key Required</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Google Maps API key to view the threat map
            </p>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="AIzaSyA..."
                value={googleMapsApiKey}
                onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from{' '}
                <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Google Cloud Console
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="absolute inset-0" />
      
      {/* Filter Controls */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant="secondary" size="sm" className="whitespace-nowrap">
            <Filter className="w-4 h-4 mr-2" />
            All Hazards
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-card/90 backdrop-blur-sm">
            <Waves className="w-4 h-4 mr-2" />
            High Waves
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-card/90 backdrop-blur-sm">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Flooding
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap bg-card/90 backdrop-blur-sm">
            <Wind className="w-4 h-4 mr-2" />
            Storms
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-20 left-4 z-10">
        <Card className="p-3 bg-card/90 backdrop-blur-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <span>Verified Reports</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span>Unverified Reports</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Hazard Details Panel */}
      {selectedHazard && (
        <div className="absolute bottom-20 right-4 left-4 z-10">
          <Card className="p-4 bg-card/95 backdrop-blur-md">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getHazardIcon(selectedHazard.type)}
                <Badge className={getSeverityColor(selectedHazard.severity)}>
                  {selectedHazard.severity.toUpperCase()}
                </Badge>
                {selectedHazard.verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Verified
                  </Badge>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedHazard(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </Button>
            </div>
            <h4 className="font-semibold mb-2">{selectedHazard.description}</h4>
            <p className="text-sm text-muted-foreground">{selectedHazard.timestamp}</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GoogleMapsTheatMap;