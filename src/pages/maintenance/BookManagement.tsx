import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function BookManagement() {
  const [operation, setOperation] = useState<'add' | 'update'>('add');
  const [type, setType] = useState<'book' | 'movie'>('book');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    serialNo: '',
    procurementDate: new Date().toISOString().split('T')[0],
    quantity: '1',
    status: 'available',
    updateDate: new Date().toISOString().split('T')[0],
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (operation === 'add') {
      if (!formData.name.trim()) newErrors.name = `${type === 'book' ? 'Book' : 'Movie'} name is required`;
      if (!formData.procurementDate) newErrors.procurementDate = 'Procurement date is required';
      if (!formData.quantity || parseInt(formData.quantity) < 1) newErrors.quantity = 'Quantity must be at least 1';
    } else {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.serialNo.trim()) newErrors.serialNo = 'Serial number is required';
      if (!formData.updateDate) newErrors.updateDate = 'Date is required';
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
      toast.success(`${type === 'book' ? 'Book' : 'Movie'} added successfully!`);
    } else {
      toast.success(`${type === 'book' ? 'Book' : 'Movie'} updated successfully!`);
    }
    
    // Reset form
    setFormData({
      name: '',
      author: '',
      serialNo: '',
      procurementDate: new Date().toISOString().split('T')[0],
      quantity: '1',
      status: 'available',
      updateDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Layout title="Book/Movie Management">
      <Tabs value={operation} onValueChange={(v) => setOperation(v as 'add' | 'update')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="add">Add Book/Movie</TabsTrigger>
          <TabsTrigger value="update">Update Book/Movie</TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Add New Item</CardTitle>
              <CardDescription>Add a new book or movie to the library</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Type *</Label>
                  <RadioGroup value={type} onValueChange={(v) => setType(v as typeof type)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="book" id="book" />
                      <Label htmlFor="book" className="font-normal">Book</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="movie" id="movie" />
                      <Label htmlFor="movie" className="font-normal">Movie</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">{type === 'book' ? 'Book' : 'Movie'} Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {type === 'book' && (
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="procurementDate">Procurement Date *</Label>
                    <Input
                      id="procurementDate"
                      type="date"
                      value={formData.procurementDate}
                      onChange={(e) => setFormData({ ...formData, procurementDate: e.target.value })}
                    />
                    {errors.procurementDate && (
                      <p className="text-sm text-destructive">{errors.procurementDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                    {errors.quantity && (
                      <p className="text-sm text-destructive">{errors.quantity}</p>
                    )}
                  </div>
                </div>

                <Button type="submit" variant="success" className="w-full">
                  Add {type === 'book' ? 'Book' : 'Movie'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="update">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Update Item</CardTitle>
              <CardDescription>Update book or movie information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Type *</Label>
                  <RadioGroup value={type} onValueChange={(v) => setType(v as typeof type)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="book" id="update-book" />
                      <Label htmlFor="update-book" className="font-normal">Book</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="movie" id="update-movie" />
                      <Label htmlFor="update-movie" className="font-normal">Movie</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="update-name">Name *</Label>
                  <Input
                    id="update-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNo">Serial Number *</Label>
                  <Input
                    id="serialNo"
                    value={formData.serialNo}
                    onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                    placeholder="e.g., BK001, MV001"
                  />
                  {errors.serialNo && (
                    <p className="text-sm text-destructive">{errors.serialNo}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="issued">Issued</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="updateDate">Date *</Label>
                    <Input
                      id="updateDate"
                      type="date"
                      value={formData.updateDate}
                      onChange={(e) => setFormData({ ...formData, updateDate: e.target.value })}
                    />
                    {errors.updateDate && (
                      <p className="text-sm text-destructive">{errors.updateDate}</p>
                    )}
                  </div>
                </div>

                <Button type="submit" variant="success" className="w-full">
                  Update {type === 'book' ? 'Book' : 'Movie'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
