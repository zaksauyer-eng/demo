import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Waves, Wind, Zap, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import 'mapbox-gl/dist/mapbox-gl.css';

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

const ThreatMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedHazard, setSelectedHazard] = useState<any>(null);

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

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!mapboxToken) {
      // For demo purposes, show token input
      return;
    }

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [80.2707, 13.0827], // Chennai coordinates
      zoom: 8,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add hazard markers
    mockHazards.forEach(hazard => {
      const el = document.createElement('div');
      el.className = `w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transform transition-transform hover:scale-110 ${
        hazard.verified ? 'bg-destructive' : 'bg-warning'
      }`;
      el.innerHTML = `<div class="w-3 h-3 bg-white rounded-full"></div>`;

      el.addEventListener('click', () => {
        setSelectedHazard(hazard);
      });

      new mapboxgl.Marker(el)
        .setLngLat([hazard.longitude, hazard.latitude])
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="p-6 w-full max-w-md">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-gradient-ocean rounded-full flex items-center justify-center">
              <Waves className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Mapbox Token Required</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to view the threat map
            </p>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGt..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Get your token from{' '}
                <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  mapbox.com
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
      <div ref={mapContainer} className="absolute inset-0" />
      
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

export default ThreatMap;