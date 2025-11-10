import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Search, BookPlus, BookMinus, DollarSign } from 'lucide-react';

export default function Transactions() {
  const navigate = useNavigate();

  const transactions = [
    {
      title: 'Check Book Availability',
      description: 'Search for available books by name or author',
      icon: Search,
      path: '/transactions/check-availability',
    },
    {
      title: 'Issue Book',
      description: 'Issue a book to a member',
      icon: BookPlus,
      path: '/transactions/issue-book',
    },
    {
      title: 'Return Book',
      description: 'Process book returns and calculate fines',
      icon: BookMinus,
      path: '/transactions/return-book',
    },
    {
      title: 'Pay Fine',
      description: 'Record fine payments',
      icon: DollarSign,
      path: '/transactions/pay-fine',
    },
  ];

  return (
    <Layout title="Transactions Module">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {transactions.map((transaction) => (
          <Card key={transaction.path} className="shadow-card hover:shadow-card-hover transition-all">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <transaction.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{transaction.title}</CardTitle>
              <CardDescription>{transaction.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="default"
                className="w-full"
                onClick={() => navigate(transaction.path)}
              >
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
