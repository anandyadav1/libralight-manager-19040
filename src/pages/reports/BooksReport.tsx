import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockBooks } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

export default function BooksReport() {
  const books = mockBooks.filter(item => item.type === 'book');

  return (
    <Layout title="Master List of Books">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Books in Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial No</TableHead>
                <TableHead>Book Name</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cost (₹)</TableHead>
                <TableHead>Procurement Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.serialNo}</TableCell>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>
                    <Badge variant={book.status === 'available' ? 'default' : 'secondary'}>
                      {book.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{book.cost}</TableCell>
                  <TableCell>{new Date(book.procurementDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
