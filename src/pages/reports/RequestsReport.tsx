import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockRequests, mockBooks, mockMemberships } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

export default function RequestsReport() {
  return (
    <Layout title="Issue Requests">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Book Issue Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Name</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Fulfilled Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRequests.map((request) => {
                const book = mockBooks.find(b => b.id === request.bookId);
                const member = mockMemberships.find(m => m.id === request.memberId);
                
                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{book?.name}</TableCell>
                    <TableCell>{member?.firstName} {member?.lastName}</TableCell>
                    <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {request.fulfilledDate 
                        ? new Date(request.fulfilledDate).toLocaleDateString()
                        : '-'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={request.status === 'fulfilled' ? 'default' : 'secondary'}>
                        {request.status}
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
