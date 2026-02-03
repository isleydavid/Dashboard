
export interface SectorParticipation {
  sigla: string;
  percentage: number;
  color: string;
}

export interface StatusCounts {
  started: number;
  answered: number;
  pending: number;
  completed: number;
}

export interface ServiceMetric {
  label: string;
  days: number;
  totalPercentage: number;
  totalSolicitations: number;
  sectors: SectorParticipation[];
  responsible?: string;
  responsibleRole?: string;
  statusCounts?: StatusCounts;
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