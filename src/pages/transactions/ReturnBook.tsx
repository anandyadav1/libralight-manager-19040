import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockBooks } from '@/lib/mockData';
import { toast } from 'sonner';

export default function ReturnBook() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    bookName: '',
    authorName: '',
    serialNo: '',
    issueDate: '2024-10-15',
    returnDate: new Date().toISOString().split('T')[0],
    remarks: '',
  });

  const handleBookNameChange = (bookName: string) => {
    const book = mockBooks.find(b => b.name === bookName);
    
    setFormData({
      ...formData,
      bookName,
      authorName: book?.author || '',
      serialNo: book?.serialNo || '',
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bookName.trim()) {
      newErrors.bookName = 'Book name is required';
    }

    if (!formData.serialNo.trim()) {
      newErrors.serialNo = 'Serial number is required';
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

    // Calculate fine if overdue
    const issueDate = new Date(formData.issueDate);
    const expectedReturn = new Date(issueDate);
    expectedReturn.setDate(expectedReturn.getDate() + 15);
    const actualReturn = new Date(formData.returnDate);
    
    const daysLate = Math.max(0, Math.floor((actualReturn.getTime() - expectedReturn.getTime()) / (1000 * 60 * 60 * 24)));
    const fine = daysLate * 10; // ₹10 per day

    // Navigate to pay fine page with calculated fine
    toast.success('Book return recorded', {
      description: fine > 0 ? `Fine: ₹${fine} (${daysLate} days late)` : 'No fine applicable'
    });
    
    setTimeout(() => {
      navigate('/transactions/pay-fine', { 
        state: { 
          bookName: formData.bookName,
          fine,
          daysLate,
          actualReturnDate: formData.returnDate
        } 
      });
    }, 1000);
  };

  return (
    <Layout title="Return Book">
      <Card className="shadow-card max-w-2xl">
        <CardHeader>
          <CardTitle>Process Book Return</CardTitle>
          <CardDescription>Enter book details to process return and calculate fine</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  .filter(book => book.type === 'book')
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
              <p className="text-xs text-muted-foreground">Auto-populated</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNo">Serial Number *</Label>
              <Input
                id="serialNo"
                value={formData.serialNo}
                onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                placeholder="e.g., BK001"
              />
              {errors.serialNo && (
                <p className="text-sm text-destructive">{errors.serialNo}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Auto-populated</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="returnDate">Return Date *</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Can be edited</p>
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
              Confirm Return & Calculate Fine
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
}
