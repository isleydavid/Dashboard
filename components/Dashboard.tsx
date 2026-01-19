
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  FileText,
  TrendingUp,
  LayoutGrid,
  Zap,
  Star,
  ArrowUpRight,
  User,
  Activity,
  Maximize2,
  Minimize2,
  Timer,
  AlertTriangle,
  XCircle,
  Map,
  ZapOff,
  ChevronRight,
  Menu,
  X,
  Search,
  Settings,
  ArrowDownRight,
  BarChart3,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  TrendingDown,
  Info,
  History,
  Users,
  ShieldAlert,
  Target,
  MessageCircle,
  Briefcase,
  Layers,
  ChevronUp
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { ServiceMetric, NotificationItem } from '../types';

interface Highlight {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const NEIGHBORHOODS = [
  { id: 'mangabeira', name: 'Mangabeira', path: 'M 450 150 L 520 180 L 550 280 L 500 350 L 420 320 L 400 220 Z', solicitations: 50420, appointments: 31200, registrations: 20150, docs: 20000 },
  { id: 'valentina', name: 'Valentina', path: 'M 400 320 L 500 350 L 480 450 L 380 420 L 350 350 Z', solicitations: 25100, appointments: 15400, registrations: 10200, docs: 5000 },
  { id: 'geisel', name: 'Geisel', path: 'M 300 280 L 400 320 L 350 350 L 280 340 L 250 300 Z', solicitations: 12450, appointments: 8120, registrations: 4300, docs: 2000 },
  { id: 'centro', name: 'Centro', path: 'M 200 150 L 280 140 L 300 220 L 250 250 L 180 200 Z', solicitations: 8900, appointments: 5200, registrations: 3100, docs: 1000 },
  { id: 'torre', name: 'Torre', path: 'M 280 140 L 350 120 L 400 180 L 300 220 Z', solicitations: 18230, appointments: 12100, registrations: 6450, docs: 4000 },
  { id: 'bessa', name: 'Bessa', path: 'M 350 50 L 420 60 L 450 150 L 350 120 Z', solicitations: 35600, appointments: 22400, registrations: 13120, docs: 8000 },
  { id: 'manaira', name: 'Manaíra', path: 'M 420 60 L 480 80 L 520 180 L 450 150 Z', solicitations: 42150, appointments: 28300, registrations: 14050, docs: 10000 },
  { id: 'cabo-branco', name: 'Cabo Branco', path: 'M 480 80 L 550 100 L 580 200 L 520 180 Z', solicitations: 15600, appointments: 10120, registrations: 5300, docs: 2000 },
];

const METRICS_DATA: ServiceMetric[] = [
  { 
    label: 'Limpeza Urbana', 
    days: 1.2, 
    totalPercentage: 75, 
    totalSolicitations: 12540,
    responsible: 'Carlos Silva (EMLUR)',
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
    responsible: 'Ana Porto (SEURB)',
    statusCounts: { started: 920, answered: 6500, pending: 1100, completed: 400 },
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
    responsible: 'Marcos Santos (EMLUR)',
    statusCounts: { started: 810, answered: 2400, pending: 1800, completed: 400 },
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
    responsible: 'João Mendes (SEURB)',
    statusCounts: { started: 450, answered: 1200, pending: 1315, completed: 250 },
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
    responsible: 'Fernanda Lima (SEMOB)',
    statusCounts: { started: 1200, answered: 6800, pending: 1550, completed: 550 },
    sectors: [
      { sigla: 'SEMOB', percentage: 55, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 25, color: 'bg-indigo-500' },
      { sigla: 'SF', percentage: 20, color: 'bg-indigo-300' }
    ]
  },
  { 
    label: 'Sinalização', 
    days: 2.1, 
    totalPercentage: 40, 
    totalSolicitations: 4800,
    responsible: 'Ricardo Lima (SEMOB)',
    statusCounts: { started: 600, answered: 2900, pending: 950, completed: 350 },
    sectors: [
      { sigla: 'SEMOB', percentage: 80, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 20, color: 'bg-indigo-500' }
    ]
  },
  { 
    label: 'Saúde Animal', 
    days: 1.5, 
    totalPercentage: 25, 
    totalSolicitations: 2150,
    responsible: 'Dra. Luana Melo (SESAU)',
    statusCounts: { started: 320, answered: 1400, pending: 310, completed: 120 },
    sectors: [
      { sigla: 'SESAU', percentage: 100, color: 'bg-blue-600' }
    ]
  },
  { 
    label: 'Coleta de Resíduos', 
    days: 0.5, 
    totalPercentage: 90, 
    totalSolicitations: 15400,
    responsible: 'Carlos Silva (EMLUR)',
    statusCounts: { started: 2100, answered: 11500, pending: 1100, completed: 700 },
    sectors: [
      { sigla: 'EM', percentage: 90, color: 'bg-blue-600' },
      { sigla: 'SF', percentage: 10, color: 'bg-indigo-500' }
    ]
  },
];

const CRITICAL_ANALYSIS = [
  { id: '1', label: 'Drenagem Pluvial', resolution: 28, sla: 8.5, pendencyGrowth: 15, bottleneck: 'SEURB', status: 'critical', volume: 'médio', solicitations: 3215, sectorsInvolved: ['SEURB', 'SF', 'DEFESA CIVIL'], bottleneckReason: 'Equipes reduzidas em período chuvoso.' },
  { id: '2', label: 'Poda de Árvores', resolution: 35, sla: 6.1, pendencyGrowth: 22, bottleneck: 'EMLUR', status: 'critical', volume: 'médio', solicitations: 5410, sectorsInvolved: ['EMLUR', 'SEURB', 'SEMAM'], bottleneckReason: 'Aumento súbito de solicitações pós-tempestade.' },
  { id: '3', label: 'Manutenção Viária', resolution: 42, sla: 5.2, pendencyGrowth: -5, bottleneck: 'SEMOB', status: 'attention', volume: 'alto', solicitations: 10100, sectorsInvolved: ['SEMOB', 'SEURB', 'SF'], bottleneckReason: 'Logística de asfalto comprometida por fornecedor.' },
  { id: '4', label: 'Sinalização', resolution: 58, sla: 4.8, pendencyGrowth: 2, bottleneck: 'SEMOB', status: 'attention', volume: 'baixo', solicitations: 4800, sectorsInvolved: ['SEMOB', 'SEURB'], bottleneckReason: 'Aguardando entrega de insumos de sinalização horizontal.' },
  { id: '5', label: 'Saúde Animal', resolution: 65, sla: 3.5, pendencyGrowth: 8, bottleneck: 'SESAU', status: 'ok', volume: 'baixo', solicitations: 2150, sectorsInvolved: ['SESAU'], bottleneckReason: 'Capacidade operacional normal.' },
  { id: '6', label: 'Limpeza Urbana', resolution: 88, sla: 1.8, pendencyGrowth: -12, bottleneck: 'EMLUR', status: 'ok', volume: 'alto', solicitations: 12540, sectorsInvolved: ['EMLUR', 'SEURB', 'SF'], bottleneckReason: 'Eficiência acima da média.' },
];

const SECTOR_BOTTLENECKS = [
  { id: 's1', name: 'SEURB', impact: 'Crítico', pending: 850, capacity: '65%', status: 'red', services: ['Drenagem Pluvial', 'Iluminação', 'Vias Públicas'], leader: 'João Mendes' },
  { id: 's2', name: 'EMLUR', impact: 'Atenção', pending: 1100, capacity: '88%', status: 'amber', services: ['Limpeza Urbana', 'Coleta de Lixo', 'Poda'], leader: 'Carlos Silva' },
  { id: 's3', name: 'SEMOB', impact: 'Moderado', pending: 420, capacity: '75%', status: 'blue', services: ['Sinalização', 'Trânsito', 'Semáforos'], leader: 'Fernanda Lima' },
  { id: 's4', name: 'SESAU', impact: 'Estável', pending: 95, capacity: '92%', status: 'emerald', services: ['Saúde Animal', 'Zoonoses'], leader: 'Dra. Luana Melo' },
];

const RECOMMENDATIONS = [
  { id: 'r1', title: 'Remanejar pessoal para SEURB', description: 'O tempo de resposta em Drenagem Pluvial subiu 15%. Sugerimos mover 5 técnicos do setor EM temporariamente.', category: 'RECURSOS' },
  { id: 'r2', title: 'Priorizar Poda em Mangabeira', description: 'Mangabeira concentra 40% das podas atrasadas. Enviar equipe extra para força-tarefa.', category: 'LOGÍSTICA' },
  { id: 'r3', title: 'Revisar SLA de Sinalização', description: 'Volume anormalmente baixo de solicitações pode indicar falha no app de reporte nesta área.', category: 'SISTEMA' },
];

const NOTIFICATION_HISTORY: NotificationItem[] = [
  { id: 'n1', time: '08:45', title: 'Equipe enviada para reparo de cratera', department: 'SEMOB', status: 'processing' },
  { id: 'n2', time: '09:12', title: 'Manutenção de iluminação concluída', department: 'SEURB', status: 'done' },
  { id: 'n3', time: '10:05', title: 'Alerta de alagamento em área crítica', department: 'DEFESA CIVIL', status: 'new' },
  { id: 'n4', time: '10:30', title: 'Coleta extraordinária de lixo', department: 'EM', status: 'done' },
  { id: 'n5', time: '11:15', title: 'Poda de árvore em andamento', department: 'EM', status: 'processing' },
];

const Dashboard: React.FC = () => {
  const [total, setTotal] = useState(1025880);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('solicitacoes');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceMetric | null>(null);
  
  // Novos estados de modal para aba de eficiência
  const [selectedCriticalItem, setSelectedCriticalItem] = useState<any | null>(null);
  const [selectedBottleneckItem, setSelectedBottleneckItem] = useState<any | null>(null);

  // Estados do Mapa
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<typeof NEIGHBORHOODS[0] | null>(null);
  const [mapMode, setMapMode] = useState<'solicitacoes' | 'calor'>('solicitacoes');
  
  const highlights: Highlight[] = [
    { icon: <ArrowUpRight size={16} />, label: 'TENDÊNCIA', value: '+12% em Poda de Árvore' },
    { icon: <Zap size={16} />, label: 'MAIS SOLICITADO', value: 'Limpeza Urbana' },
    { icon: <Bell size={16} />, label: 'ALERTA EM TEMPO REAL', value: 'Poste reparado em Torre' },
    { icon: <Star size={16} />, label: 'MELHOR AVALIADO', value: 'Iluminação Pública (4.9)' },
  ];

  const navItems = [
    { id: 'solicitacoes', label: 'Solicitações', icon: <FileText size={18} /> },
    { id: 'eficiencia', label: 'Baixa Eficiência', icon: <ZapOff size={18} /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
      setRecommendationIndex((prev) => (prev + 1) % RECOMMENDATIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullScreen(true));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullScreen(false));
      }
    }
  };

  const getMapColor = (count: number) => {
    if (mapMode === 'calor') {
      if (count >= 1000) return '#1e3a8a';
      if (count >= 500) return '#2563eb';
      if (count >= 100) return '#60a5fa';
      if (count >= 1) return '#bfdbfe';
      return '#f1f5f9';
    }
    if (count >= 40000) return '#1e3a8a';
    if (count >= 25000) return '#3b82f6';
    if (count >= 10000) return '#93c5fd';
    if (count >= 1) return '#dbeafe';
    return '#f1f5f9';
  };

  return (
    <div className={`transition-all duration-500 flex flex-col bg-[#f8fafc] ${isFullScreen ? 'h-screen overflow-hidden' : 'min-h-screen pb-24 md:pb-28'}`}>
      
      {/* HEADER PRINCIPAL */}
      <header className={`${activeTab === 'eficiencia' ? 'bg-slate-900 border-b border-white/5' : 'blue-gradient-bg'} text-white relative overflow-hidden transition-all duration-700 rounded-b-[2rem] md:rounded-b-[4rem] flex-none
        ${isFullScreen ? 'rounded-none px-10 pt-8 pb-12' : (activeTab === 'eficiencia' ? 'px-6 md:px-12 2xl:px-24 pt-8 md:pt-10 pb-8' : 'px-6 md:px-12 2xl:px-24 pt-8 md:pt-10 pb-32 md:pb-48 2xl:pb-56')}`}>
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] 2xl:w-[1200px] 2xl:h-[1200px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* TOP NAVIGATION BAR */}
        <nav className={`flex items-center justify-between relative z-10 max-w-[2000px] mx-auto w-full transition-all ${(activeTab === 'eficiencia') ? 'mb-0' : 'mb-12'}`}>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className={`${activeTab === 'eficiencia' ? 'bg-red-600/20 border-red-500/30' : 'bg-white/15 border-white/20'} rounded-xl backdrop-blur-md border p-2 transition-colors`}>
                <LayoutGrid size={isFullScreen ? 28 : 22} className={activeTab === 'eficiencia' ? 'text-red-400' : 'text-white'} />
              </div>
              <div className="block">
                <h1 className="font-black text-xl tracking-tighter leading-none">Cidade<span className={`font-light ${activeTab === 'eficiencia' ? 'text-red-400' : 'text-blue-300'}`}>Conectada</span></h1>
              </div>
            </div>

            <div className={`hidden lg:flex items-center ${activeTab === 'eficiencia' ? 'bg-white/5' : 'bg-black/10'} backdrop-blur-md rounded-2xl p-1 border border-white/5`}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-bold tracking-tight
                    ${activeTab === item.id 
                      ? 'bg-white text-slate-900 shadow-xl' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  <span className={activeTab === item.id ? (activeTab === 'eficiencia' ? 'text-red-600' : 'text-blue-600') : ''}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleFullScreen}
              className={`bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all flex items-center gap-3 p-2.5 px-4`}
            >
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              <span className="hidden sm:inline font-bold text-[10px] uppercase tracking-widest">{isFullScreen ? 'REDUZIR' : 'EXPANDIR'}</span>
            </button>
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
              <div className={`rounded-xl ${activeTab === 'eficiencia' ? 'bg-red-600' : 'bg-blue-600'} flex items-center justify-center border border-white/10 w-9 h-9 shadow-inner transition-colors`}>
                <User size={18} />
              </div>
            </div>
          </div>
        </nav>

        {activeTab === 'solicitacoes' && (
          <div className="max-w-[2000px] mx-auto relative z-10 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex-1">
                <p className="text-blue-300 uppercase tracking-[0.4em] font-black flex items-center gap-2 mb-3 text-[10px]">
                  <Activity className="size-4 animate-pulse" /> MONITORAMENTO LIVE
                </p>
                <h2 className="font-black tracking-tighter leading-[0.8] transition-all drop-shadow-2xl mb-8 text-6xl md:text-[10rem] 2xl:text-[14rem]">
                  <AnimatedCounter target={total} />
                </h2>
                
                <div 
                  onClick={() => setIsHistoryModalOpen(true)}
                  className={`group cursor-pointer w-full max-w-lg relative h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all hover:bg-white/15 hover:scale-[1.01] active:scale-[0.99]`}
                >
                  {highlights.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`absolute inset-0 flex items-center gap-4 px-5 transition-all duration-1000 ease-in-out
                        ${idx === highlightIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                    >
                      <div className="bg-blue-600/40 p-2 rounded-lg border border-white/10 group-hover:bg-blue-600/60 transition-colors">
                        {React.isValidElement(item.icon) && React.cloneElement(item.icon as React.ReactElement<any>, { className: 'text-white', size: 16 })}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-200/80">{item.label}</span>
                        <span className="text-base font-bold text-white truncate block">{item.value}</span>
                      </div>
                      <div className="text-white/30 group-hover:text-white/60 transition-colors">
                         <ChevronRight size={18} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl w-full lg:w-96 2xl:w-[500px] p-8 transition-all">
                 <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-blue-300 size-6 md:size-8" />
                    <h4 className="font-black text-xl md:text-2xl text-white">Eficiência Geral</h4>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white/5 rounded-2xl border border-white/5 p-4 md:p-6">
                       <span className="font-black uppercase tracking-widest text-[10px] md:text-xs text-blue-300">Satisfação Média</span>
                       <div className="flex items-center gap-2">
                          <span className="font-black text-2xl md:text-3xl text-white">4.8</span>
                          <Star className="text-yellow-400 fill-current size-4 md:size-5" />
                       </div>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 rounded-2xl border border-white/5 p-4 md:p-6">
                       <span className="font-black uppercase tracking-widest text-[10px] md:text-xs text-blue-300">Resolução (24h)</span>
                       <span className="font-black text-2xl md:text-3xl text-emerald-400">92%</span>
                    </div>
                 </div>
              </div>
          </div>
        )}
      </header>

      {/* BARRA DE NAVEGAÇÃO MOBILE */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-3rem)] max-w-lg">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] p-2 flex items-center justify-between">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 flex-1 py-2.5 rounded-2xl transition-all duration-300
                ${activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTEÚDO DINÂMICO - SOLICITAÇÕES */}
      {activeTab === 'solicitacoes' && (
        <>
          <div className={`max-w-[2000px] mx-auto w-full px-6 md:px-12 2xl:px-24 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all ${isFullScreen ? '-mt-20 md:-mt-24 2xl:-mt-32 mb-10' : '-mt-16 md:-mt-24 2xl:-mt-28'}`}>
            <MetricCard label="NOVAS SOLICITAÇÕES" value={total} icon={<FileText />} color="blue" isFS={isFullScreen} />
            <MetricCard label="EM ATENDIMENTO" value={Math.floor(total * 0.05)} icon={<Clock />} color="orange" isFS={isFullScreen} />
            <MetricCard label="CONCLUÍDAS" value={2450} icon={<CheckCircle />} color="emerald" isFS={isFullScreen} />
          </div>
          <main className={`max-w-[2000px] mx-auto w-full px-6 md:px-12 2xl:px-24 flex flex-col lg:flex-row gap-8 transition-all ${isFullScreen ? 'mt-4 pb-12' : 'mt-8 md:mt-12'}`}>
            <section className={`lg:w-2/3 bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100 transition-all ${isFullScreen ? 'p-10 md:p-14' : 'p-10 md:p-12'}`}>
              <h3 className="font-black text-gray-900 tracking-tighter text-xl md:text-2xl 2xl:text-4xl mb-10">Serviços e Participação</h3>
              <div className={`space-y-6 ${isFullScreen ? 'max-h-[60vh] overflow-y-auto custom-scrollbar pr-4' : ''}`}>
                {METRICS_DATA.map((metric, idx) => (
                  <div 
                    key={metric.label} 
                    onClick={() => setSelectedServiceDetail(metric)}
                    className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border-b border-gray-50 pb-6 last:border-0 last:pb-0 cursor-pointer hover:bg-slate-50 transition-all p-3 -m-3 rounded-2xl group"
                  >
                    <div className="font-bold text-gray-300 shrink-0 w-8 text-sm">{(idx + 1).toString().padStart(2, '0')}</div>
                    <div className="shrink-0 md:w-48 xl:w-64">
                      <h4 className="font-black text-gray-800 text-base md:text-lg group-hover:text-blue-600 transition-colors">{metric.label}</h4>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-50 rounded-xl overflow-hidden flex shadow-inner h-8 md:h-12 relative">
                        {metric.sectors.map((sector, sIdx) => (
                          <div key={sIdx} className={`${sector.color} h-full transition-all duration-1000 flex items-center justify-center`} style={{ width: `${sector.percentage}%` }}>
                            <span className="font-black text-white/95 text-[8px] md:text-[10px] px-1 uppercase tracking-tighter whitespace-nowrap">
                              {sector.sigla} {sector.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0 md:w-32 flex items-center justify-end gap-3">
                      <p className="font-black text-gray-400 uppercase tracking-widest text-[9px]"><span className="text-gray-900 block font-black text-base">{metric.totalSolicitations.toLocaleString('pt-BR')}</span>solicit.</p>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className={`lg:w-1/3 bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100 transition-all ${isFullScreen ? 'p-10 md:p-14' : 'p-10 md:p-12'}`}>
              <div className="flex items-center gap-4 mb-10">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Timer size={28} /></div>
                <div><h3 className="font-black text-gray-900 text-xl md:text-2xl">Tempo de Resposta</h3><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SLA POR SERVIÇO</p></div>
              </div>
              <div className={`space-y-4 ${isFullScreen ? 'max-h-[60vh] overflow-y-auto custom-scrollbar pr-2' : ''}`}>
                {METRICS_DATA.map((metric, idx) => {
                  const isCritical = metric.days > 3;
                  return (
                    <div key={`sla-${idx}`} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-[1.5rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                      <div className="flex flex-col min-w-0 pr-4">
                        <span className="text-sm font-black text-gray-800 truncate mb-1">{metric.label}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-black text-2xl ${isCritical ? 'text-red-600' : 'text-emerald-500'}`}>{metric.days}</span>
                          <span className="text-[9px] font-bold text-gray-400 tracking-widest mt-1">DIAS MÉDIO</span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isCritical ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-500'} border border-current/10 shrink-0 shadow-sm`}><span className="text-[10px] font-black tracking-widest uppercase">{isCritical ? 'CRÍTICO' : 'OK'}</span></div>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </>
      )}

      {/* MODAL DE DETALHES DO SERVIÇO */}
      {selectedServiceDetail && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedServiceDetail(null)} />
           <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
              <div className="p-8 text-white blue-gradient-bg">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                       <div className="bg-white/10 p-3 rounded-2xl"><Activity size={28} /></div>
                       <div>
                          <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.2em] block mb-1">DETALHES DO SERVIÇO</span>
                          <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedServiceDetail.label}</h3>
                       </div>
                    </div>
                    <button onClick={() => setSelectedServiceDetail(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
                 </div>
              </div>
              
              <div className="p-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest text-[9px] font-black">
                          <Briefcase size={12} /> Responsável Direto
                       </div>
                       <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                             <User size={20} />
                          </div>
                          <div>
                             <p className="font-black text-slate-900">{selectedServiceDetail.responsible || 'Coordenador Operacional'}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Gestor do Serviço</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest text-[9px] font-black">
                          <Layers size={12} /> Setores Participantes
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {selectedServiceDetail.sectors.map((s, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-lg shadow-sm">
                               <div className={`w-2 h-2 rounded-full ${s.color}`} />
                               <span className="font-black text-slate-700 text-[10px]">{s.sigla}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-5">
                    <div className="flex items-center justify-between">
                       <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                          <FileText size={12} /> Resumo de Solicitações
                       </h4>
                       <span className="text-slate-800 font-black text-sm">Total: {selectedServiceDetail.totalSolicitations.toLocaleString('pt-BR')}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                       <StatusBox label="Iniciadas" value={selectedServiceDetail.statusCounts?.started || 0} color="text-blue-600" bg="bg-blue-50" />
                       <StatusBox label="Respondidas" value={selectedServiceDetail.statusCounts?.answered || 0} color="text-indigo-600" bg="bg-indigo-50" />
                       <StatusBox label="Pendentes" value={selectedServiceDetail.statusCounts?.pending || 0} color="text-orange-600" bg="bg-orange-50" />
                       <StatusBox label="Concluídas" value={selectedServiceDetail.statusCounts?.completed || 0} color="text-emerald-600" bg="bg-emerald-50" />
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button onClick={() => setSelectedServiceDetail(null)} className="flex-1 py-3 bg-blue-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-blue-200 active:scale-95 transition-all">CONCLUIR ANÁLISE</button>
              </div>
           </div>
        </div>
      )}

      {/* PÁGINA BAIXA EFICIÊNCIA */}
      {activeTab === 'eficiencia' && (
        <main className="max-w-[2000px] mx-auto w-full px-6 md:px-12 2xl:px-24 mt-8 flex-1 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <EfficiencyCard label="GARGALOS CRÍTICOS" value={4} icon={<AlertCircle />} color="red" sub="SERVIÇOS TRAVADOS" />
             <EfficiencyCard label="SLA OVERFLOW" value={850} icon={<Clock />} color="orange" sub="DEMANDAS ATRASADAS" />
             <EfficiencyCard label="SOBRECARGA SETOR" value={0} formatter={() => "SEURB"} icon={<BarChart3 />} color="rose" sub="DEPARTAMENTO CRÍTICO" />
             <EfficiencyCard label="QUEDA EFICIÊNCIA" value={18} formatter={(v) => `-${v}%`} icon={<TrendingDown />} color="amber" sub="COMPARADO AO MÊS ANTERIOR" />
          </div>

          <section className="bg-slate-900 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden p-10 md:p-12">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
             <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                <div className="flex-1 max-w-2xl">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="bg-red-600 p-2.5 rounded-xl shadow-lg shadow-red-900/40">
                         <Target className="text-white" size={24} />
                      </div>
                      <span className="text-red-400 font-black text-xs uppercase tracking-[0.3em]">IA: Recomendação Estratégica</span>
                   </div>
                   <div className="relative h-40 md:h-28 overflow-hidden">
                      {RECOMMENDATIONS.map((rec, idx) => (
                        <div 
                          key={rec.id}
                          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === recommendationIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
                        >
                           <h3 className="text-white text-2xl md:text-3xl font-black tracking-tighter mb-4">{rec.title}</h3>
                           <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">{rec.description}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                   <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-xl shadow-red-900/40 transition-all active:scale-95 flex items-center justify-center gap-3 text-xs tracking-widest uppercase">
                      <ShieldAlert size={18} /> ENVIAR ALERTA
                   </button>
                   <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 text-xs tracking-widest uppercase">
                      <History size={18} /> HISTÓRICO
                   </button>
                </div>
             </div>
          </section>

          {/* NOVAS SEÇÕES RESTAURADAS: RANKING E GARGALOS */}
          <div className="flex flex-col lg:flex-row gap-8">
             {/* RANKING DE CRITICIDADE */}
             <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-10 border-b border-slate-50">
                   <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                      <ZapOff size={24} className="text-red-500" /> Ranking de Criticidade: Serviços
                   </h3>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50/50">
                         <tr>
                            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest"># Rank</th>
                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Serviço</th>
                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolução</th>
                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">SLA</th>
                            <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {CRITICAL_ANALYSIS.map((item, idx) => (
                           <tr 
                              key={item.id} 
                              onClick={() => setSelectedCriticalItem(item)}
                              className="hover:bg-slate-50/80 transition-all cursor-pointer group"
                            >
                              <td className="px-10 py-6 font-black text-slate-400 group-hover:text-red-600 transition-colors">{(idx + 1).toString().padStart(2, '0')}</td>
                              <td className="px-6 py-6 font-black text-slate-800 group-hover:text-blue-600 transition-colors">{item.label}</td>
                              <td className="px-6 py-6 font-black text-slate-600">{item.resolution}%</td>
                              <td className="px-6 py-6 font-black text-slate-600">{item.sla}d</td>
                              <td className="px-10 py-6 flex items-center gap-3">
                                 <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${item.status === 'critical' ? 'bg-red-50 text-red-600 border-red-100' : item.status === 'attention' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                    {item.status === 'critical' ? 'Crítico' : item.status === 'attention' ? 'Atenção' : 'OK'}
                                 </span>
                                 <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* GARGALOS POR SETOR */}
             <div className="lg:w-[400px] flex flex-col gap-6">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-10">
                   <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                      <BarChart3 size={20} className="text-blue-500" /> Gargalos por Setor
                   </h3>
                   <div className="space-y-6">
                      {SECTOR_BOTTLENECKS.map((sector) => (
                        <div 
                          key={sector.id} 
                          onClick={() => setSelectedBottleneckItem(sector)}
                          className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all border-l-4 cursor-pointer group" 
                          style={{ borderLeftColor: sector.status === 'red' ? '#ef4444' : sector.status === 'amber' ? '#f59e0b' : sector.status === 'blue' ? '#3b82f6' : '#10b981' }}
                        >
                           <div className="flex justify-between items-start mb-4">
                              <div>
                                 <h4 className="font-black text-slate-900 text-lg leading-none mb-1 group-hover:text-blue-600 transition-colors">{sector.name}</h4>
                                 <span className={`text-[9px] font-black uppercase tracking-widest ${sector.status === 'red' ? 'text-red-600' : sector.status === 'amber' ? 'text-amber-600' : 'text-blue-600'}`}>{sector.impact}</span>
                              </div>
                              <div className="text-right">
                                 <p className="text-xl font-black text-slate-900 leading-none mb-1">{sector.pending}</p>
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pendentes</span>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                 <span>Capacidade Ocupada</span>
                                 <span>{sector.capacity}</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full transition-all duration-1000 ${sector.status === 'red' ? 'bg-red-500' : sector.status === 'amber' ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: sector.capacity }} />
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </main>
      )}

      {/* MODAL DETALHE SERVIÇO CRÍTICO (ABA EFICIÊNCIA) */}
      {selectedCriticalItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedCriticalItem(null)} />
           <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
              <div className={`p-8 text-white ${selectedCriticalItem.status === 'critical' ? 'bg-red-600' : 'bg-slate-800'}`}>
                 <div className="flex justify-between items-center">
                    <div>
                       <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.2em] block mb-1">ANÁLISE DE CRITICIDADE</span>
                       <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedCriticalItem.label}</h3>
                    </div>
                    <button onClick={() => setSelectedCriticalItem(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><X size={20} /></button>
                 </div>
              </div>
              <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">SLA ATUAL</p>
                       <p className="text-3xl font-black text-red-600">{selectedCriticalItem.sla} dias</p>
                    </div>
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">VARIAÇÃO MENSAL</p>
                       <p className={`text-3xl font-black ${selectedCriticalItem.pendencyGrowth > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {selectedCriticalItem.pendencyGrowth > 0 ? '+' : ''}{selectedCriticalItem.pendencyGrowth}%
                       </p>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <AlertTriangle size={14} className="text-red-500" /> Causa do Gargalo
                    </h4>
                    <p className="p-5 bg-red-50/50 border border-red-100 rounded-2xl text-slate-700 font-medium leading-relaxed italic">
                       "{selectedCriticalItem.bottleneckReason || 'Análise técnica em andamento para identificação de causa raiz.'}"
                    </p>
                 </div>

                 <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Layers size={14} className="text-blue-500" /> Setores Afetados
                    </h4>
                    <div className="flex flex-wrap gap-2">
                       {selectedCriticalItem.sectorsInvolved.map((s: string, idx: number) => (
                          <span key={idx} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl font-black text-[10px] text-slate-600 uppercase tracking-widest">{s}</span>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button onClick={() => setSelectedCriticalItem(null)} className="flex-1 py-4 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-widest active:scale-95 transition-all">FECHAR ANÁLISE</button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL DETALHE GARGALO SETOR (ABA EFICIÊNCIA) */}
      {selectedBottleneckItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedBottleneckItem(null)} />
           <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
              <div className={`p-8 text-white ${selectedBottleneckItem.status === 'red' ? 'bg-red-600' : 'bg-blue-600'}`}>
                 <div className="flex justify-between items-center">
                    <div>
                       <span className="text-white/60 font-black text-[10px] uppercase tracking-[0.2em] block mb-1">MÉTRICAS DO DEPARTAMENTO</span>
                       <h3 className="text-3xl font-black tracking-tighter leading-none">{selectedBottleneckItem.name}</h3>
                    </div>
                    <button onClick={() => setSelectedBottleneckItem(null)} className="p-2 bg-white/10 rounded-full"><X size={20} /></button>
                 </div>
              </div>
              <div className="p-8 space-y-8">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Líder Setorial</p>
                       <p className="text-xl font-black text-slate-800">{selectedBottleneckItem.leader}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600"><User size={24} /></div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Serviços Sob Gestão</h4>
                    <div className="grid grid-cols-2 gap-3">
                       {selectedBottleneckItem.services.map((serv: string, idx: number) => (
                          <div key={idx} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-blue-500" />
                             <span className="font-bold text-slate-700 text-xs">{serv}</span>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="text-center">
                       <p className="text-4xl font-black text-slate-900 leading-none mb-2">{selectedBottleneckItem.pending}</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PEDIDOS AGUARDANDO</p>
                    </div>
                    <div className="text-center">
                       <p className="text-4xl font-black text-blue-600 leading-none mb-2">{selectedBottleneckItem.capacity}</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UTILIZAÇÃO DA FROTA</p>
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button className="flex-1 py-4 bg-red-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-3">
                    <ShieldAlert size={16} /> NOTIFICAR GESTÃO
                 </button>
                 <button onClick={() => setSelectedBottleneckItem(null)} className="flex-1 py-4 bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-widest">VOLTAR</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

const StatusBox: React.FC<{ label: string; value: number; color: string; bg: string }> = ({ label, value, color, bg }) => (
  <div className={`p-4 rounded-2xl ${bg} border border-white/50 text-center flex flex-col justify-center shadow-sm`}>
     <p className={`text-xl font-black ${color} leading-none mb-1`}>{value.toLocaleString('pt-BR')}</p>
     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);

const EfficiencyCard: React.FC<{ label: string; value: number | string; icon: React.ReactNode; color: string; sub: string; formatter?: (v: any) => string }> = ({ label, value, icon, color, sub, formatter }) => {
  const actualFormatter = formatter || ((v: any) => v.toLocaleString('pt-BR'));
  const colorClasses: Record<string, string> = {
    red: 'text-red-600 bg-red-50',
    orange: 'text-orange-600 bg-orange-50',
    rose: 'text-rose-600 bg-rose-50',
    amber: 'text-amber-600 bg-amber-50',
  };
  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100 hover:scale-[1.02] transition-all">
       <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl ${colorClasses[color]}`}>{React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}</div>
          <div className="text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
             <p className={`text-3xl md:text-4xl font-black ${color === 'red' ? 'text-red-600' : 'text-slate-900'}`}>
                {typeof value === 'number' ? actualFormatter(value) : value}
             </p>
          </div>
       </div>
       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{sub}</p>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: number; formatter?: (v: number) => string; icon: React.ReactNode; color: string; isFS?: boolean }> = ({ label, value, formatter, icon, color, isFS }) => {
  const defaultFormatter = (val: number) => val.toLocaleString('pt-BR');
  const actualFormatter = formatter || defaultFormatter;
  const colorClasses: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-50',
    orange: 'text-orange-500 bg-orange-50',
    emerald: 'text-emerald-500 bg-emerald-50',
  };
  return (
    <div className={`bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-100 hover:translate-y-[-5px] transition-all group relative overflow-hidden flex flex-col justify-center ${isFS ? 'p-8 md:p-10 2xl:p-14' : 'p-6 md:p-8 2xl:p-12'}`}>
      <div className="flex justify-between items-start relative z-10 mb-6">
        <p className="text-blue-600 font-black tracking-widest uppercase text-[10px] md:text-xs">{label}</p>
        <div className={`rounded-xl transition-colors p-3 md:p-4 ${colorClasses[color] || 'bg-gray-50'} shadow-sm`}>
          {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: `size-6 md:size-8` })}
        </div>
      </div>
      <p className="font-black tracking-tighter text-gray-900 leading-none text-4xl md:text-6xl 2xl:text-[6rem] relative z-10">
        <AnimatedCounter target={value} formatter={actualFormatter} />
      </p>
    </div>
  );
};

export default Dashboard;
