import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, UserCog } from 'lucide-react';

export default function Maintenance() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Membership Management',
      description: 'Add or update member information and subscriptions',
      icon: Users,
      path: '/admin/maintenance/membership',
    },
    {
      title: 'Book/Movie Management',
      description: 'Add or update books and movies in the library',
      icon: BookOpen,
      path: '/admin/maintenance/books',
    },
    {
      title: 'User Management',
      description: 'Manage system users and their permissions',
      icon: UserCog,
      path: '/admin/maintenance/users',
    },
  ];

  return (
    <Layout title="Maintenance Module">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card key={section.path} className="shadow-card hover:shadow-card-hover transition-all">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <section.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="default"
                className="w-full"
                onClick={() => navigate(section.path)}
              >
                Manage
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
