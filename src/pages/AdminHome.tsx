import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Settings, FileText, RefreshCw } from 'lucide-react';

export default function AdminHome() {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Maintenance',
      description: 'Manage memberships, books, movies, and users',
      icon: Settings,
      path: '/admin/maintenance',
      variant: 'admin' as const,
    },
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
      variant: 'default' as const,
    },
  ];

  return (
    <Layout title="Admin Dashboard" showHomeButton={false}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card key={module.path} className="shadow-card hover:shadow-card-hover transition-all">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <module.icon className="h-6 w-6 text-primary" />
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
