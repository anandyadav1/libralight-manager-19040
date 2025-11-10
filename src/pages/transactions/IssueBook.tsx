import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockBooks } from '@/lib/mockData';
import { toast } from 'sonner';

export default function IssueBook() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    bookName: '',
    authorName: '',
    membershipNo: '',
    issueDate: new Date().toISOString().split('T')[0],
    returnDate: '',
    remarks: '',
  });

  const getTodayDate = () => new Date().toISOString().split('T')[0];
  
  const calculateReturnDate = (issueDate: string) => {
    const date = new Date(issueDate);
    date.setDate(date.getDate() + 15);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    // Set initial return date
    setFormData(prev => ({
      ...prev,
      returnDate: calculateReturnDate(prev.issueDate)
    }));
  }, []);

  const handleBookNameChange = (bookName: string) => {
    const book = mockBooks.find(b => b.name === bookName);
    
    setFormData({
      ...formData,
      bookName,
      authorName: book?.author || '',
    });
  };

  const handleIssueDateChange = (issueDate: string) => {
    setFormData({
      ...formData,
      issueDate,
      returnDate: calculateReturnDate(issueDate),
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const today = new Date(getTodayDate());
    const issueDate = new Date(formData.issueDate);
    const returnDate = new Date(formData.returnDate);
    const maxReturnDate = new Date(formData.issueDate);
    maxReturnDate.setDate(maxReturnDate.getDate() + 15);

    if (!formData.bookName.trim()) {
      newErrors.bookName = 'Book name is required';
    }

    if (!formData.membershipNo.trim()) {
      newErrors.membershipNo = 'Membership number is required';
    }

    if (issueDate < today) {
      newErrors.issueDate = 'Issue date cannot be before today';
    }

    if (returnDate > maxReturnDate) {
      newErrors.returnDate = 'Return date cannot be more than 15 days from issue date';
    }

    if (returnDate < issueDate) {
      newErrors.returnDate = 'Return date cannot be before issue date';
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

    toast.success('Book issued successfully!', {
      description: `${formData.bookName} issued until ${new Date(formData.returnDate).toLocaleDateString()}`
    });

    // Reset form
    setFormData({
      bookName: '',
      authorName: '',
      membershipNo: '',
      issueDate: getTodayDate(),
      returnDate: calculateReturnDate(getTodayDate()),
      remarks: '',
    });
  };

  return (
    <Layout title="Issue Book">
      <Card className="shadow-card max-w-2xl">
        <CardHeader>
          <CardTitle>Issue Book to Member</CardTitle>
          <CardDescription>Fill in all required fields to issue a book</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="membershipNo">Membership Number *</Label>
              <Input
                id="membershipNo"
                value={formData.membershipNo}
                onChange={(e) => setFormData({ ...formData, membershipNo: e.target.value })}
                placeholder="e.g., MEM001"
              />
              {errors.membershipNo && (
                <p className="text-sm text-destructive">{errors.membershipNo}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookName">Book Name *</Label>
              <Input
                id="bookName"
                value={formData.bookName}
                onChange={(e) => handleBookNameChange(e.target.value)}
                placeholder="Enter book name"
                list="books-list"
              />
              <datalist id="books-list">
                {mockBooks
                  .filter(book => book.type === 'book' && book.available > 0)
                  .map(book => (
                    <option key={book.id} value={book.name} />
                  ))
                }
              </datalist>
              {errors.bookName && (
                <p className="text-sm text-destructive">{errors.bookName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorName">Author Name</Label>
              <Input
                id="authorName"
                value={formData.authorName}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Auto-populated based on book selection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => handleIssueDateChange(e.target.value)}
                  min={getTodayDate()}
                />
                {errors.issueDate && (
                  <p className="text-sm text-destructive">{errors.issueDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnDate">Return Date * (Max 15 days)</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  min={formData.issueDate}
                />
                {errors.returnDate && (
                  <p className="text-sm text-destructive">{errors.returnDate}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks (Optional)</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                placeholder="Any additional notes..."
                rows={3}
              />
            </div>

            <Button type="submit" variant="success" className="w-full">
              Issue Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
}
