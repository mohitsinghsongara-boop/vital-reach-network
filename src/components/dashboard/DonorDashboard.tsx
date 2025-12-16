import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplet, MapPin, Calendar, Bell, Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Ready to save lives today?</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Quick Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
              <Droplet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.bloodType}</div>
              <Badge variant={user?.isAvailable ? "default" : "secondary"} className="mt-2">
                {user?.isAvailable ? 'Available' : 'Not Available'}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Heart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">Lives saved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Eligible</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Now</div>
              <p className="text-xs text-muted-foreground mt-1">Ready to donate</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your donor profile and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/profile">
                <Button variant="outline" className="w-full justify-start">
                  <Droplet className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Find Blood Requests
                </Button>
              </Link>
              <Link to="/emergency">
                <Button className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Emergency Requests
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your donation history and matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No recent activity</p>
                <p className="text-sm mt-2">Start by updating your availability!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Alerts */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Emergency Requests Nearby
            </CardTitle>
            <CardDescription>Urgent blood requests in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 text-muted-foreground">
              <p>No emergency requests at the moment</p>
              <p className="text-sm mt-2">You'll be notified when urgent requests match your blood type</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;

