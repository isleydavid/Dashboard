
export interface ServiceMetric {
  label: string;
  days: number;
  totalPercentage: number;
  operational: number;
  fiscalization: number;
  administrative: number;
}

export interface DeptEfficiency {
  id: number;
  code: string;
  name: string;
  subName: string;
  efficiency: number;
  solicitations: string;
  color: string;
}

export interface NotificationItem {
  id: string;
  time: string;
  title: string;
  department: string;
  status: 'new' | 'processing' | 'done';
}
