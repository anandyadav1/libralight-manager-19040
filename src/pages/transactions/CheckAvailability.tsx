import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { mockBooks } from '@/lib/mockData';
import { BookMovie } from '@/types';
import { toast } from 'sonner';

export default function CheckAvailability() {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [results, setResults] = useState<BookMovie[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    
    if (!bookName.trim() && !authorName.trim()) {
      setError('Please enter either Book Name or Author Name to search');
      return;
    }

    const filtered = mockBooks.filter(book => {
      const matchName = bookName.trim() 
        ? book.name.toLowerCase().includes(bookName.toLowerCase()) 
        : true;
      const matchAuthor = authorName.trim() 
        ? book.author?.toLowerCase().includes(authorName.toLowerCase()) 
        : true;
      
      return matchName && matchAuthor && book.available > 0;
    });

    setResults(filtered);
    setSelectedBook('');
    
    if (filtered.length === 0) {
      toast.info('No available books found matching your criteria');
    } else {
      toast.success(`Found ${filtered.length} available book(s)`);
    }
  };

  const handleSelect = () => {
    if (!selectedBook) {
      toast.error('Please select a book');
      return;
    }
    
    const book = results.find(b => b.id === selectedBook);
    toast.success(`Selected: ${book?.name}`, {
      description: 'You can now proceed to issue this book'
    });
  };

  return (
    <Layout title="Check Book Availability">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Search Books</CardTitle>
            <CardDescription>Enter book name or author name (at least one required)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bookName">Book Name</Label>
                <Input
                  id="bookName"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  placeholder="Enter book name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name</Label>
                <Input
                  id="authorName"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter author name"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button onClick={handleSearch} className="w-full">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Available Books</CardTitle>
            <CardDescription>
              {results.length > 0 
                ? 'Select a book from the list below'
                : 'Search results will appear here'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="space-y-4">
                <RadioGroup value={selectedBook} onValueChange={setSelectedBook}>
                  {results.map((book) => (
                    <div key={book.id} className="flex items-start space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value={book.id} id={book.id} className="mt-1" />
                      <Label htmlFor={book.id} className="font-normal flex-1 cursor-pointer">
                        <div>
                          <p className="font-semibold">{book.name}</p>
                          {book.author && <p className="text-sm text-muted-foreground">by {book.author}</p>}
                          <p className="text-sm text-muted-foreground">
                            Serial: {book.serialNo} | Available: {book.available}/{book.quantity}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button onClick={handleSelect} className="w-full" disabled={!selectedBook}>
                  Select Book
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No results to display</p>
                <p className="text-sm mt-1">Use the search form to find available books</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
