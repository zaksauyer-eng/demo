import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, ExternalLink, Clock, Verified, Rss } from "lucide-react";

// Mock official updates
const officialUpdates = [
  {
    id: 1,
    source: 'INCOIS',
    title: 'High Wave Alert for Tamil Nadu Coast',
    content: 'Wave heights of 2.5-3.5m expected along Tamil Nadu coast for next 24 hours. Fishermen advised not to venture into sea.',
    timestamp: '2 hours ago',
    priority: 'high',
    verified: true,
    url: '#'
  },
  {
    id: 2,
    source: 'IMD Chennai',
    title: 'Weather Update - Coastal Districts',
    content: 'Moderate to heavy rainfall expected in coastal districts of Tamil Nadu and Puducherry. Strong surface winds likely.',
    timestamp: '4 hours ago',
    priority: 'medium',
    verified: true,
    url: '#'
  },
  {
    id: 3,
    source: 'NDMA',
    title: 'Coastal Flood Advisory',
    content: 'Low-lying areas along the east coast may experience minor flooding during high tide periods. Stay alert.',
    timestamp: '6 hours ago',
    priority: 'medium',
    verified: true,
    url: '#'
  },
  {
    id: 4,
    source: 'Kerala DMO',
    title: 'Cyclone Watch Discontinued',
    content: 'The cyclone watch for Kerala coast has been discontinued as the system has weakened significantly.',
    timestamp: '8 hours ago',
    priority: 'low',
    verified: true,
    url: '#'
  },
  {
    id: 5,
    source: 'Coast Guard',
    title: 'Search and Rescue Operations',
    content: 'SAR operations concluded successfully. All fishing vessels reported safe. Normal fishing activities may resume.',
    timestamp: '12 hours ago',
    priority: 'low',
    verified: true,
    url: '#'
  }
];

const LiveFeedTab = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return <Rss className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full overflow-hidden pt-20 pb-20">
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-ocean rounded-full flex items-center justify-center mb-4">
            <Rss className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Official Updates</h2>
          <p className="text-muted-foreground">
            Verified information from disaster management authorities
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Updates List */}
      <ScrollArea className="h-full px-4">
        <div className="space-y-4 pb-4">
          {officialUpdates.map((update) => (
            <Card key={update.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Badge variant="outline" className="text-xs">
                      {update.source}
                    </Badge>
                    {update.verified && (
                      <Verified className="w-4 h-4 text-blue-500" />
                    )}
                    <Badge className={`${getPriorityColor(update.priority)} text-xs`}>
                      {getPriorityIcon(update.priority)}
                      <span className="ml-1">{update.priority.toUpperCase()}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{update.timestamp}</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold mb-2 leading-tight">{update.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {update.content}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Full Report
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LiveFeedTab;