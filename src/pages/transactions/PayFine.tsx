import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function PayFine() {
  const location = useLocation();
  const navigate = useNavigate();
  const returnData = location.state || {};
  
  const [formData, setFormData] = useState({
    bookName: returnData.bookName || 'To Kill a Mockingbird',
    actualReturnDate: returnData.actualReturnDate || new Date().toISOString().split('T')[0],
    fineCalculated: returnData.fine || 150,
    daysLate: returnData.daysLate || 15,
    finePaid: false,
    remarks: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.fineCalculated > 0 && !formData.finePaid) {
      setError('Fine payment must be confirmed before completing the transaction');
      toast.error('Please confirm fine payment');
      return;
    }

    toast.success('Transaction completed successfully!', {
      description: formData.fineCalculated > 0 
        ? `Fine of ₹${formData.fineCalculated} recorded as paid`
        : 'No fine was applicable'
    });

    setTimeout(() => {
      navigate('/transactions');
    }, 1500);
  };

  return (
    <Layout title="Pay Fine">
      <Card className="shadow-card max-w-2xl">
        <CardHeader>
          <CardTitle>Fine Payment</CardTitle>
          <CardDescription>
            {formData.fineCalculated > 0 
              ? 'Review and confirm fine payment'
              : 'No fine applicable for this return'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Book Name</Label>
              <Input
                value={formData.bookName}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Actual Return Date</Label>
                <Input
                  type="date"
                  value={formData.actualReturnDate}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label>Days Late</Label>
                <Input
                  value={formData.daysLate}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Fine Calculated (₹10 per day)</Label>
              <Input
                value={`₹${formData.fineCalculated}`}
                disabled
                className={`bg-muted font-semibold ${
                  formData.fineCalculated > 0 ? 'text-destructive' : 'text-success'
                }`}
              />
            </div>

            {formData.fineCalculated > 0 && (
              <div className="space-y-3 pt-2 pb-2 px-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="finePaid"
                    checked={formData.finePaid}
                    onCheckedChange={(checked) => {
                      setFormData({ ...formData, finePaid: checked as boolean });
                      setError('');
                    }}
                  />
                  <Label htmlFor="finePaid" className="font-medium cursor-pointer">
                    Confirm Fine Payment of ₹{formData.fineCalculated}
                  </Label>
                </div>
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
            )}

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

            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/transactions')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="success" 
                className="flex-1"
              >
                Complete Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
}
