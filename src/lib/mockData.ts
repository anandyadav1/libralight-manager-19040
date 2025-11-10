import { Membership, BookMovie, Issue, Request } from '@/types';

export const mockMemberships: Membership[] = [
  {
    id: '1',
    membershipNumber: 'MEM001',
    firstName: 'John',
    lastName: 'Doe',
    contactNo: '9876543210',
    address: '123 Main St, Mumbai',
    aadharNo: '1234-5678-9012',
    startDate: '2024-01-01',
    endDate: '2024-07-01',
    duration: '6M',
    status: 'active',
    finePending: 0,
  },
  {
    id: '2',
    membershipNumber: 'MEM002',
    firstName: 'Jane',
    lastName: 'Smith',
    contactNo: '9876543211',
    address: '456 Park Ave, Delhi',
    aadharNo: '1234-5678-9013',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    duration: '1Y',
    status: 'active',
    finePending: 50,
  },
];

export const mockBooks: BookMovie[] = [
  {
    id: '1',
    serialNo: 'BK001',
    type: 'book',
    name: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    procurementDate: '2023-06-01',
    quantity: 3,
    available: 2,
    status: 'available',
    cost: 350,
  },
  {
    id: '2',
    serialNo: 'BK002',
    type: 'book',
    name: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    procurementDate: '2023-06-15',
    quantity: 2,
    available: 0,
    status: 'issued',
    cost: 400,
  },
  {
    id: '3',
    serialNo: 'MV001',
    type: 'movie',
    name: 'Inception',
    category: 'Sci-Fi',
    procurementDate: '2023-07-01',
    quantity: 2,
    available: 2,
    status: 'available',
    cost: 500,
  },
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    bookId: '2',
    memberId: '1',
    issueDate: '2024-10-15',
    returnDate: '2024-10-30',
    status: 'overdue',
    fine: 150,
    finePaid: false,
  },
  {
    id: '2',
    bookId: '1',
    memberId: '2',
    issueDate: '2024-10-25',
    returnDate: '2024-11-09',
    status: 'active',
    fine: 0,
    finePaid: false,
  },
];

export const mockRequests: Request[] = [
  {
    id: '1',
    memberId: '1',
    bookId: '2',
    requestDate: '2024-10-01',
    fulfilledDate: '2024-10-15',
    status: 'fulfilled',
  },
  {
    id: '2',
    memberId: '2',
    bookId: '1',
    requestDate: '2024-10-20',
    status: 'pending',
  },
];
