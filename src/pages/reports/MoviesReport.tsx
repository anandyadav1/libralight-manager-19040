import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockBooks } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

export default function MoviesReport() {
  const movies = mockBooks.filter(item => item.type === 'movie');

  return (
    <Layout title="Master List of Movies">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Movies in Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial No</TableHead>
                <TableHead>Movie Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cost (₹)</TableHead>
                <TableHead>Procurement Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell className="font-medium">{movie.serialNo}</TableCell>
                  <TableCell>{movie.name}</TableCell>
                  <TableCell>{movie.category}</TableCell>
                  <TableCell>
                    <Badge variant={movie.status === 'available' ? 'default' : 'secondary'}>
                      {movie.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{movie.cost}</TableCell>
                  <TableCell>{new Date(movie.procurementDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
