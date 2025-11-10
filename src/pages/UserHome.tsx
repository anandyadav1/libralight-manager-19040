import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, RefreshCw } from 'lucide-react';

export default function UserHome() {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Reports',
      description: 'View master lists, active issues, and overdue returns',
      icon: FileText,
      path: '/reports',
      variant: 'default' as const,
    },
    {
      title: 'Transactions',
      description: 'Check availability, issue books, returns, and fines',
      icon: RefreshCw,
      path: '/transactions',
      variant: 'user' as const,
    },
  ];

  return (
    <Layout title="User Dashboard" showHomeButton={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {modules.map((module) => (
          <Card key={module.path} className="shadow-card hover:shadow-card-hover transition-all">
            <CardHeader>
              <div className="mb-4 bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <module.icon className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant={module.variant}
                className="w-full"
                onClick={() => navigate(module.path)}
              >
                Access {module.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
