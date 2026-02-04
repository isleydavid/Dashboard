
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  FileText,
  LayoutGrid,
  Zap,
  Star,
  Activity,
  User,
  ChevronRight,
  Timer,
  BrainCircuit,
  X,
  TrendingUp,
  AlertTriangle,
  Layers,
  ShieldAlert,
  ZapOff,
  BarChart3,
  TrendingDown,
  Target,
  AlertCircle,
  Maximize2,
  Users,
  Trophy,
  MessageSquare,
  ThumbsUp,
  Award,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ClipboardList,
  ThumbsDown
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { ServiceMetric, NotificationItem } from '../types';

interface InvolvedSector {
  name: string;
  sla: number;
  status: 'delayed' | 'on-time' | 'critical';
}

interface CriticalItem {
  id: string;
  label: string;
  resolution: number;
  sla: number;
  pendencyGrowth: number;
  status: 'critical' | 'attention' | 'ok';
  bottleneckReason: string;
  secretary: string;
  department: string;
  involvedSectors: InvolvedSector[];
}

interface SectorRanking {
  id: string;
  name: string;
  impact: 'Crítico' | 'Alto' | 'Médio';
  pending: number;
  efficiency: number;
  secretary: string;
}

interface Highlight {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface EvaluationRecord {
  id: string;
  service: string;
  citizen: string;
  rating: number;
  comment: string;
  date: string;
}

interface SecretaryServiceRank {
  id: string;
  secretary: string;
  department: string;
  serviceCount: number;
  topServices: { name: string; count: number; percentage: number }[];
  efficiency: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface StatusDetailState {
  type: 'pending' | 'started' | 'completed';
  label: string;
  color: 'blue' | 'orange' | 'emerald';
}

interface EvalListState {
  type: 'positive' | 'negative';
  label: string;
}

const METRICS_DATA: ServiceMetric[] = [
  { 
    label: 'Limpeza Urbana', 
    days: 1.2, 
    totalPercentage: 75, 
    totalSolicitations: 12540,
    responsible: 'Dra. Márcia Silveira (EMLUR)',
    responsibleRole: 'GESTOR DO SERVIÇO',
    statusCounts: { started: 1540, answered: 8200, pending: 2150, completed: 650 },
    sectors: [
      { sigla: 'EM', percentage: 45, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 35, color: 'bg-indigo-500' },
      { sigla: 'SF', percentage: 20, color: 'bg-indigo-300' }
    ]
  },
  { 
    label: 'Iluminação Pública', 
    days: 0.8, 
    totalPercentage: 60, 
    totalSolicitations: 8920,
    responsible: 'Eng. Roberto Mascarenhas (SEURB)',
    responsibleRole: 'COORDENADORA SEURB',
    statusCounts: { started: 890, answered: 5400, pending: 1200, completed: 1430 },
    sectors: [
      { sigla: 'SEURB', percentage: 50, color: 'bg-blue-600' },
      { sigla: 'EM', percentage: 30, color: 'bg-indigo-500' },
      { sigla: 'SS', percentage: 20, color: 'bg-indigo-300' }
    ]
  },
  { 
    label: 'Poda de Árvores', 
    days: 4.5, 
    totalPercentage: 45, 
    totalSolicitations: 5410,
    responsible: 'Dra. Márcia Silveira (EMLUR)',
    responsibleRole: 'SUPERVISOR OPERACIONAL',
    statusCounts: { started: 1200, answered: 2100, pending: 1800, completed: 310 },
    sectors: [
      { sigla: 'EM', percentage: 60, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 40, color: 'bg-indigo-500' }
    ]
  },
  { 
    label: 'Drenagem Pluvial', 
    days: 3.2, 
    totalPercentage: 30, 
    totalSolicitations: 3215,
    responsible: 'Eng. Roberto Mascarenhas (SEURB)',
    responsibleRole: 'DIRETOR TÉCNICO',
    statusCounts: { started: 450, answered: 1100, pending: 1500, completed: 165 },
    sectors: [
      { sigla: 'SEURB', percentage: 70, color: 'bg-blue-600' },
      { sigla: 'SF', percentage: 30, color: 'bg-indigo-500' }
    ]
  },
  { 
    label: 'Manutenção Viária', 
    days: 2.8, 
    totalPercentage: 55, 
    totalSolicitations: 10100,
    responsible: 'Cel. Alberto Costa (SEMOB)',
    responsibleRole: 'GESTOR SEMOB',
    statusCounts: { started: 2100, answered: 4500, pending: 2500, completed: 1000 },
    sectors: [
      { sigla: 'SEMOB', percentage: 55, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 25, color: 'bg-indigo-500' },
      { sigla: 'SF', percentage: 20, color: 'bg-indigo-300' }
    ]
  },
  { 
    label: 'Sinalização', 
    days: 1.5, 
    totalPercentage: 80, 
    totalSolicitations: 4800,
    responsible: 'Juliana Paiva (SEMOB)',
    responsibleRole: 'COORDENADORA TRÂNSITO',
    statusCounts: { started: 300, answered: 3500, pending: 200, completed: 800 },
    sectors: [
      { sigla: 'SEMOB', percentage: 80, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 20, color: 'bg-indigo-500' }
    ]
  }
];

const SECRETARY_RANKING_DATA: SecretaryServiceRank[] = [
  { 
    id: '1', 
    secretary: 'Dra. Márcia Silveira', 
    department: 'EMLUR', 
    serviceCount: 12540, 
    efficiency: 88,
    trend: 'up',
    topServices: [
      { name: 'Limpeza Urbana', count: 8200, percentage: 65 },
      { name: 'Poda de Árvores', count: 3100, percentage: 25 },
      { name: 'Coleta Seletiva', count: 1240, percentage: 10 }
    ], 
    color: 'bg-blue-600' 
  },
  { 
    id: '2', 
    secretary: 'Eng. Roberto Mascarenhas', 
    department: 'SEURB', 
    serviceCount: 10215, 
    efficiency: 74,
    trend: 'down',
    topServices: [
      { name: 'Iluminação Pública', count: 5400, percentage: 53 },
      { name: 'Drenagem Pluvial', count: 3215, percentage: 31 },
      { name: 'Obras Civis', count: 1600, percentage: 16 }
    ], 
    color: 'bg-indigo-600' 
  },
  { 
    id: '3', 
    secretary: 'Cel. Alberto Costa', 
    department: 'SEMOB', 
    serviceCount: 10100, 
    efficiency: 82,
    trend: 'up',
    topServices: [
      { name: 'Manutenção Viária', count: 4500, percentage: 44 },
      { name: 'Fiscalização', count: 3500, percentage: 35 },
      { name: 'Transporte Público', count: 2100, percentage: 21 }
    ], 
    color: 'bg-violet-600' 
  },
  { 
    id: '4', 
    secretary: 'Juliana Paiva', 
    department: 'SEMOB (Trans)', 
    serviceCount: 4800, 
    efficiency: 91,
    trend: 'stable',
    topServices: [
      { name: 'Sinalização', count: 3500, percentage: 73 },
      { name: 'Ciclovias', count: 800, percentage: 17 },
      { name: 'Educação Trânsito', count: 500, percentage: 10 }
    ], 
    color: 'bg-slate-600' 
  },
];

const EVALUATION_RECORDS: EvaluationRecord[] = [
  { id: '1', service: 'Iluminação Pública', citizen: 'Ana Maria', rating: 5, comment: 'Atendimento muito rápido, a rua ficou ótima.', date: 'Há 10 min' },
  { id: '2', service: 'Limpeza Urbana', citizen: 'Paulo Souza', rating: 4, comment: 'O serviço foi bem feito, mas demorou um pouco para chegar.', date: 'Há 1h' },
  { id: '3', service: 'Manutenção Viária', citizen: 'Juliana Lima', rating: 5, comment: 'Buracos tapados com perfeição na avenida principal.', date: 'Há 3h' },
  { id: '4', service: 'Poda de Árvores', citizen: 'Carlos Rocha', rating: 3, comment: 'A poda foi feita, mas deixaram alguns galhos na calçada.', date: 'Há 5h' },
  { id: '5', service: 'Drenagem Pluvial', citizen: 'Roberto Santos', rating: 2, comment: 'A rua ainda continua alagando após a chuva.', date: 'Há 1 dia' },
  { id: '6', service: 'Sinalização', citizen: 'Aline Ferreira', rating: 5, comment: 'Pintura da faixa de pedestre ficou excelente.', date: 'Há 2 dias' },
];

const SECTOR_RANKING: SectorRanking[] = [
  { id: '1', name: 'SEURB', impact: 'Crítico', pending: 850, efficiency: 45, secretary: 'Eng. Roberto Mascarenhas' },
  { id: '2', name: 'EMLUR', impact: 'Alto', pending: 1100, efficiency: 62, secretary: 'Dra. Márcia Silveira' },
  { id: '3', name: 'SEMOB', impact: 'Médio', pending: 420, efficiency: 78, secretary: 'Cel. Alberto Costa' },
  { id: '4', name: 'SF', impact: 'Médio', pending: 150, efficiency: 85, secretary: 'Juliana Paiva' },
];

const CRITICAL_ANALYSIS: CriticalItem[] = [
  { 
    id: '1', 
    label: 'Drenagem Pluvial', 
    resolution: 28, 
    sla: 8.5, 
    pendencyGrowth: 15, 
    status: 'critical', 
    bottleneckReason: 'Capacidade de escoamento reduzida por obstruções sistemáticas e falta de dragagem mecanizada.',
    secretary: 'Eng. Roberto Mascarenhas',
    department: 'Secretaria de Infraestrutura (SEURB)',
    involvedSectors: [
      { name: 'Planejamento Hidráulico', sla: 3, status: 'on-time' },
      { name: 'Manutenção Preventiva', sla: 8, status: 'critical' },
      { name: 'Logística de Equipamentos', sla: 3.5, status: 'on-time' }
    ]
  },
  { 
    id: '2', 
    label: 'Poda de Árvores', 
    resolution: 35, 
    sla: 6.1, 
    pendencyGrowth: 22, 
    status: 'critical', 
    bottleneckReason: 'Aumento súbito de demandas pós-tempestades e déficit de equipes especializadas em altura.',
    secretary: 'Dra. Márcia Silveira',
    department: 'Autarquia de Limpeza Urbana (EMLUR)',
    involvedSectors: [
      { name: 'Fiscalização Ambiental', sla: 2, status: 'on-time' },
      { name: 'Equipes Operacionais', sla: 3, status: 'critical' },
      { name: 'Transporte de Resíduos', sla: 1.1, status: 'on-time' }
    ]
  },
  { 
    id: '3', 
    label: 'Manutenção Viária', 
    resolution: 42, 
    sla: 5.2, 
    pendencyGrowth: -5, 
    status: 'attention', 
    bottleneckReason: 'Atraso no fornecimento de polímeros asfálticos devido a problemas contratuais com fornecedor.',
    secretary: 'Cel. Alberto Costa',
    department: 'Superintendência de Mobilidade (SEMOB)',
    involvedSectors: [
      { name: 'Suprimento de Insumos', sla: 15, status: 'critical' },
      { name: 'Equipes de Reparo', sla: 4, status: 'on-time' },
      { name: 'Controle de Qualidade', sla: 1, status: 'on-time' }
    ]
  },
  { 
    id: '4', 
    label: 'Sinalização', 
    resolution: 58, 
    sla: 4.8, 
    pendencyGrowth: 2, 
    status: 'attention', 
    bottleneckReason: 'Déficit de insumos importados para sinalização horizontal termoplástica.',
    secretary: 'Juliana Paiva',
    department: 'Coordenação de Trânsito (SEMOB)',
    involvedSectors: [
      { name: 'Planejamento Viário', sla: 3, status: 'on-time' },
      { name: 'Sinalização Vertical', sla: 1, status: 'on-time' },
      { name: 'Execução Termoplástica', sla: 0.8, status: 'delayed' }
    ]
  },
];

const RECOMMENDATIONS = [
  { id: 'r1', title: 'Remanejar pessoal para SEURB', description: 'O tempo de resposta em Drenagem Pluvial subiu 15%. Sugerimos mover equipes temporariamente do setor SF.' },
  { id: 'r2', title: 'Priorizar Poda em Mangabeira', description: 'Concentração de 40% das podas atrasadas identificada neste quadrante.' },
];

const Dashboard: React.FC = () => {
  const [total, setTotal] = useState(1026262);
  const [activeTab, setActiveTab] = useState<'servicos' | 'eficiencia' | 'avaliacao'>('servicos');
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceMetric | null>(null);
  const [selectedCriticalItem, setSelectedCriticalItem] = useState<CriticalItem | null>(null);
  const [selectedStatusDetail, setSelectedStatusDetail] = useState<StatusDetailState | null>(null);
  const [selectedEvalList, setSelectedEvalList] = useState<EvalListState | null>(null);
  const [expandedRankId, setExpandedRankId] = useState<string | null>('1');

  const highlights: Highlight[] = [
    { icon: <BrainCircuit size={16} />, label: 'ALERTA IA', value: 'Pico de tráfego em Epitácio' },
    { icon: <Zap size={16} />, label: 'MAIS SOLICITADO', value: 'Limpeza Urbana' },
    { icon: <Bell size={16} />, label: 'STATUS EM TEMPO REAL', value: 'Poste reparado em Torre' },
    { icon: <Star size={16} />, label: 'MELHOR AVALIADO', value: 'Iluminação Pública (4.9)' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
      setRecommendationIndex((prev) => (prev + 1) % RECOMMENDATIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Erro ao tentar ativar modo tela cheia: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const getSectorsForService = (serviceName: string) => {
    const metric = METRICS_DATA.find(m => m.label === serviceName);
    return metric ? metric.sectors.map(s => s.sigla).join(', ') : 'N/A';
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col transition-all duration-500">
      {/* Header */}
      <header className={`${(activeTab === 'eficiencia' || activeTab === 'avaliacao') ? 'bg-[#0a0f1e] h-auto pb-8' : 'blue-gradient-bg pb-32'} text-white px-6 md:px-12 pt-8 rounded-b-[3.5rem] relative transition-all duration-700 z-10 shadow-2xl`}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-fade-in-up gap-6">
            <div className="flex flex-wrap items-center gap-4 md:gap-10">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl border backdrop-blur-md transition-colors ${activeTab === 'eficiencia' ? 'bg-red-500/10 border-red-500/20' : 'bg-white/15 border-white/20'}`}>
                  <LayoutGrid size={24} className={activeTab === 'eficiencia' ? 'text-red-500' : 'text-white'} />
                </div>
                <h1 className="font-black text-2xl tracking-tighter">Cidade<span className={activeTab === 'eficiencia' ? 'font-light text-red-500' : 'font-light text-blue-300'}>Conectada</span></h1>
              </div>

              <nav className="flex items-center bg-black/40 backdrop-blur-xl rounded-[2rem] p-1.5 border border-white/10 shadow-inner overflow-x-auto custom-scrollbar">
                <button
                  onClick={() => setActiveTab('servicos')}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[1.5rem] transition-all duration-500 text-[11px] uppercase tracking-widest font-black whitespace-nowrap
                    ${activeTab === 'servicos' ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-white/40 hover:text-white'}`}
                >
                  <Activity size={16} /> Serviços
                </button>
                <button
                  onClick={() => setActiveTab('eficiencia')}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[1.5rem] transition-all duration-500 text-[11px] uppercase tracking-widest font-black whitespace-nowrap
                    ${activeTab === 'eficiencia' ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-white/40 hover:text-white'}`}
                >
                  <ZapOff size={16} className={activeTab === 'eficiencia' ? 'text-red-600' : ''} /> Baixa Eficiência
                </button>
                <button
                  onClick={() => setActiveTab('avaliacao')}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[1.5rem] transition-all duration-500 text-[11px] uppercase tracking-widest font-black whitespace-nowrap
                    ${activeTab === 'avaliacao' ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-white/40 hover:text-white'}`}
                >
                  <Star size={16} className={activeTab === 'avaliacao' ? 'text-yellow-500' : ''} /> Avaliação
                </button>
              </nav>
            </div>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={toggleFullscreen}
                className={`flex items-center gap-3 px-6 py-2.5 border rounded-2xl hover:bg-white/10 transition-all text-[11px] font-black tracking-widest uppercase backdrop-blur-sm group ${activeTab === 'eficiencia' ? 'border-white/20 text-white bg-white/5' : 'border-white/20 text-white'}`}
              >
                <Maximize2 size={16} className={`group-hover:scale-110 transition-transform ${activeTab === 'eficiencia' ? 'text-white' : ''}`} /> 
                EXPANDIR
              </button>
              
              <div className="h-10 w-px bg-white/10" />

              <div className={`rounded-2xl w-11 h-11 flex items-center justify-center border shadow-2xl hover:rotate-12 transition-transform cursor-pointer ${activeTab === 'eficiencia' ? 'bg-red-600 border-red-500' : 'bg-blue-600 border-white/10'}`}>
                <User size={22} />
              </div>
            </div>
          </div>

          {(activeTab === 'servicos') && (
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 animate-fade-in-up pb-4">
              <div className="flex-1">
                <p className="text-blue-300 uppercase tracking-widest font-black text-[10px] mb-2 flex items-center gap-2">
                  <Activity size={14} className="animate-pulse text-emerald-400" /> Monitoramento Live
                </p>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                  <AnimatedCounter target={total} />
                </h2>
                <div className="group cursor-pointer w-full max-w-lg relative h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all hover:bg-white/15">
                  {highlights.map((item, idx) => (
                    <div key={idx} className={`absolute inset-0 flex items-center gap-4 px-5 transition-all duration-1000 ease-in-out ${idx === highlightIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                      <div className="bg-blue-600/40 p-2 rounded-lg border border-white/10 group-hover:bg-blue-600/60 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-200/80">{item.label}</span>
                        <span className="text-sm font-bold text-white truncate block leading-tight">{item.value}</span>
                      </div>
                      <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 min-w-[320px] shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                     <TrendingUp className="text-blue-300" size={16} />
                     <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Eficiência Geral</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400"><Star size={14} fill="currentColor" /> <span className="text-white font-black">4.8</span></div>
                </div>
                <div className="space-y-4">
                  <div>
                     <div className="flex justify-between items-center text-[10px] font-bold text-blue-200 uppercase mb-2 tracking-tighter">
                        <span>Resolução (24h)</span>
                        <span>92%</span>
                     </div>
                     <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-400 w-[92%] transition-all duration-1000 ease-out" />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-20 transition-all duration-700 relative z-20 ${(activeTab === 'eficiencia' || activeTab === 'avaliacao') ? 'mt-12' : '-mt-16'}`}>
        
        {/* Metric Cards Row */}
        <div className={`grid grid-cols-1 ${activeTab === 'servicos' || activeTab === 'avaliacao' ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4 mb-8`}>
          {activeTab === 'servicos' && (
            <>
              <MetricCard 
                label="NOVAS SOLICITAÇÕES" 
                value={1026262} 
                icon={<FileText size={20} />} 
                color="blue" 
                delay="0s" 
                onClick={() => setSelectedStatusDetail({ type: 'pending', label: 'Novas Solicitações', color: 'blue' })}
              />
              <MetricCard 
                label="EM ATENDIMENTO" 
                value={51313} 
                icon={<Clock size={20} />} 
                color="orange" 
                delay="0.1s" 
                onClick={() => setSelectedStatusDetail({ type: 'started', label: 'Em Atendimento', color: 'orange' })}
              />
              <MetricCard 
                label="CONCLUÍDAS" 
                value={2450} 
                icon={<CheckCircle size={20} />} 
                color="emerald" 
                delay="0.2s" 
                onClick={() => setSelectedStatusDetail({ type: 'completed', label: 'Concluídas', color: 'emerald' })}
              />
            </>
          )}

          {activeTab === 'eficiencia' && (
            <>
              <MetricCard label="GARGALOS CRÍTICOS" value={4} subtitle="SERVIÇOS TRAVADOS" icon={<AlertCircle size={20} />} color="red" delay="0s" />
              <MetricCard label="SLA OVERFLOW" value={850} subtitle="DEMANDAS ATRASADAS" icon={<Clock size={20} />} color="orange" delay="0.1s" />
              <MetricCard label="SOBRECARGA SETOR" value="SEURB" subtitle="DEPARTAMENTO CRÍTICO" icon={<BarChart3 size={20} />} color="red" delay="0.2s" />
              <MetricCard label="QUEDA EFICIÊNCIA" value={18} formatter={(v) => `-${v}%`} subtitle="COMPARADO AO MÊS ANTERIOR" icon={<TrendingDown size={20} />} color="orange" delay="0.3s" />
            </>
          )}

          {activeTab === 'avaliacao' && (
            <>
              <MetricCard label="NOTA MÉDIA GERAL" value={4.8} formatter={(v) => v.toFixed(1)} subtitle="SCORE DE SATISFAÇÃO" icon={<Star size={20} />} color="blue" delay="0s" />
              <MetricCard 
                label="FEEDBACKS POSITIVOS" 
                value={8500} 
                formatter={(v) => `${(v/100).toFixed(0)}%`} 
                subtitle="SENTIMENTO POSITIVO" 
                icon={<ThumbsUp size={20} />} 
                color="emerald" 
                delay="0.1s" 
                onClick={() => setSelectedEvalList({ type: 'positive', label: 'Feedbacks Positivos' })}
              />
              <MetricCard 
                label="FEEDBACKS NEGATIVOS" 
                value={1240} 
                icon={<ThumbsDown size={20} />} 
                color="orange" 
                delay="0.2s" 
                onClick={() => setSelectedEvalList({ type: 'negative', label: 'Feedbacks Negativos' })}
              />
            </>
          )}
        </div>

        {/* --- ABA SERVIÇOS --- */}
        {activeTab === 'servicos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
            <section className="lg:col-span-2 bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10 transition-all duration-500">
              <h3 className="font-black text-slate-900 text-2xl mb-8 tracking-tighter">
                 Serviços e Participação
              </h3>
              <div className="space-y-8">
                {METRICS_DATA.map((metric, idx) => (
                  <div key={idx} onClick={() => setSelectedServiceDetail(metric)} className="flex items-center gap-6 cursor-pointer group hover:bg-slate-50 p-4 -m-4 rounded-2xl transition-all">
                    <div className="w-8 shrink-0 text-slate-300 font-black text-sm">{(idx + 1).toString().padStart(2, '0')}</div>
                    <div className="w-40 shrink-0 font-black text-blue-700 text-sm">{metric.label}</div>
                    <div className="flex-1">
                      <div className="w-full h-8 bg-slate-100 rounded-xl overflow-hidden flex shadow-inner relative">
                        {metric.sectors.map((sector, sIdx) => (
                          <div key={sIdx} className={`${sector.color} h-full transition-all duration-1000 ease-out flex items-center justify-center hover:brightness-110`} style={{ width: `${sector.percentage}%` }}>
                            <span className="text-[8px] font-black text-white/90 uppercase px-2 whitespace-nowrap">{sector.sigla}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-24 text-right shrink-0">
                      <p className="font-black text-slate-900 text-base leading-none mb-0.5">{metric.totalSolicitations.toLocaleString('pt-BR')}</p>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Solicit.</span>
                    </div>
                    <div className="w-5 shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"><ChevronRight size={18} /></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-10 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Timer size={18} className="animate-spin-slow" /></div>
                <h3 className="font-black text-gray-900 text-base">Tempo de Resposta</h3>
              </div>
              <div className="space-y-4">
                {METRICS_DATA.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-50 group">
                    <span className="text-[11px] font-bold text-gray-600 group-hover:text-slate-900 transition-colors">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-black text-xs ${metric.days > 3 ? 'text-red-500' : 'text-emerald-500'}`}>{metric.days}d</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${metric.days > 3 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* --- ABA BAIXA EFICIÊNCIA --- */}
        {activeTab === 'eficiencia' && (
          <div className="space-y-8 animate-fade-in-up">
            <section className="bg-slate-900 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-8 md:p-10 group">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
               <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex-1 max-xl">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="bg-red-600 p-2.5 rounded-xl shadow-lg shadow-red-900/40 animate-pulse"><Target className="text-white" size={24} /></div>
                        <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em]">IA: Recomendação Estratégica</span>
                     </div>
                     <div className="relative h-20 overflow-hidden">
                        {RECOMMENDATIONS.map((rec, idx) => (
                          <div key={rec.id} className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === recommendationIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                             <h3 className="text-white text-xl md:text-2xl font-black mb-2 tracking-tighter">{rec.title}</h3>
                             <p className="text-slate-400 text-sm font-medium leading-tight">{rec.description}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                  <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-2xl shadow-red-900/60 transition-all active:scale-95 flex items-center justify-center gap-3 text-[10px] tracking-widest uppercase">
                    <ShieldAlert size={18} /> NOTIFICAR CENTRAIS
                  </button>
               </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                     <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <ZapOff size={20} className="text-red-500" /> Criticidade
                     </h3>
                  </div>
                  <div className="p-2">
                     {CRITICAL_ANALYSIS.map((item, idx) => (
                       <div key={item.id} onClick={() => setSelectedCriticalItem(item)} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
                          <div className="flex items-center gap-4">
                             <span className="font-black text-slate-300 text-xs">{(idx + 1).toString().padStart(2, '0')}</span>
                             <span className="font-black text-slate-800 text-sm group-hover:text-red-600 transition-colors">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-6">
                             <div className="text-right">
                                <p className="font-black text-slate-900 text-xs">{item.resolution}%</p>
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Resolução</p>
                             </div>
                             <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${item.status === 'critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                {item.status === 'critical' ? 'Crítico' : 'Atenção'}
                             </span>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                     <Trophy size={20} className="text-red-600" /> Gargalos Setoriais
                  </h3>
                  <div className="space-y-4 overflow-y-auto custom-scrollbar pr-1 max-h-[400px]">
                    {SECTOR_RANKING.map((sector, idx) => (
                      <div key={sector.id} className="relative p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group overflow-hidden">
                        <div className="absolute top-2 right-4 text-5xl font-black text-slate-200/40 group-hover:text-red-200/40 transition-colors pointer-events-none">
                          {(idx + 1).toString().padStart(2, '0')}
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                             <div className={`p-2 rounded-lg ${sector.impact === 'Crítico' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                                <BarChart3 size={16} />
                             </div>
                             <div>
                                <h4 className="font-black text-slate-900 text-sm leading-none">{sector.name}</h4>
                                <span className="text-[8px] font-black text-red-600 uppercase tracking-widest">{sector.impact}</span>
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                               <p className="text-xl font-black text-slate-900 tracking-tighter">{sector.pending.toLocaleString('pt-BR')}</p>
                               <span className="text-[8px] font-black text-slate-400 uppercase">Pendentes</span>
                            </div>
                            <div className="text-right">
                               <p className="text-xl font-black text-red-600 tracking-tighter">{sector.efficiency}%</p>
                               <span className="text-[8px] font-black text-slate-400 uppercase">Eficiência</span>
                            </div>
                          </div>
                          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                             <div className={`h-full ${sector.impact === 'Crítico' ? 'bg-red-600' : 'bg-blue-600'}`} style={{ width: `${100 - sector.efficiency}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* --- ABA AVALIAÇÃO --- */}
        {activeTab === 'avaliacao' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
             <section className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                   <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600"><Star size={20} fill="currentColor" /></div>
                   <h3 className="font-black text-slate-900 text-lg tracking-tighter">Satisfação</h3>
                </div>
                <div className="space-y-6 flex-1">
                   {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = stars === 5 ? 85 : stars === 4 ? 10 : 2;
                      return (
                        <div key={stars} className="space-y-1.5">
                           <div className="flex justify-between items-center">
                              <div className="flex gap-0.5">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className={i < stars ? 'text-yellow-400' : 'text-slate-200'} fill={i < stars ? 'currentColor' : 'none'} />
                                 ))}
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase">{percentage}%</span>
                           </div>
                           <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                              <div className={`h-full ${stars >= 4 ? 'bg-emerald-500' : stars === 3 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${percentage}%` }} />
                           </div>
                        </div>
                      );
                   })}
                </div>
                <div className="mt-8 p-4 bg-slate-900 rounded-2xl text-center">
                   <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Score IA</p>
                   <p className="text-white text-3xl font-black tracking-tighter">9.2<span className="text-sm text-emerald-400">/10</span></p>
                </div>
             </section>

             <section className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8">
                   <h3 className="font-black text-slate-900 text-xl tracking-tighter flex items-center gap-2 mb-8">
                      <MessageSquare className="text-blue-600" size={20} /> Feedbacks Recentes
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {EVALUATION_RECORDS.map((record) => (
                         <div key={record.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white transition-all group">
                            <div className="flex justify-between items-start mb-3">
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-[10px]">
                                     {record.citizen.charAt(0)}
                                  </div>
                                  <div>
                                     <p className="font-black text-slate-900 text-xs leading-none mb-0.5">{record.citizen}</p>
                                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{record.date}</p>
                                  </div>
                               </div>
                               <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                     <Star key={i} size={8} className={i < record.rating ? 'text-yellow-400' : 'text-slate-300'} fill={i < record.rating ? 'currentColor' : 'none'} />
                                  ))}
                               </div>
                            </div>
                            <p className="text-[11px] font-medium text-slate-600 leading-snug italic">"{record.comment}"</p>
                         </div>
                      ))}
                   </div>
                </div>
             </section>
          </div>
        )}
      </main>

      {/* MODAL LISTAGEM DETALHADA POR STATUS */}
      {selectedStatusDetail && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 animate-fade-in-up">
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedStatusDetail(null)} />
           <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col h-[85vh]">
              {/* Header */}
              <div className={`p-10 text-white flex justify-between items-center relative transition-colors ${
                selectedStatusDetail.color === 'blue' ? 'bg-[#1e3a8a]' : 
                selectedStatusDetail.color === 'orange' ? 'bg-orange-600' : 'bg-emerald-600'
              }`}>
                 <div className="flex items-center gap-5">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg">
                       <ClipboardList size={32} className="text-white" />
                    </div>
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1 block">LISTAGEM DETALHADA</span>
                       <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedStatusDetail.label}</h3>
                    </div>
                 </div>
                 <button onClick={() => setSelectedStatusDetail(null)} className="p-3 bg-black/10 hover:bg-black/20 rounded-full transition-colors">
                    <X size={24} />
                 </button>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-hidden flex flex-col p-10">
                 <div className="bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto custom-scrollbar flex-1">
                       <table className="w-full text-left border-collapse">
                          <thead className="bg-white border-b border-slate-200 sticky top-0 z-10">
                             <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Serviço</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Atual</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Setor Responsável</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Secretaria Vinculada</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Quantidade</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                             {METRICS_DATA.map((metric, idx) => (
                               <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                  <td className="px-8 py-6">
                                     <span className="font-black text-slate-900 text-sm leading-tight block">{metric.label}</span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                       selectedStatusDetail.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                       selectedStatusDetail.color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                                     }`}>
                                        <div className={`w-2 h-2 rounded-full ${
                                          selectedStatusDetail.color === 'blue' ? 'bg-blue-500' :
                                          selectedStatusDetail.color === 'orange' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'
                                        }`} />
                                        {selectedStatusDetail.label}
                                     </span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <span className="font-bold text-slate-600 text-xs uppercase tracking-wider">{metric.sectors[0].sigla}</span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <p className="font-black text-slate-800 text-xs leading-none">{metric.responsible?.split(' (')[0]}</p>
                                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1 block">
                                       {metric.responsible?.split(' (')[1]?.replace(')', '') || 'ÓRGÃO VINCULADO'}
                                     </span>
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                     <span className="text-xl font-black text-slate-900 tracking-tighter">
                                        {selectedStatusDetail.type === 'pending' ? metric.statusCounts?.pending.toLocaleString('pt-BR') :
                                         selectedStatusDetail.type === 'started' ? metric.statusCounts?.started.toLocaleString('pt-BR') :
                                         metric.statusCounts?.completed.toLocaleString('pt-BR')}
                                     </span>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
                 <div className="mt-8 flex justify-end">
                    <button 
                      onClick={() => setSelectedStatusDetail(null)} 
                      className="px-10 py-5 bg-[#0a0f1e] hover:bg-black text-white font-black rounded-[1.5rem] text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.98]"
                    >
                       FECHAR LISTAGEM
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* MODAL LISTAGEM DETALHADA DE FEEDBACKS */}
      {selectedEvalList && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 animate-fade-in-up">
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedEvalList(null)} />
           <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col h-[85vh]">
              {/* Header */}
              <div className={`p-10 text-white flex justify-between items-center relative transition-colors ${
                selectedEvalList.type === 'positive' ? 'bg-emerald-600' : 'bg-orange-600'
              }`}>
                 <div className="flex items-center gap-5">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg">
                       <MessageSquare size={32} className="text-white" />
                    </div>
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1 block">DETALHAMENTO DE FEEDBACKS</span>
                       <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedEvalList.label}</h3>
                    </div>
                 </div>
                 <button onClick={() => setSelectedEvalList(null)} className="p-3 bg-black/10 hover:bg-black/20 rounded-full transition-colors">
                    <X size={24} />
                 </button>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-hidden flex flex-col p-10">
                 <div className="bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto custom-scrollbar flex-1">
                       <table className="w-full text-left border-collapse">
                          <thead className="bg-white border-b border-slate-200 sticky top-0 z-10">
                             <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Serviço</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Setores Envolvidos</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nota</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Descrição do Feedback</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                             {EVALUATION_RECORDS
                               .filter(record => selectedEvalList.type === 'positive' ? record.rating >= 4 : record.rating < 4)
                               .map((record, idx) => (
                               <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                  <td className="px-8 py-6">
                                     <span className="font-black text-slate-900 text-sm leading-tight block">{record.service}</span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <span className="font-bold text-slate-600 text-xs uppercase tracking-wider">
                                       {getSectorsForService(record.service)}
                                     </span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <div className="flex items-center gap-1">
                                        <span className={`text-lg font-black tracking-tighter ${selectedEvalList.type === 'positive' ? 'text-emerald-600' : 'text-orange-600'}`}>
                                          {record.rating}
                                        </span>
                                        <Star size={14} className={selectedEvalList.type === 'positive' ? 'text-yellow-400' : 'text-slate-300'} fill="currentColor" />
                                     </div>
                                  </td>
                                  <td className="px-8 py-6">
                                     <p className="text-xs font-medium text-slate-600 italic leading-relaxed">
                                       "{record.comment}"
                                     </p>
                                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-2 block">
                                       Enviado por: {record.citizen} • {record.date}
                                     </span>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
                 <div className="mt-8 flex justify-end">
                    <button 
                      onClick={() => setSelectedEvalList(null)} 
                      className="px-10 py-5 bg-[#0a0f1e] hover:bg-black text-white font-black rounded-[1.5rem] text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.98]"
                    >
                       FECHAR LISTAGEM
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* MODAL ANÁLISE CRÍTICA - ATUALIZADO CONFORME REFERÊNCIA */}
      {selectedCriticalItem && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-fade-in-up">
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedCriticalItem(null)} />
           <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-[#e11d48] p-10 text-white flex justify-between items-center relative">
                 <div className="flex items-center gap-5">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg">
                       <AlertCircle size={32} className="text-white" />
                    </div>
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1 block">ANÁLISE DE CRITICIDADE</span>
                       <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedCriticalItem.label}</h3>
                    </div>
                 </div>
                 <button onClick={() => setSelectedCriticalItem(null)} className="p-3 bg-black/10 hover:bg-black/20 rounded-full transition-colors">
                    <X size={24} />
                 </button>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-10 space-y-10 max-h-[75vh] overflow-y-auto custom-scrollbar">
                 {/* Secretário e Departamento */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <User size={14} /> SECRETÁRIO RESPONSÁVEL
                       </h4>
                       <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-6 flex items-center gap-4">
                          <div className="bg-blue-100 p-3.5 rounded-2xl text-blue-600">
                             <User size={24} />
                          </div>
                          <div>
                             <p className="font-black text-slate-900 text-base leading-tight">{selectedCriticalItem.secretary}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">TITULAR DA PASTA</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Layers size={14} /> DEPARTAMENTO
                       </h4>
                       <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-6">
                          <p className="text-sm font-black text-slate-800 leading-tight mb-3">{selectedCriticalItem.department}</p>
                          <span className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest">SETOR CRÍTICO</span>
                       </div>
                    </div>
                 </div>

                 {/* Motivo do Gargalo */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <AlertTriangle size={14} className="text-[#e11d48]" /> MOTIVO DO GARGALO (IA ANALYTICS)
                    </h4>
                    <div className="bg-[#fff1f2] border border-[#fecdd3] p-8 rounded-[2rem] italic text-[#881337] text-base leading-relaxed text-center font-medium">
                       "{selectedCriticalItem.bottleneckReason}"
                    </div>
                 </div>

                 {/* Fluxo Operacional */}
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Activity size={14} /> FLUXO OPERACIONAL E SLA POR SETOR
                    </h4>
                    <div className="space-y-3">
                       {selectedCriticalItem.involvedSectors.map((sector, sIdx) => (
                          <div key={sIdx} className="bg-white border border-slate-100 rounded-[1.5rem] p-5 flex items-center justify-between group hover:shadow-lg transition-all">
                             <div className="flex items-center gap-4">
                                <div className={`w-2.5 h-2.5 rounded-full ${sector.status === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                                <span className="text-sm font-black text-slate-700">{sector.name}</span>
                             </div>
                             <div className="flex items-center gap-6">
                                <span className={`text-[11px] font-black ${sector.status === 'critical' ? 'text-red-600' : 'text-slate-500'}`}>
                                   {sector.sla} dias (SLA)
                                </span>
                                <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                   sector.status === 'critical' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                                }`}>
                                   {sector.status === 'critical' ? 'CRÍTICO' : 'NO PRAZO'}
                                </span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* Botão de Fechar */}
                 <button 
                   onClick={() => setSelectedCriticalItem(null)} 
                   className="w-full py-6 bg-[#0a0f1e] hover:bg-black text-white font-black rounded-[1.5rem] text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.98]"
                 >
                    FECHAR RELATÓRIO DE CRITICIDADE
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Modal Detalhes do Serviço */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setSelectedServiceDetail(null)} />
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-fade-in-up">
              {/* Header do Modal */}
              <div className="bg-[#1e3a8a] p-8 text-white flex justify-between items-center">
                 <div className="flex items-center gap-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <Activity size={32} />
                    </div>
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1 block">DETALHES DO SERVIÇO</span>
                       <h3 className="text-4xl font-black tracking-tighter leading-none">{selectedServiceDetail.label}</h3>
                    </div>
                 </div>
                 <button onClick={() => setSelectedServiceDetail(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors">
                    <X size={28} />
                 </button>
              </div>

              {/* Corpo do Modal */}
              <div className="p-10 space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Responsável Direto */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <User size={14} /> RESPONSÁVEL DIRETO
                       </h4>
                       <div className="bg-blue-50/30 border border-blue-50/50 rounded-[2.5rem] p-6 flex items-center gap-5">
                          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
                             <User size={32} />
                          </div>
                          <div>
                             <p className="font-black text-slate-900 text-xl leading-tight">{selectedServiceDetail.responsible || 'Carlos Silva (EMLUR)'}</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{selectedServiceDetail.responsibleRole || 'GESTOR DO SERVIÇO'}</p>
                          </div>
                       </div>
                    </div>

                    {/* Setores Participantes */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Layers size={14} /> SETORES PARTICIPANTES
                       </h4>
                       <div className="flex flex-wrap gap-3">
                          {selectedServiceDetail.sectors.map((s, idx) => (
                             <div key={idx} className="bg-white border border-slate-100 shadow-sm rounded-xl px-5 py-2.5 flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                                <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{s.sigla}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Resumo de Solicitações */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <FileText size={14} /> RESUMO DE SOLICITAÇÕES
                       </h4>
                       <span className="text-sm font-black text-slate-900 tracking-tight">Total: {selectedServiceDetail.totalSolicitations.toLocaleString('pt-BR')}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-[1.5rem] text-center">
                          <p className="text-3xl font-black text-blue-700 leading-none mb-2">{selectedServiceDetail.statusCounts?.started.toLocaleString('pt-BR') || '0'}</p>
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">INICIADAS</span>
                       </div>
                       <div className="bg-indigo-50/50 border border-indigo-100 p-6 rounded-[1.5rem] text-center">
                          <p className="text-3xl font-black text-indigo-700 leading-none mb-2">{selectedStatusDetail?.type === 'started' ? <AnimatedCounter target={selectedServiceDetail.statusCounts?.answered || 0} /> : (selectedServiceDetail.statusCounts?.answered.toLocaleString('pt-BR') || '0')}</p>
                          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">RESPONDIDAS</span>
                       </div>
                       <div className="bg-orange-50/50 border border-orange-100 p-6 rounded-[1.5rem] text-center">
                          <p className="text-3xl font-black text-orange-700 leading-none mb-2">{selectedServiceDetail.statusCounts?.pending.toLocaleString('pt-BR') || '0'}</p>
                          <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">PENDENTES</span>
                       </div>
                       <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-[1.5rem] text-center">
                          <p className="text-3xl font-black text-emerald-700 leading-none mb-2">{selectedServiceDetail.statusCounts?.completed.toLocaleString('pt-BR') || '0'}</p>
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">CONCLUÍDAS</span>
                       </div>
                    </div>
                 </div>

                 {/* Botão de Ação */}
                 <button 
                   onClick={() => setSelectedServiceDetail(null)} 
                   className="w-full py-6 bg-[#2563eb] hover:bg-blue-700 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 transition-all active:scale-[0.98]"
                 >
                    CONCLUIR ANÁLISE
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{ 
  label: string; 
  value: number | string; 
  subtitle?: string; 
  icon: React.ReactNode; 
  color: 'blue' | 'orange' | 'emerald' | 'red'; 
  formatter?: (v: any) => string; 
  delay?: string;
  onClick?: () => void;
}> = ({ label, value, subtitle, icon, color, formatter, delay = "0s", onClick }) => {
  const iconColors = {
    blue: 'text-blue-600 bg-blue-50',
    orange: 'text-orange-600 bg-orange-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    red: 'text-red-600 bg-red-50'
  };
  
  return (
    <div 
      style={{ animationDelay: delay }}
      onClick={onClick}
      className={`bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 group transition-all duration-500 animate-fade-in-up relative z-10 flex flex-col justify-between h-44 ${onClick ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-1 active:scale-95' : ''}`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{label}</span>
        <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${iconColors[color as any]}`}>
          {React.cloneElement(icon as React.ReactElement, { size: 24 })}
        </div>
      </div>
      <div>
        <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
           {typeof value === 'number' ? <AnimatedCounter target={value} formatter={formatter} /> : value}
        </p>
        {subtitle && (
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mt-2 block">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
