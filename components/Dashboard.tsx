
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
  Award
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

const EVALUATION_RECORDS: EvaluationRecord[] = [
  { id: '1', service: 'Iluminação Pública', citizen: 'Ana Maria', rating: 5, comment: 'Atendimento muito rápido, a rua ficou ótima.', date: 'Há 10 min' },
  { id: '2', service: 'Limpeza Urbana', citizen: 'Paulo Souza', rating: 4, comment: 'O serviço foi bem feito, mas demorou um pouco para chegar.', date: 'Há 1h' },
  { id: '3', service: 'Manutenção Viária', citizen: 'Juliana Lima', rating: 5, comment: 'Buracos tapados com perfeição na avenida principal.', date: 'Há 3h' },
  { id: '4', service: 'Poda de Árvores', citizen: 'Carlos Rocha', rating: 3, comment: 'A poda foi feita, mas deixaram alguns galhos na calçada.', date: 'Há 5h' },
];

const METRICS_DATA: ServiceMetric[] = [
  { 
    label: 'Limpeza Urbana', 
    days: 1.2, 
    totalPercentage: 75, 
    totalSolicitations: 12540,
    responsible: 'Carlos Silva (EMLUR)',
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
    responsible: 'Ana Clara Melo',
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
    responsible: 'Ricardo Duarte',
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
    responsible: 'Eng. Roberto Mascarenhas',
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
    responsible: 'Alberto Costa',
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
    responsible: 'Juliana Paiva',
    responsibleRole: 'COORDENADORA TRÂNSITO',
    statusCounts: { started: 300, answered: 3500, pending: 200, completed: 800 },
    sectors: [
      { sigla: 'SEMOB', percentage: 80, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 20, color: 'bg-indigo-500' }
    ]
  }
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
      { name: 'Engenharia Hidráulica', sla: 3, status: 'critical' },
      { name: 'Manutenção Preventiva', sla: 2, status: 'delayed' },
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
      { name: 'Compras e Licitações', sla: 30, status: 'delayed' },
      { name: 'Asfaltamento Noturno', sla: 4, status: 'on-time' },
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
  const [activeTab, setActiveTab] = useState<'solicitacoes' | 'eficiencia' | 'avaliacao'>('solicitacoes');
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceMetric | null>(null);
  const [selectedCriticalItem, setSelectedCriticalItem] = useState<CriticalItem | null>(null);

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

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col transition-all duration-500">
      {/* Header */}
      <header className={`${activeTab === 'eficiencia' ? 'bg-[#0a0f1e] h-auto pb-8' : 'blue-gradient-bg pb-32'} text-white px-6 md:px-12 pt-8 rounded-b-[3.5rem] relative transition-all duration-700 z-10 shadow-2xl`}>
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

              <nav className="flex items-center bg-black/40 backdrop-blur-xl rounded-[2rem] p-1.5 border border-white/10 shadow-inner overflow-x-auto">
                <button
                  onClick={() => setActiveTab('solicitacoes')}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-[1.5rem] transition-all duration-500 text-[11px] uppercase tracking-widest font-black whitespace-nowrap
                    ${activeTab === 'solicitacoes' ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-white/40 hover:text-white'}`}
                >
                  <FileText size={16} /> Solicitações
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

          {(activeTab === 'solicitacoes' || activeTab === 'avaliacao') && (
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
      <main className={`max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-20 transition-all duration-700 relative z-20 ${activeTab === 'eficiencia' ? 'mt-12' : '-mt-16'}`}>
        
        {/* Metric Cards Row */}
        <div className={`grid grid-cols-1 ${activeTab === 'solicitacoes' ? 'md:grid-cols-3' : activeTab === 'avaliacao' ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 mb-12`}>
          {activeTab === 'solicitacoes' && (
            <>
              <MetricCard label="NOVAS SOLICITAÇÕES" value={1026262} icon={<FileText size={20} />} color="blue" delay="0s" />
              <MetricCard label="EM ATENDIMENTO" value={51313} icon={<Clock size={20} />} color="orange" delay="0.1s" />
              <MetricCard label="CONCLUÍDAS" value={2450} icon={<CheckCircle size={20} />} color="emerald" delay="0.2s" />
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
              <MetricCard label="FEEDBACKS POSITIVOS" value={8500} formatter={(v) => `${(v/100).toFixed(0)}%`} subtitle="SENTIMENTO POSITIVO" icon={<ThumbsUp size={20} />} color="emerald" delay="0.1s" />
              <MetricCard label="SERVIÇOS AVALIADOS" value={1240} icon={<Award size={20} />} color="orange" delay="0.2s" />
            </>
          )}
        </div>

        {/* --- ABA SOLICITAÇÕES --- */}
        {activeTab === 'solicitacoes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
            <section className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 transition-all duration-500">
              <h3 className="font-black text-slate-900 text-3xl mb-12 tracking-tighter">
                 Serviços e Participação
              </h3>
              <div className="space-y-12">
                {METRICS_DATA.map((metric, idx) => (
                  <div key={idx} onClick={() => setSelectedServiceDetail(metric)} className="flex items-center gap-8 cursor-pointer group hover:bg-slate-50 p-6 -m-6 rounded-[2.5rem] transition-all">
                    <div className="w-10 shrink-0 text-slate-300 font-black text-sm">{(idx + 1).toString().padStart(2, '0')}</div>
                    <div className="w-52 shrink-0 font-black text-blue-700 text-base">{metric.label}</div>
                    <div className="flex-1">
                      <div className="w-full h-11 bg-slate-100 rounded-2xl overflow-hidden flex shadow-inner relative">
                        {metric.sectors.map((sector, sIdx) => (
                          <div key={sIdx} className={`${sector.color} h-full transition-all duration-1000 ease-out flex items-center justify-center hover:brightness-110`} style={{ width: `${sector.percentage}%` }}>
                            <span className="text-[9px] font-black text-white/90 uppercase px-2 whitespace-nowrap">{sector.sigla} {sector.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-28 text-right shrink-0">
                      <div className="flex flex-col items-end">
                        <span className="font-black text-slate-900 text-lg leading-none mb-1">{metric.totalSolicitations.toLocaleString('pt-BR')}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solicit.</span>
                      </div>
                    </div>
                    <div className="w-6 shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"><ChevronRight size={20} /></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-10 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Timer size={20} className="animate-spin-slow" /></div>
                <h3 className="font-black text-gray-900 text-lg">Tempo de Resposta</h3>
              </div>
              <div className="space-y-6">
                {METRICS_DATA.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-50 group">
                    <span className="text-xs font-bold text-gray-600 group-hover:text-slate-900 transition-colors">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-black ${metric.days > 3 ? 'text-red-500' : 'text-emerald-500'}`}>{metric.days}d</span>
                      <div className={`w-2 h-2 rounded-full ${metric.days > 3 ? 'bg-red-500 shadow-sm' : 'bg-emerald-500 shadow-sm'} ${idx === 0 ? 'animate-pulse' : ''}`} />
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
            <section className="bg-slate-900 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden p-10 md:p-14 group">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-[4000ms]" />
               <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                  <div className="flex-1 max-w-2xl">
                     <div className="flex items-center gap-4 mb-8">
                        <div className="bg-red-600 p-3 rounded-2xl shadow-xl shadow-red-900/40 animate-pulse"><Target className="text-white" size={28} /></div>
                        <span className="text-red-500 font-black text-xs uppercase tracking-[0.4em]">IA: Recomendação Estratégica</span>
                     </div>
                     <div className="relative h-28 overflow-hidden">
                        {RECOMMENDATIONS.map((rec, idx) => (
                          <div key={rec.id} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === recommendationIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                             <h3 className="text-white text-2xl md:text-3xl font-black mb-3 tracking-tighter">{rec.title}</h3>
                             <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">{rec.description}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                  <button className="px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-[1.5rem] shadow-2xl shadow-red-900/60 transition-all active:scale-95 flex items-center justify-center gap-4 text-xs tracking-widest uppercase">
                    <ShieldAlert size={20} /> NOTIFICAR CENTRAIS
                  </button>
               </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                     <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                        <ZapOff size={24} className="text-red-500 animate-pulse" /> Ranking de Criticidade
                     </h3>
                  </div>
                  <div className="p-4">
                     {CRITICAL_ANALYSIS.map((item, idx) => (
                       <div key={item.id} onClick={() => setSelectedCriticalItem(item)} className="flex items-center justify-between p-5 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
                          <div className="flex items-center gap-6">
                             <span className="font-black text-slate-300 text-sm">{(idx + 1).toString().padStart(2, '0')}</span>
                             <span className="font-black text-slate-800 text-base group-hover:text-red-600 transition-colors">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-8">
                             <div className="text-right">
                                <p className="font-black text-slate-900 text-sm">{item.resolution}%</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Resolução</p>
                             </div>
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'critical' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                                {item.status === 'critical' ? 'Crítico' : 'Atenção'}
                             </span>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-10">
                  <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                     <Trophy size={24} className="text-red-600" /> Gargalos por Setor (Ranking)
                  </h3>
                  <div className="space-y-8 overflow-y-auto custom-scrollbar pr-2 max-h-[500px]">
                    {SECTOR_RANKING.map((sector, idx) => (
                      <div key={sector.id} className="relative p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-red-100 transition-all group overflow-hidden">
                        {/* Rank Background Number */}
                        <div className="absolute top-2 right-6 text-7xl font-black text-slate-200/40 group-hover:text-red-200/40 transition-colors pointer-events-none">
                          {(idx + 1).toString().padStart(2, '0')}
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-4">
                             <div className={`p-3 rounded-xl shadow-lg transition-transform group-hover:scale-110 ${sector.impact === 'Crítico' ? 'bg-red-600 text-white shadow-red-900/20' : 'bg-blue-600 text-white shadow-blue-900/20'}`}>
                                <BarChart3 size={20} />
                             </div>
                             <div>
                                <h4 className="font-black text-slate-900 text-xl leading-none">{sector.name}</h4>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${sector.impact === 'Crítico' ? 'text-red-600' : 'text-blue-600'}`}>Impacto {sector.impact}</span>
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6 mb-5">
                            <div>
                               <p className="text-2xl font-black text-slate-900 tracking-tighter">{sector.pending.toLocaleString('pt-BR')}</p>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Processos Pendentes</span>
                            </div>
                            <div className="text-right">
                               <p className="text-2xl font-black text-red-600 tracking-tighter">{sector.efficiency}%</p>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Eficiência Atual</span>
                            </div>
                          </div>

                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                             <div className={`h-full rounded-full transition-all duration-[2000ms] ${sector.impact === 'Crítico' ? 'bg-red-600' : 'bg-blue-600'}`} style={{ width: `${100 - sector.efficiency}%` }} />
                          </div>

                          <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                             <div className="bg-slate-200 w-6 h-6 rounded-full flex items-center justify-center text-slate-500">
                                <User size={12} />
                             </div>
                             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Secretário: {sector.secretary}</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
             {/* Esquerda: Satisfação por Estrelas */}
             <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-10">
                   <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600"><Star size={24} fill="currentColor" /></div>
                   <h3 className="font-black text-slate-900 text-xl tracking-tighter">Satisfação Detalhada</h3>
                </div>

                <div className="space-y-8 flex-1">
                   {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = stars === 5 ? 85 : stars === 4 ? 10 : 2;
                      return (
                        <div key={stars} className="space-y-2">
                           <div className="flex justify-between items-center">
                              <div className="flex gap-0.5">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className={i < stars ? 'text-yellow-400' : 'text-slate-200'} fill={i < stars ? 'currentColor' : 'none'} />
                                 ))}
                              </div>
                              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{percentage}%</span>
                           </div>
                           <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-1000 ${stars >= 4 ? 'bg-emerald-500' : stars === 3 ? 'bg-yellow-400' : 'bg-red-500'}`} style={{ width: `${percentage}%` }} />
                           </div>
                        </div>
                      );
                   })}
                </div>

                <div className="mt-10 p-6 bg-slate-900 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
                   <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 scale-0 group-hover:scale-150 transition-transform duration-1000" />
                   <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2 relative z-10">Score IA Sugerido</p>
                   <p className="text-white text-4xl font-black tracking-tighter relative z-10">9.2<span className="text-xl text-emerald-400">/10</span></p>
                </div>
             </section>

             {/* Meio: Feedback Recente */}
             <section className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10">
                   <div className="flex items-center justify-between mb-10">
                      <h3 className="font-black text-slate-900 text-2xl tracking-tighter flex items-center gap-3">
                         <MessageSquare className="text-blue-600" size={24} /> Feedbacks em Tempo Real
                      </h3>
                      <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Ver Todos</button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {EVALUATION_RECORDS.map((record) => (
                         <div key={record.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all group">
                            <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs uppercase tracking-tighter">
                                     {record.citizen.charAt(0)}
                                  </div>
                                  <div>
                                     <p className="font-black text-slate-900 text-sm leading-none mb-1">{record.citizen}</p>
                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{record.date}</p>
                                  </div>
                               </div>
                               <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                     <Star key={i} size={10} className={i < record.rating ? 'text-yellow-400' : 'text-slate-300'} fill={i < record.rating ? 'currentColor' : 'none'} />
                                  ))}
                               </div>
                            </div>
                            <p className="text-xs font-medium text-slate-600 leading-relaxed italic mb-4">"{record.comment}"</p>
                            <div className="flex items-center gap-2 pt-3 border-t border-slate-200/50">
                               <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest px-2 py-0.5 bg-blue-50 rounded-md">{record.service}</span>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10 flex flex-col md:flex-row items-center gap-8 group">
                   <div className="bg-emerald-100 p-6 rounded-[2rem] text-emerald-600 group-hover:scale-110 transition-transform">
                      <ThumbsUp size={40} />
                   </div>
                   <div className="flex-1 text-center md:text-left">
                      <h4 className="font-black text-slate-900 text-xl tracking-tighter mb-2">Serviço Destaque do Mês</h4>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-md">O serviço de <strong>Iluminação Pública</strong> atingiu a marca histórica de 98% de avaliações positivas no último período.</p>
                   </div>
                   <div className="w-full md:w-auto">
                      <button className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all text-xs uppercase tracking-widest">
                         Parabenizar Equipe
                      </button>
                   </div>
                </div>
             </section>
          </div>
        )}
      </main>

      {/* MODAL ANÁLISE CRÍTICA (Ranking de Criticidade) */}
      {selectedCriticalItem && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-fade-in-up">
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedCriticalItem(null)} />
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col">
              {/* Header Modal - Cor dinâmica conforme status */}
              <div className={`${selectedCriticalItem.status === 'critical' ? 'bg-red-600' : 'bg-amber-500'} p-10 text-white flex justify-between items-center relative`}>
                 <div className="flex items-center gap-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20 shadow-lg">
                       <AlertCircle size={32} className="animate-pulse" />
                    </div>
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1 block">ANÁLISE DE CRITICIDADE</span>
                       <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedCriticalItem.label}</h3>
                    </div>
                 </div>
                 <button onClick={() => setSelectedCriticalItem(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                 {/* Responsável e Setor */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} /> SECRETÁRIO RESPONSÁVEL</h4>
                       <div className="bg-slate-50 border border-slate-100 rounded-[1.5rem] p-6 flex items-center gap-5">
                          <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><User size={28} /></div>
                          <div>
                             <p className="font-black text-slate-900 text-lg leading-tight">{selectedCriticalItem.secretary}</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">TITULAR DA PASTA</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layers size={14} /> DEPARTAMENTO</h4>
                       <div className="bg-slate-50 border border-slate-100 rounded-[1.5rem] p-6">
                          <p className="text-sm font-black text-slate-800 mb-1">{selectedCriticalItem.department}</p>
                          <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[8px] font-black uppercase tracking-widest">Setor Crítico</span>
                       </div>
                    </div>
                 </div>

                 {/* Motivo do Gargalo */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> MOTIVO DO GARGALO (IA ANALYTICS)</h4>
                    <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] relative">
                       <p className="text-red-900 text-base font-medium leading-relaxed italic">"{selectedCriticalItem.bottleneckReason}"</p>
                    </div>
                 </div>

                 {/* Setores Envolvidos e SLA */}
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Users size={14} /> FLUXO OPERACIONAL E SLA POR SETOR</h4>
                    <div className="space-y-3">
                       {selectedCriticalItem.involvedSectors.map((sector, idx) => (
                          <div key={idx} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                             <div className="flex items-center gap-4">
                                <div className={`w-2.5 h-2.5 rounded-full ${sector.status === 'critical' ? 'bg-red-600 animate-pulse' : sector.status === 'delayed' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                                <span className="font-bold text-slate-700 text-sm">{sector.name}</span>
                             </div>
                             <div className="flex items-center gap-4">
                                <span className={`text-xs font-black ${sector.status === 'critical' ? 'text-red-600' : 'text-slate-500'}`}>{sector.sla} dias (SLA)</span>
                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${sector.status === 'critical' ? 'bg-red-50 text-red-600' : sector.status === 'delayed' ? 'bg-amber-50 text-amber-600' : sector.status === 'delayed' ? 'bg-amber-50 text-amber-600' : sector.status === 'emerald-50 text-emerald-600'}`}>
                                   {sector.status === 'critical' ? 'Crítico' : sector.status === 'delayed' ? 'Atrasado' : 'No Prazo'}
                                </span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <button onClick={() => setSelectedCriticalItem(null)} className="w-full py-6 bg-slate-900 hover:bg-black text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95">
                    FECHAR RELATÓRIO DE CRITICIDADE
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Modal Detalhes do Serviço (Aba Solicitações) */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" onClick={() => setSelectedServiceDetail(null)} />
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-fade-in-up">
              <div className="bg-[#1e3a8a] p-10 text-white flex justify-between items-center relative">
                 <div className="flex items-center gap-6">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <Activity size={32} />
                    </div>
                    <div>
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1 block">DETALHES DO SERVIÇO</span>
                       <h3 className="text-4xl font-black tracking-tighter leading-none">{selectedServiceDetail.label}</h3>
                    </div>
                 </div>
                 <button onClick={() => setSelectedServiceDetail(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors"><X size={24} /></button>
              </div>

              <div className="p-10 space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} /> RESPONSÁVEL DIRETO</h4>
                       <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex items-center gap-5">
                          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                             <User size={28} />
                          </div>
                          <div>
                             <p className="font-black text-slate-900 text-lg leading-tight">{selectedServiceDetail.responsible || 'Sem Gestor'}</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{selectedServiceDetail.responsibleRole || 'CARGO'}</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layers size={14} /> SETORES PARTICIPANTES</h4>
                       <div className="flex flex-wrap gap-3">
                          {selectedServiceDetail.sectors.map((s, idx) => (
                             <div key={idx} className="bg-white border border-slate-100 shadow-sm rounded-xl px-5 py-2.5 flex items-center gap-2.5">
                                <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                                <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{s.sigla}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={14} /> RESUMO DE SOLICITAÇÕES</h4>
                       <span className="text-sm font-black text-slate-900 tracking-tight">Total: {selectedServiceDetail.totalSolicitations.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="bg-blue-50 border border-blue-100 p-6 rounded-[1.5rem] text-center">
                          <p className="text-2xl font-black text-blue-700 leading-none mb-1">{selectedServiceDetail.statusCounts?.started.toLocaleString('pt-BR') || '0'}</p>
                          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">INICIADAS</span>
                       </div>
                       <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[1.5rem] text-center">
                          <p className="text-2xl font-black text-indigo-700 leading-none mb-1">{selectedServiceDetail.statusCounts?.answered.toLocaleString('pt-BR') || '0'}</p>
                          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">RESPONDIDAS</span>
                       </div>
                       <div className="bg-orange-50 border border-orange-100 p-6 rounded-[1.5rem] text-center">
                          <p className="text-2xl font-black text-orange-700 leading-none mb-1">{selectedServiceDetail.statusCounts?.pending.toLocaleString('pt-BR') || '0'}</p>
                          <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">PENDENTES</span>
                       </div>
                       <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[1.5rem] text-center">
                          <p className="text-2xl font-black text-emerald-700 leading-none mb-1">{selectedServiceDetail.statusCounts?.completed.toLocaleString('pt-BR') || '0'}</p>
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">CONCLUÍDAS</span>
                       </div>
                    </div>
                 </div>

                 <button onClick={() => setSelectedServiceDetail(null)} className="w-full py-6 bg-[#2563eb] hover:bg-blue-700 text-white font-black rounded-3xl text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-blue-200 transition-all active:scale-98">
                    CONCLUIR ANÁLISE
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: number | string; subtitle?: string; icon: React.ReactNode; color: 'blue' | 'orange' | 'emerald' | 'red'; formatter?: (v: any) => string; delay?: string }> = ({ label, value, subtitle, icon, color, formatter, delay = "0s" }) => {
  const iconColors = {
    blue: 'text-blue-600 bg-blue-50',
    orange: 'text-orange-600 bg-orange-50',
    emerald: 'text-emerald-600 bg-emerald-50',
    red: 'text-red-600 bg-red-50'
  };
  
  // Se houver subtitle, usamos o layout da aba de eficiência
  if (subtitle) {
    return (
      <div 
        style={{ animationDelay: delay }}
        className={`bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 transition-all duration-500 animate-fade-in-up flex flex-col justify-between h-56 relative overflow-hidden group`}
      >
        <div className="flex justify-between items-start gap-4">
          <div className={`p-5 rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-3 ${iconColors[color]}`}>
            {React.cloneElement(icon as React.ReactElement, { size: 28 })}
          </div>
          <div className="text-right flex flex-col items-end min-w-0">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
            <p className={`text-5xl font-black tracking-tighter leading-none ${color === 'red' ? 'text-red-600' : 'text-slate-900'}`}>
              {typeof value === 'number' ? <AnimatedCounter target={value} formatter={formatter} /> : value}
            </p>
          </div>
        </div>
        <div className="mt-auto">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-400 transition-colors">{subtitle}</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{ animationDelay: delay }}
      className={`bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 group transition-all duration-500 animate-fade-in-up relative z-10 flex flex-col justify-between h-56`}
    >
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{label}</span>
        <div className={`p-5 rounded-2xl transition-transform group-hover:scale-110 ${iconColors[color as any]}`}>{icon}</div>
      </div>
      <div>
        <p className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
           {typeof value === 'number' ? <AnimatedCounter target={value} formatter={formatter} /> : value}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
