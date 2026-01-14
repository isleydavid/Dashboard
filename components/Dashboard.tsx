
import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Moon, 
  CheckCircle, 
  Clock, 
  FileText,
  TrendingUp,
  LayoutGrid,
  Zap,
  Star,
  ArrowUpRight,
  MapPin,
  User,
  Activity
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { ServiceMetric, DeptEfficiency } from '../types';

const METRICS_DATA: ServiceMetric[] = [
  { label: 'Limpeza Urbana', days: 2.5, totalPercentage: 75, operational: 40, fiscalization: 25, administrative: 10 },
  { label: 'Iluminação', days: 1.8, totalPercentage: 60, operational: 35, fiscalization: 20, administrative: 5 },
  { label: 'Poda de Árvore', days: 4.2, totalPercentage: 45, operational: 25, fiscalization: 15, administrative: 5 },
  { label: 'Drenagem', days: 3.0, totalPercentage: 30, operational: 15, fiscalization: 10, administrative: 5 },
];

const EFFICIENCY_DATA: DeptEfficiency[] = [
  { id: 1, code: 'EM', name: 'EMLUR', subName: 'LIMPEZA & COLETA', efficiency: 95, solicitations: '12.5k', color: 'bg-emerald-500' },
  { id: 2, code: 'SE', name: 'SEURB', subName: 'URBANISMO', efficiency: 88, solicitations: '10.2k', color: 'bg-blue-500' },
  { id: 3, code: 'SM', name: 'SEMOB', subName: 'MOBILIDADE', efficiency: 72, solicitations: '8.1k', color: 'bg-orange-500' },
  { id: 4, code: 'SS', name: 'SESAU', subName: 'SAÚDE', efficiency: 81, solicitations: '5.4k', color: 'bg-emerald-400' },
];

interface Highlight {
  icon: React.ReactNode;
  label: string;
  value: string;
  type: 'trend' | 'rating' | 'demand' | 'alert';
}

