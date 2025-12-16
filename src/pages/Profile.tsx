import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { BloodType } from '@/types';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bloodType: user?.bloodType || '',
    isAvailable: user?.isAvailable ?? false,
    location: {
      address: user?.location?.address || '',
      city: user?.location?.city || '',
      state: user?.location?.state || '',
      zipCode: user?.location?.zipCode || '',
    },
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      updateUser({
        ...formData,
        location: {
          latitude: user?.location?.latitude || 0,
          longitude: user?.location?.longitude || 0,
          ...formData.location,
        },
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1234567890"
                    />
                  </div>
                  {(user?.role === 'donor' || user?.role === 'receiver') && (
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location Information</CardTitle>
                  <CardDescription>Help others find you easily</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.location.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, address: e.target.value },
                        })
                      }
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.location.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, city: e.target.value },
                          })
                        }
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.location.state}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: { ...formData.location, state: e.target.value },
                          })
                        }
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.location.zipCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, zipCode: e.target.value },
                        })
                      }
                      placeholder="12345"
                    />
                  </div>
                  {user?.role === 'donor' && (
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="space-y-0.5">
                        <Label htmlFor="available">Available for Donation</Label>
                        <p className="text-sm text-muted-foreground">
                          Toggle your availability status
                        </p>
                      </div>
                      <Switch
                        id="available"
                        checked={formData.isAvailable}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isAvailable: checked })
                        }
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Profile;



