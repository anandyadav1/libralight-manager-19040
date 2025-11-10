import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function MembershipManagement() {
  const [operation, setOperation] = useState<'add' | 'update'>('add');
  const [duration, setDuration] = useState<'6M' | '1Y' | '2Y'>('6M');
  const [updateAction, setUpdateAction] = useState<'extend' | 'cancel'>('extend');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    membershipNumber: '',
    firstName: '',
    lastName: '',
    contactNo: '',
    address: '',
    aadharNo: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
  });

  const calculateEndDate = (startDate: string, duration: string) => {
    const start = new Date(startDate);
    switch (duration) {
      case '6M':
        start.setMonth(start.getMonth() + 6);
        break;
      case '1Y':
        start.setFullYear(start.getFullYear() + 1);
        break;
      case '2Y':
        start.setFullYear(start.getFullYear() + 2);
        break;
    }
    return start.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (operation === 'add') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.contactNo.trim()) newErrors.contactNo = 'Contact number is required';
      else if (!/^\d{10}$/.test(formData.contactNo)) newErrors.contactNo = 'Invalid contact number';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.aadharNo.trim()) newErrors.aadharNo = 'Aadhar number is required';
      if (!formData.startDate) newErrors.startDate = 'Start date is required';
    } else {
      if (!formData.membershipNumber.trim()) newErrors.membershipNumber = 'Membership number is required';
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
    
    if (operation === 'add') {
      toast.success('Membership added successfully!');
    } else {
      toast.success(updateAction === 'cancel' ? 'Membership cancelled' : 'Membership extended successfully!');
    }
    
    // Reset form
    setFormData({
      membershipNumber: '',
      firstName: '',
      lastName: '',
      contactNo: '',
      address: '',
      aadharNo: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
    });
  };

  return (
    <Layout title="Membership Management">
      <Tabs value={operation} onValueChange={(v) => setOperation(v as 'add' | 'update')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="add">Add Membership</TabsTrigger>
          <TabsTrigger value="update">Update Membership</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Add New Membership</CardTitle>
              <CardDescription>Fill in all required fields to create a new membership</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNo">Contact Number *</Label>
                    <Input
                      id="contactNo"
                      value={formData.contactNo}
                      onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                      placeholder="10 digits"
                    />
                    {errors.contactNo && (
                      <p className="text-sm text-destructive">{errors.contactNo}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadharNo">Aadhar Number *</Label>
                    <Input
                      id="aadharNo"
                      value={formData.aadharNo}
                      onChange={(e) => setFormData({ ...formData, aadharNo: e.target.value })}
                      placeholder="XXXX-XXXX-XXXX"
                    />
                    {errors.aadharNo && (
                      <p className="text-sm text-destructive">{errors.aadharNo}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive">{errors.address}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => {
                        setFormData({ 
                          ...formData, 
                          startDate: e.target.value,
                          endDate: calculateEndDate(e.target.value, duration)
                        });
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={calculateEndDate(formData.startDate, duration)}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Membership Duration *</Label>
                  <RadioGroup value={duration} onValueChange={(v) => setDuration(v as typeof duration)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6M" id="6M" />
                      <Label htmlFor="6M" className="font-normal">6 Months</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1Y" id="1Y" />
                      <Label htmlFor="1Y" className="font-normal">1 Year</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2Y" id="2Y" />
                      <Label htmlFor="2Y" className="font-normal">2 Years</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" variant="success" className="w-full">
                  Add Membership
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="update">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Update Membership</CardTitle>
              <CardDescription>Enter membership number to update or cancel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="membershipNumber">Membership Number *</Label>
                  <Input
                    id="membershipNumber"
                    value={formData.membershipNumber}
                    onChange={(e) => setFormData({ ...formData, membershipNumber: e.target.value })}
                    placeholder="e.g., MEM001"
                  />
                  {errors.membershipNumber && (
                    <p className="text-sm text-destructive">{errors.membershipNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Action *</Label>
                  <RadioGroup value={updateAction} onValueChange={(v) => setUpdateAction(v as typeof updateAction)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="extend" id="extend" />
                      <Label htmlFor="extend" className="font-normal">Extend Membership</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cancel" id="cancel" />
                      <Label htmlFor="cancel" className="font-normal">Cancel Membership</Label>
                    </div>
                  </RadioGroup>
                </div>

                {updateAction === 'extend' && (
                  <div className="space-y-2">
                    <Label>Extension Duration</Label>
                    <RadioGroup value={duration} onValueChange={(v) => setDuration(v as typeof duration)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="6M" id="ext-6M" />
                        <Label htmlFor="ext-6M" className="font-normal">6 Months</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1Y" id="ext-1Y" />
                        <Label htmlFor="ext-1Y" className="font-normal">1 Year</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2Y" id="ext-2Y" />
                        <Label htmlFor="ext-2Y" className="font-normal">2 Years</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant={updateAction === 'cancel' ? 'destructive' : 'success'} 
                  className="w-full"
                >
                  {updateAction === 'cancel' ? 'Cancel Membership' : 'Extend Membership'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
