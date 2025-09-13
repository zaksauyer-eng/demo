import { Waves, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  activeTab: string;
  hasAlerts?: boolean;
}

export const Header = ({ activeTab, hasAlerts = false }: HeaderProps) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'threat-map': return 'Threat Map';
      case 'announce': return 'Report Hazard';
      case 'live-feed': return 'Official Updates';
      case 'search': return 'Search';
      case 'account': return 'My Account';
      default: return 'Argus';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-ocean text-primary-foreground shadow-ocean z-40">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Waves className="w-6 h-6" />
            <h1 className="text-xl font-bold">Argus</h1>
          </div>
          {activeTab !== 'threat-map' && (
            <div className="text-sm font-medium opacity-90">
              {getTabTitle(activeTab)}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative text-primary-foreground hover:bg-white/10">
            <Bell className="w-5 h-5" />
            {hasAlerts && (
              <Badge className="absolute -top-1 -right-1 w-3 h-3 p-0 bg-warning text-warning-foreground">
                <span className="sr-only">New alerts</span>
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/10">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};