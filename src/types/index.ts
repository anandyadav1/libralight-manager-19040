export interface Membership {
  id: string;
  membershipNumber: string;
  firstName: string;
  lastName: string;
  contactNo: string;
  address: string;
  aadharNo: string;
  startDate: string;
  endDate: string;
  duration: '6M' | '1Y' | '2Y';
  status: 'active' | 'inactive';
  finePending: number;
}

export interface BookMovie {
  id: string;
  serialNo: string;
  type: 'book' | 'movie';
  name: string;
  author?: string;
  category?: string;
  procurementDate: string;
  quantity: number;
  available: number;
  status: 'available' | 'issued' | 'lost';
  cost?: number;
}

export interface Issue {
  id: string;
  bookId: string;
  memberId: string;
  issueDate: string;
  returnDate: string;
  actualReturnDate?: string;
  remarks?: string;
  status: 'active' | 'returned' | 'overdue';
  fine: number;
  finePaid: boolean;
}

export interface Request {
  id: string;
  memberId: string;
  bookId: string;
  requestDate: string;
  fulfilledDate?: string;
  status: 'pending' | 'fulfilled';
}
