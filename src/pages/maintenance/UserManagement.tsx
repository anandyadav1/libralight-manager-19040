import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function UserManagement() {
  const [userType, setUserType] = useState<'new' | 'existing'>('new');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    isActive: true,
    isAdmin: false,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (userType === 'new') {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }
      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }
    
    const action = userType === 'new' ? 'created' : 'updated';
    toast.success(`User ${action} successfully!`);
    
    // Reset form
    setFormData({
      name: '',
      username: '',
      password: '',
      isActive: true,
      isAdmin: false,
    });
  };

  return (
    <Layout title="User Management">
      <Card className="shadow-card max-w-2xl">
        <CardHeader>
          <CardTitle>Manage System Users</CardTitle>
          <CardDescription>Create new users or update existing user information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>User Type *</Label>
              <RadioGroup value={userType} onValueChange={(v) => setUserType(v as typeof userType)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="font-normal">New User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing" className="font-normal">Existing User</Label>
                </div>
              </RadioGroup>
            </div>

            {userType === 'new' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Enter username"
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
                />
                <Label htmlFor="isActive" className="font-normal cursor-pointer">
                  Active (Uncheck to deactivate user)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAdmin"
                  checked={formData.isAdmin}
                  onCheckedChange={(checked) => setFormData({ ...formData, isAdmin: checked as boolean })}
                />
                <Label htmlFor="isAdmin" className="font-normal cursor-pointer">
                  Admin (Grant administrative privileges)
                </Label>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-4">
                • Unchecked "Active" = Inactive user<br />
                • Unchecked "Admin" = Regular user
              </p>
            </div>

            <Button type="submit" variant="success" className="w-full">
              {userType === 'new' ? 'Create User' : 'Update User'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
}
