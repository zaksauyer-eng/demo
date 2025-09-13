import { useState, useEffect } from "react";
import { Header } from "./Layout/Header";
import { BottomNavigation } from "./Layout/BottomNavigation";
import ThreatMap from "./Map/ThreatMap";
import GoogleMapsTheatMap from "./Map/GoogleMapsTheatMap";
import AnnounceTab from "./Announce/AnnounceTab";
import LiveFeedTab from "./LiveFeed/LiveFeedTab";
import SearchTab from "./Search/SearchTab";
import AccountTab from "./Account/AccountTab";

interface MainAppProps {
  user: any;
  onLogout: () => void;
}

const MainApp = ({ user, onLogout }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState('threat-map');
  const [hasAlerts, setHasAlerts] = useState(true);

  // Simulate location-based alerts
  useEffect(() => {
    // Mock location-based hazard check
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate checking for hazards near user location
          const mockHasLocalHazards = Math.random() > 0.5;
          setHasAlerts(mockHasLocalHazards);
        },
        () => {
          // If location access denied, still show alerts
          setHasAlerts(true);
        }
      );
    }
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'threat-map':
        return <GoogleMapsTheatMap />;
      case 'announce':
        return <AnnounceTab />;
      case 'live-feed':
        return <LiveFeedTab />;
      case 'search':
        return <SearchTab />;
      case 'account':
        return <AccountTab />;
      default:
        return <ThreatMap />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header activeTab={activeTab} hasAlerts={hasAlerts} />
      
      <main className="flex-1 relative overflow-hidden">
        {renderActiveTab()}
      </main>
      
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};

export default MainApp;