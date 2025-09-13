import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Shield, Award, FileText, ExternalLink, Camera, Edit } from "lucide-react";

// Mock user data
const userData = {
  name: "Abhilash",
  email: "abhilash.mahata726@gmail.com",
  location: "Chennai, Tamil Nadu",
  joinDate: "September 2024",
  verificationStatus: "verified",
  reportsSubmitted: 23,
  reportsAccepted: 19,
  credibilityScore: 92,
  badges: [
    { name: "Verified Reporter", icon: Shield, color: "bg-green-500" },
    { name: "Top Contributor", icon: Award, color: "bg-yellow-500" },
    { name: "Coastal Expert", icon: User, color: "bg-blue-500" },
  ]
};

const userReports = [
  {
    id: 1,
    title: "High waves at Marina Beach",
    status: "verified",
    date: "2 days ago",
    location: "Chennai, TN",
    type: "high-waves"
  },
  {
    id: 2,
    title: "Coastal flooding in ECR",
    status: "pending",
    date: "1 week ago",
    location: "Chennai, TN",
    type: "flooding"
  },
  {
    id: 3,
    title: "Storm warning validation",
    status: "verified",
    date: "2 weeks ago",
    location: "Puducherry",
    type: "storm"
  }
];

const AccountTab = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="h-full overflow-hidden pt-20 pb-20">
      <div className="p-4">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-ocean text-primary-foreground text-lg font-bold">
                  PS
                </AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary hover:bg-primary-hover">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold">{userData.name}</h2>
                {userData.verificationStatus === 'verified' && (
                  <Shield className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-2">{userData.email}</p>
              <p className="text-sm text-muted-foreground mb-3">
                📍 {userData.location} • Joined {userData.joinDate}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{userData.reportsSubmitted}</p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{userData.reportsAccepted}</p>
                  <p className="text-xs text-muted-foreground">Verified</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{userData.credibilityScore}%</p>
                  <p className="text-xs text-muted-foreground">Credibility</p>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="text-sm font-medium mb-2">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {userData.badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${badge.color}`} />
                  {badge.name}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          <Button
            variant={activeSection === 'profile' ? 'default' : 'outline'}
            onClick={() => setActiveSection('profile')}
            size="sm"
          >
            <User className="w-4 h-4 mr-2" />
            My Reports
          </Button>
          <Button
            variant={activeSection === 'settings' ? 'default' : 'outline'}
            onClick={() => setActiveSection('settings')}
            size="sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button
            variant={activeSection === 'verification' ? 'default' : 'outline'}
            onClick={() => setActiveSection('verification')}
            size="sm"
          >
            <Shield className="w-4 h-4 mr-2" />
            Verification
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-full px-4">
        <div className="space-y-4 pb-4">
          {activeSection === 'profile' && (
            <>
              {userReports.map((report) => (
                <Card key={report.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {report.location} • {report.date}
                      </p>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Data Export
                  </Button>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Location Services</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-Submit Location</span>
                    <Button variant="outline" size="sm">On</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'verification' && (
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold">Verified Reporter</h3>
                    <p className="text-sm text-muted-foreground">Your account is verified</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Phone Number</span>
                    <Badge variant="outline" className="text-green-600">Verified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Email Address</span>
                    <Badge variant="outline" className="text-green-600">Verified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Government ID</span>
                    <Badge variant="outline" className="text-green-600">Verified</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Professional Credentials</span>
                    <Badge variant="outline" className="text-blue-600">Optional</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Verification Benefits</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Higher priority for your reports</li>
                  <li>• Access to premium features</li>
                  <li>• Direct communication with authorities</li>
                  <li>• Enhanced credibility score</li>
                </ul>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AccountTab;