const Dashboard: React.FC = () => {
  const [total, setTotal] = useState(1024560);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [highlights, setHighlights] = useState<Highlight[]>([
    { icon: <Zap size={14} />, label: 'MAIS SOLICITADO', value: 'Limpeza Urbana', type: 'demand' },
    { icon: <Star size={14} />, label: 'MELHOR AVALIADO', value: 'Iluminação Pública (4.9)', type: 'rating' },
    { icon: <ArrowUpRight size={14} />, label: 'TENDÊNCIA', value: '+12% em Poda de Árvore', type: 'trend' },
    { icon: <Bell size={14} />, label: 'ALERTA EM TEMPO REAL', value: 'Novo vazamento em Tambaú', type: 'alert' },
  ]);

  // Simulate constant activity
  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(prev => prev + Math.floor(Math.random() * 8));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Dynamic Highlight Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
      
      if (Math.random() > 0.5) {
        setHighlights(prev => {
          const next = [...prev];
          const updateIdx = Math.floor(Math.random() * prev.length);
          if (next[updateIdx].type === 'alert') {
            const locations = ['Centro', 'Bessa', 'Manaíra', 'Mangabeira', 'Cabo Branco', 'Torre'];
            const alerts = ['Vazamento reportado em', 'Queda de galho em', 'Poste apagado em', 'Semáforo inativo em'];
            next[updateIdx].value = `${alerts[Math.floor(Math.random() * alerts.length)]} ${locations[Math.floor(Math.random() * locations.length)]}`;
          } else if (next[updateIdx].type === 'trend') {
            const sectors = ['Mobilidade', 'Saúde', 'Limpeza', 'Obras'];
            next[updateIdx].value = `+${Math.floor(Math.random() * 20)}% demanda em ${sectors[Math.floor(Math.random() * sectors.length)]}`;
          }
          return next;
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div className="min-h-screen pb-12 flex flex-col bg-[#f8fafc]">
      {/* Header Section (Blue) */}
      <header className="blue-gradient-bg text-white px-4 md:px-8 xl:px-12 pt-6 md:pt-8 pb-20 md:pb-32 lg:pb-40 transition-all duration-700 relative overflow-hidden">
        {/* Abstract background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

        <nav className="flex items-center justify-between mb-8 md:mb-12 relative z-10 max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-4 md:gap-10">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-white/10 p-1.5 md:p-2 rounded-xl backdrop-blur-md border border-white/20">
                <LayoutGrid className="text-white" size={20} />
              </div>
              <h1 className="font-extrabold text-lg md:text-2xl tracking-tight">Cidade<span className="text-blue-300 font-light">Conectada</span></h1>
            </div>
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-blue-100/80">
              <a href="#" className="text-white border-b-2 border-blue-400 pb-1">Dashboard</a>
              <a href="#" className="hover:text-white transition-colors">Serviços</a>
              <a href="#" className="hover:text-white transition-colors">Infraestrutura</a>
              <a href="#" className="hover:text-white transition-colors">Gestão</a>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black tracking-widest text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE STREAM
            </div>
            <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-2 py-2 md:px-3 md:py-2 rounded-2xl transition-all cursor-pointer border border-white/10">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center font-bold text-sm shadow-lg">
                <User size={16} />
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-[1600px] mx-auto relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="flex-1 space-y-4 md:space-y-6">
              <div className="space-y-1">
                <p className="text-blue-300 uppercase tracking-[0.2em] text-[10px] md:text-[11px] font-black flex items-center gap-2">
                  <Activity size={12} /> MONITORAMENTO GLOBAL
                </p>
                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-black tracking-tighter leading-[0.9] text-white">
                  <AnimatedCounter target={total} />
                </h2>
              </div>
              
              {/* Dynamic Highlight Pill */}
              <div className="relative h-14 md:h-16 w-full max-w-lg">
                {highlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 flex items-center gap-3 md:gap-4 bg-white/10 backdrop-blur-2xl px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-[1.5rem] text-sm border border-white/20 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
                      ${idx === highlightIndex ? 'translate-y-0 opacity-100 scale-100' : idx < highlightIndex ? '-translate-y-full opacity-0 scale-95' : 'translate-y-full opacity-0 scale-95'}`}
                  >
                    <div className="p-2 md:p-2.5 bg-blue-500/30 rounded-lg md:rounded-xl text-blue-200 shadow-inner">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest leading-none mb-1">{item.label}</span>
                      <span className="font-bold text-white text-sm md:text-lg tracking-tight truncate max-w-[200px] sm:max-w-[280px] md:max-w-xs">{item.value}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Efficiency Widget - Visible on tablets and monitors */}
            <div className="hidden md:block lg:w-72 xl:w-80">
               <div className="bg-white/5 p-6 xl:p-8 rounded-3xl xl:rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-4 mb-6 xl:mb-8">
                     <div className="p-3 xl:p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl xl:rounded-[1.25rem] shadow-xl shadow-blue-500/30">
                        <TrendingUp className="text-white" size={20} />
                     </div>
                     <div>
                        <h4 className="text-base xl:text-lg font-black text-white">Eficiência Geral</h4>
                        <p className="text-[10px] xl:text-xs text-blue-300 font-medium">Últimas 24 horas</p>
                     </div>
                  </div>
                  <div className="space-y-3 xl:space-y-4">
                     <div className="bg-white/5 p-3 xl:p-4 rounded-xl xl:rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Satisfação</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl xl:text-3xl font-black italic text-white">4.8</p>
                          <div className="flex gap-0.5 text-yellow-400">
                            {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                          </div>
                        </div>
                     </div>
                     <div className="bg-white/5 p-3 xl:p-4 rounded-xl xl:rounded-2xl border border-white/5">
                        <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Resolução</p>
                        <p className="text-2xl xl:text-3xl font-black italic text-white">92%</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-8 relative z-10">
            <MetricCard 
              label="SOLICITAÇÕES ACUMULADAS" 
              value={total} 
              icon={<FileText className="text-blue-500" />}
              delay={0}
            />
            <MetricCard 
              label="PENDÊNCIAS CRÍTICAS" 
              value={Math.floor(total * 0.08)} 
              icon={<Clock className="text-orange-500" />}
              delay={100}
            />
            <MetricCard 
              label="CONCLUÍDOS HOJE" 
              value={Math.floor(Math.random() * 500) + 1200} 
              icon={<CheckCircle className="text-emerald-500" />}
              delay={200}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1600px] mx-auto w-full -mt-10 md:-mt-16 lg:-mt-24 px-4 md:px-8 flex flex-col lg:flex-row gap-6 md:gap-10 relative z-20">
        
        {/* Left Column: Sector Graphics */}
        <section className="flex-1 bg-white rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] shadow-xl md:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-6 md:p-8 lg:p-12 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-6">
            <div className="space-y-1">
              <h3 className="font-black text-gray-900 text-xl md:text-2xl lg:text-3xl tracking-tight">Capacidade Operacional</h3>
              <p className="text-xs md:text-sm text-gray-400 font-semibold tracking-wide">Volume de trabalho distribuído por secretaria</p>
            </div>
            <div className="flex flex-wrap gap-4 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50 p-2 md:p-3 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div> OPERACIONAL
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/20"></div> FISCALIZAÇÃO
              </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12">
            {METRICS_DATA.map((metric) => (
              <div key={metric.label} className="group cursor-default">
                <div className="flex justify-between items-end mb-3 md:mb-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-5">
                    <span className="font-black text-lg md:text-xl lg:text-2xl text-gray-800 tracking-tight">{metric.label}</span>
                    <span className="bg-emerald-50 text-[9px] md:text-[10px] font-black text-emerald-600 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-sm w-fit">
                      <Clock size={10} className="md:size-3" /> {metric.days}d MÉDIA
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] md:text-xs font-black text-gray-300 group-hover:text-blue-600 transition-colors uppercase tracking-widest">{metric.totalPercentage}% OCUPAÇÃO</span>
                  </div>
                </div>
                <div className="w-full h-4 md:h-6 bg-gray-50 rounded-full overflow-hidden flex ring-4 md:ring-[6px] ring-gray-50 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-blue-500 h-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]" 
                    style={{ width: `${metric.operational}%` }} 
                  />
                  <div 
                    className="bg-indigo-500 h-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] delay-100 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]" 
                    style={{ width: `${metric.fiscalization}%` }} 
                  />
                  <div 
                    className="bg-gray-200 h-full transition-all duration-1000" 
                    style={{ width: `${metric.administrative}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Efficiency Leaderboard */}
        <aside className="lg:w-80 xl:w-[480px] space-y-6 md:space-y-10">
          <div className="bg-white rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] shadow-xl md:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-6 md:p-8 lg:p-10 border border-gray-100">
            <div className="flex justify-between items-center mb-6 md:mb-10">
              <h3 className="font-black text-gray-900 text-lg md:text-2xl tracking-tight">Performance</h3>
              <div className="p-2 md:p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
                 <TrendingUp size={18} />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              {EFFICIENCY_DATA.map((dept) => (
                <div key={dept.id} className="p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-[2rem] hover:bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-500 border-2 border-transparent hover:border-blue-50 group cursor-default">
                  <div className="flex items-center gap-3 md:gap-6 mb-3 md:mb-5">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-gray-900 text-white flex items-center justify-center text-[10px] md:text-xs font-black shadow-lg shadow-gray-200 group-hover:bg-blue-600 transition-colors shrink-0">
                      {dept.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-gray-800 text-sm md:text-lg leading-tight truncate">{dept.name}</h4>
                      <p className="text-[9px] md:text-[10px] font-bold text-gray-400 tracking-[0.1em] md:tracking-[0.2em] uppercase mt-0.5 truncate">{dept.subName}</p>
                    </div>
                    <div className="text-right shrink-0">
                       <p className="text-xl md:text-3xl font-black text-emerald-500 tracking-tighter leading-none">{dept.efficiency}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-5">
                    <div className="flex-1 h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full ${dept.color} transition-all duration-[1.5s] delay-500 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]`} 
                        style={{ width: `${dept.efficiency}%` }} 
                      />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black text-gray-400 whitespace-nowrap tracking-wider">{dept.solicitations} SOLIC.</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 md:mt-10 py-4 md:py-5 bg-gray-900 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-xl md:rounded-[1.5rem] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300">
               Relatórios Avançados
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  delay: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`bg-white rounded-2xl md:rounded-[2.5rem] p-5 md:p-8 shadow-lg md:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.06)] border border-gray-100 transition-all duration-1000 transform hover:translate-y-[-4px] hover:shadow-2xl cursor-default group
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 md:translate-y-12 opacity-0'}`}
    >
      <div className="flex items-start justify-between mb-4 md:mb-8">
        <p className="text-blue-600 font-black text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase">{label}</p>
        <div className="p-2 md:p-4 bg-gray-50 group-hover:bg-blue-50/80 rounded-lg md:rounded-[1.25rem] transition-all duration-500 group-hover:scale-110">
          {/* Fix: Validate element and cast to React.ReactElement<any> to resolve TypeScript overload/className issues when cloning */}
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { 
            className: `${(icon.props as any).className || ''} size-4 md:size-6` 
          }) : icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2 md:gap-3">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-gray-900 leading-none whitespace-nowrap">
          <AnimatedCounter target={value} />
        </p>
        {label.includes('HOJE') && (
           <span className="text-emerald-600 font-black text-[8px] md:text-[10px] bg-emerald-50 px-2 py-0.5 md:py-1 rounded-md md:rounded-lg border border-emerald-100 animate-pulse tracking-widest shrink-0">+12%</span>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
