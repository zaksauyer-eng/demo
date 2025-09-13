import { Map, Megaphone, Rss, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'threat-map', label: 'Threat Map', icon: Map },
  { id: 'announce', label: 'Announce', icon: Megaphone },
  { id: 'live-feed', label: 'Live Feed', icon: Rss },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'account', label: 'Account', icon: User },
];

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/50 px-2 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant="ghost"
            size="sm"
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center gap-1 p-2 min-w-0 flex-1 rounded-xl transition-all duration-300",
              activeTab === id
                ? "bg-primary text-primary-foreground shadow-ocean"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon 
              className={cn(
                "transition-all duration-300",
                activeTab === id ? "w-5 h-5" : "w-4 h-4"
              )} 
            />
            <span className={cn(
              "text-xs font-medium transition-all duration-300",
              activeTab === id ? "text-primary-foreground" : "text-muted-foreground"
            )}>
              {label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};