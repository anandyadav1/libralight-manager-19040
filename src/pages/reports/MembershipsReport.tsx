import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockMemberships } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

export default function MembershipsReport() {
  return (
    <Layout title="Master List of Memberships">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Memberships</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Membership No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Fine Pending (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMemberships.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.membershipNumber}</TableCell>
                  <TableCell>{member.firstName} {member.lastName}</TableCell>
                  <TableCell>{member.contactNo}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(member.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(member.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {member.finePending > 0 ? (
                      <span className="text-destructive font-medium">{member.finePending}</span>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
