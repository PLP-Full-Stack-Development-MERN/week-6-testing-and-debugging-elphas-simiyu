
import { Bug } from './types';

export const sampleBugs: Bug[] = [
  {
    id: '1',
    title: 'Login button not working on Safari',
    description: 'When using Safari on macOS, clicking the login button does nothing. Works fine on Chrome and Firefox.',
    status: 'open',
    priority: 'high',
    createdAt: new Date('2023-05-15T09:24:00'),
    updatedAt: new Date('2023-05-15T09:24:00'),
    reportedBy: 'Alex Johnson',
  },
  {
    id: '2',
    title: 'Dashboard charts not loading correctly',
    description: 'The pie chart on the analytics dashboard is showing incorrect percentages and sometimes fails to load completely.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date('2023-05-10T14:30:00'),
    updatedAt: new Date('2023-05-12T11:15:00'),
    reportedBy: 'Morgan Lee',
    assignedTo: 'Chris Wong',
  },
  {
    id: '3',
    title: 'User profile image upload fails',
    description: 'When attempting to upload a new profile image, the process appears to complete but the image is never updated.',
    status: 'open',
    priority: 'low',
    createdAt: new Date('2023-05-08T16:42:00'),
    updatedAt: new Date('2023-05-08T16:42:00'),
    reportedBy: 'Jamie Smith',
  },
  {
    id: '4',
    title: 'Email notifications not being sent',
    description: 'System is failing to send email notifications for new comments. No errors in logs but users report not receiving any emails.',
    status: 'resolved',
    priority: 'high',
    createdAt: new Date('2023-05-05T08:10:00'),
    updatedAt: new Date('2023-05-07T17:30:00'),
    reportedBy: 'Riley Johnson',
    assignedTo: 'Taylor Kim',
  },
  {
    id: '5',
    title: 'Search functionality returns incorrect results',
    description: 'When searching for specific keywords, the results include unrelated items and sometimes miss relevant matches.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date('2023-05-02T11:20:00'),
    updatedAt: new Date('2023-05-04T09:45:00'),
    reportedBy: 'Casey Martinez',
    assignedTo: 'Jordan Patel',
  }
];
