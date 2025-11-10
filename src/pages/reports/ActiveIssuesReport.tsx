import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockIssues, mockBooks, mockMemberships } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

export default function ActiveIssuesReport() {
  const activeIssues = mockIssues.filter(issue => issue.status === 'active' || issue.status === 'overdue');

  return (
    <Layout title="Active Issues">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Currently Issued Books</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Name</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeIssues.map((issue) => {
                const book = mockBooks.find(b => b.id === issue.bookId);
                const member = mockMemberships.find(m => m.id === issue.memberId);
                
                return (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{book?.name}</TableCell>
                    <TableCell>{member?.firstName} {member?.lastName}</TableCell>
                    <TableCell>{new Date(issue.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(issue.returnDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={issue.status === 'overdue' ? 'destructive' : 'default'}>
                        {issue.status}
                      </Badge>
                    </TableCell>
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
