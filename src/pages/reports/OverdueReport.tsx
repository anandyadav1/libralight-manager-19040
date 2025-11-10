import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockIssues, mockBooks, mockMemberships } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

export default function OverdueReport() {
  const overdueIssues = mockIssues.filter(issue => issue.status === 'overdue');

  return (
    <Layout title="Overdue Returns">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Books with Overdue Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Name</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Fine (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overdueIssues.map((issue) => {
                const book = mockBooks.find(b => b.id === issue.bookId);
                const member = mockMemberships.find(m => m.id === issue.memberId);
                const returnDate = new Date(issue.returnDate);
                const today = new Date();
                const daysOverdue = Math.floor((today.getTime() - returnDate.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{book?.name}</TableCell>
                    <TableCell>{member?.firstName} {member?.lastName}</TableCell>
                    <TableCell>{new Date(issue.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{returnDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{daysOverdue} days</Badge>
                    </TableCell>
                    <TableCell className="text-destructive font-medium">₹{issue.fine}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
