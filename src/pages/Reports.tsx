import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, Film, Users, ListChecks, AlertTriangle, FileCheck } from 'lucide-react';

export default function Reports() {
  const navigate = useNavigate();

  const reports = [
    {
      title: 'Master List of Books',
      description: 'Complete list of all books in the library',
      icon: BookOpen,
      path: '/reports/books',
    },
    {
      title: 'Master List of Movies',
      description: 'Complete list of all movies in the library',
      icon: Film,
      path: '/reports/movies',
    },
    {
      title: 'Master List of Memberships',
      description: 'Active/Inactive memberships and pending fines',
      icon: Users,
      path: '/reports/memberships',
    },
    {
      title: 'Active Issues',
      description: 'Currently issued books with dates',
      icon: ListChecks,
      path: '/reports/active-issues',
    },
    {
      title: 'Overdue Returns',
      description: 'Overdue books with fine calculations',
      icon: AlertTriangle,
      path: '/reports/overdue-returns',
    },
    {
      title: 'Issue Requests',
      description: 'Pending and fulfilled issue requests',
      icon: FileCheck,
      path: '/reports/issue-requests',
    },
  ];

  return (
    <Layout title="Reports Module">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.path} className="shadow-card hover:shadow-card-hover transition-all">
            <CardHeader>
              <div className="mb-4 bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <report.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="default"
                className="w-full"
                onClick={() => navigate(report.path)}
              >
                View Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
