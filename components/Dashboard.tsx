
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(prev => prev + Math.floor(Math.random() * 10));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % highlights.length);
      
      if (Math.random() > 0.4) {
        setHighlights(prev => {
          const next = [...prev];
          const updateIdx = Math.floor(Math.random() * prev.length);
          if (next[updateIdx].type === 'alert') {
            const locations = ['Centro', 'Bessa', 'Manaíra', 'Mangabeira', 'Cabo Branco', 'Torre', 'Geisel'];
            const alerts = ['Vazamento reportado em', 'Queda de galho em', 'Poste apagado em', 'Semáforo intermitente em'];
            next[updateIdx].value = `${alerts[Math.floor(Math.random() * alerts.length)]} ${locations[Math.floor(Math.random() * locations.length)]}`;
          } else if (next[updateIdx].type === 'trend') {
            const sectors = ['Mobilidade', 'Saúde', 'Limpeza Urbana', 'Segurança', 'Obras'];
            next[updateIdx].value = `+${Math.floor(Math.random() * 25)}% demanda em ${sectors[Math.floor(Math.random() * sectors.length)]}`;
          }
          return next;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div className="min-h-screen pb-16 flex flex-col bg-[#f8fafc]">
      <header className="blue-gradient-bg text-white px-4 sm:px-8 xl:px-12 pt-6 md:pt-10 pb-24 md:pb-36 lg:pb-48 transition-all duration-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 md:w-[500px] md:h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <nav className="flex items-center justify-between mb-10 md:mb-14 relative z-10 max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-6 xl:gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
                <LayoutGrid className="text-white" size={24} />
              </div>
              <h1 className="font-black text-xl md:text-3xl tracking-tighter">Cidade<span className="text-blue-300 font-light">Conectada</span></h1>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-blue-100/70">
              <a href="#" className="text-white border-b-2 border-blue-400 pb-1 uppercase tracking-wider">PAINEL AO VIVO</a>
              <a href="#" className="hover:text-white transition-all uppercase tracking-wider">Serviços</a>
              <a href="#" className="hover:text-white transition-all uppercase tracking-wider">Mapa</a>
              <a href="#" className="hover:text-white transition-all uppercase tracking-wider">Gestão</a>
            </div>
          </div>
          <div className="flex items-center gap-4 xl:gap-8">
            <div className="hidden md:flex items-center gap-3 text-[10px] xl:text-[11px] font-black tracking-[0.2em] text-emerald-300 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              FLUXO DE DADOS ATIVO
            </div>
            <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-2xl transition-all border border-white/10 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center font-bold shadow-xl group-hover:scale-105 transition-transform">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-[1600px] mx-auto relative z-10 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-20 mb-12 md:mb-20">
            <div className="flex-1 space-y-6 md:space-y-8">
              <div className="space-y-2">
                <p className="text-blue-300 uppercase tracking-[0.3em] text-[11px] md:text-xs font-black flex items-center gap-2">
                  <Activity size={14} className="animate-bounce" /> SOLICITAÇÕES TOTAIS (GLOBAL)
                </p>
                <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[13rem] font-black tracking-tighter leading-[0.8] text-white transition-all">
                  <AnimatedCounter target={total} />
                </h2>
              </div>
              
              <div className="relative h-16 md:h-20 w-full max-w-xl">
                {highlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 flex items-center gap-4 md:gap-6 bg-white/10 backdrop-blur-3xl px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-[2rem] text-sm border border-white/20 transition-all duration-1000
                      ${idx === highlightIndex ? 'translate-y-0 opacity-100 scale-100' : idx < highlightIndex ? '-translate-y-full opacity-0 scale-95' : 'translate-y-full opacity-0 scale-95'}`}
                  >
                    <div className="p-3 md:p-4 bg-blue-500/30 rounded-xl md:rounded-2xl text-blue-200 shadow-inner">
                      {item.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] md:text-[11px] font-black text-blue-300 uppercase tracking-widest leading-none mb-1.5">{item.label}</span>
                      <span className="font-extrabold text-white text-base md:text-2xl tracking-tight truncate">{item.value}</span>
                    </div>
                    <div className="ml-auto hidden sm:flex items-center gap-2">
                       <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping opacity-75" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-[350px] xl:w-[400px]">
               <div className="bg-white/5 p-8 xl:p-10 rounded-[2.5rem] xl:rounded-[3.5rem] border border-white/10 backdrop-blur-md shadow-2xl space-y-8">
                  <div className="flex items-center gap-5">
                     <div className="p-5 xl:p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[1.5rem] xl:rounded-[2rem] shadow-2xl shadow-blue-600/40">
                        <TrendingUp className="text-white" size={32} />
                     </div>
                     <div>
                        <h4 className="text-xl xl:text-2xl font-black text-white leading-tight">Saúde Urbana</h4>
                        <p className="text-xs xl:text-sm text-blue-300 font-semibold tracking-wide">Performance em Tempo Real</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 xl:gap-6">
                     <div className="bg-white/5 p-5 xl:p-6 rounded-[1.5rem] border border-white/5 flex justify-between items-center">
                        <p className="text-[11px] xl:text-xs font-black text-blue-300 uppercase tracking-[0.2em]">Satisfação</p>
                        <div className="flex items-center gap-3">
                          <p className="text-3xl xl:text-4xl font-black italic text-white leading-none">4.8</p>
                          <div className="flex gap-0.5 text-yellow-400">
                             <Star size={14} fill="currentColor" />
                          </div>
                        </div>
                     </div>
                     <div className="bg-white/5 p-5 xl:p-6 rounded-[1.5rem] border border-white/5 flex justify-between items-center">
                        <p className="text-[11px] xl:text-xs font-black text-blue-300 uppercase tracking-[0.2em]">SLA Médio</p>
                        <p className="text-3xl xl:text-4xl font-black italic text-white leading-none">94%</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10 relative z-10">
            <MetricCard 
              label="SOLICITAÇÕES ACUMULADAS" 
              value={total} 
              icon={<FileText className="text-blue-500" />}
              delay={0}
            />
            <MetricCard 
              label="PENDÊNCIAS EM ABERTO" 
              value={Math.floor(total * 0.08)} 
              icon={<Clock className="text-orange-500" />}
              delay={100}
            />
            <MetricCard 
              label="RESOLVIDOS (24H)" 
              value={Math.floor(Math.random() * 800) + 1500} 
              icon={<CheckCircle className="text-emerald-500" />}
              delay={200}
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto w-full -mt-12 md:-mt-20 lg:-mt-28 px-4 sm:px-8 flex flex-col xl:flex-row gap-8 lg:gap-12 relative z-20">
        <section className="flex-1 bg-white rounded-3xl md:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] p-8 md:p-12 lg:p-14 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 md:mb-16 gap-8">
            <div className="space-y-2">
              <h3 className="font-black text-gray-900 text-2xl md:text-3xl lg:text-4xl tracking-tighter">Capacidade Operacional</h3>
              <p className="text-sm md:text-base text-gray-400 font-bold tracking-tight">Distribuição de carga por secretaria municipal</p>
            </div>
            <div className="flex flex-wrap gap-5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 bg-blue-600 rounded-full shadow-lg"></div> OPERACIONAL
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-lg"></div> FISCALIZAÇÃO
              </div>
            </div>
          </div>

          <div className="space-y-12 md:space-y-16">
            {METRICS_DATA.map((metric) => (
              <div key={metric.label} className="group cursor-default">
                <div className="flex justify-between items-end mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="font-black text-xl md:text-2xl lg:text-3xl text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">{metric.label}</span>
                    <span className="bg-emerald-50 text-[10px] md:text-xs font-black text-emerald-600 px-4 py-2 rounded-full border border-emerald-100 flex items-center gap-2 shadow-sm w-fit">
                      <Clock size={12} /> {metric.days}d SLA MÉDIO
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs md:text-sm font-black text-gray-300 group-hover:text-blue-500 transition-colors uppercase tracking-[0.2em]">{metric.totalPercentage}% CARGA</span>
                  </div>
                </div>
                <div className="w-full h-6 md:h-8 bg-gray-50 rounded-full overflow-hidden flex ring-[8px] ring-gray-50 shadow-inner group-hover:ring-blue-50 transition-all duration-500">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-blue-500 h-full transition-all duration-[1.2s] ease-out" 
                    style={{ width: `${metric.operational}%` }} 
                  />
                  <div 
                    className="bg-indigo-500 h-full transition-all duration-[1.2s] ease-out delay-150 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]" 
                    style={{ width: `${metric.fiscalization}%` }} 
                  />
                  <div 
                    className="bg-gray-100 h-full transition-all duration-1000" 
                    style={{ width: `${metric.administrative}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="xl:w-[480px] 2xl:w-[550px] space-y-10 md:space-y-12">
          <div className="bg-white rounded-3xl md:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] p-8 md:p-12 border border-gray-100">
            <div className="flex justify-between items-center mb-10 md:mb-12">
              <h3 className="font-black text-gray-900 text-2xl lg:text-3xl tracking-tight">Top Performance</h3>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm">
                 <Activity size={24} />
              </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              {EFFICIENCY_DATA.map((dept) => (
                <div key={dept.id} className="p-6 md:p-8 bg-gray-50 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:scale-[1.03] transition-all duration-500 border-2 border-transparent hover:border-blue-50 group cursor-default">
                  <div className="flex items-center gap-6 mb-6 md:mb-8">
                    <div className="w-14 h-14 rounded-[1.25rem] bg-gray-900 text-white flex items-center justify-center text-sm font-black shadow-xl shadow-gray-200 group-hover:bg-blue-600 transition-colors shrink-0">
                      {dept.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-gray-800 text-lg md:text-xl leading-tight truncate">{dept.name}</h4>
                      <p className="text-[10px] md:text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-1 truncate">{dept.subName}</p>
                    </div>
                    <div className="text-right shrink-0">
                       <p className="text-3xl md:text-4xl font-black text-emerald-500 tracking-tighter leading-none">{dept.efficiency}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex-1 h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full ${dept.color} transition-all duration-[2s] delay-500 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.2)]`} 
                        style={{ width: `${dept.efficiency}%` }} 
                      />
                    </div>
                    <span className="text-[11px] font-black text-gray-400 whitespace-nowrap tracking-widest">{dept.solicitations} SOLIC.</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 md:mt-14 py-6 bg-gray-900 text-white font-black text-xs md:text-sm uppercase tracking-[0.4em] rounded-[2rem] hover:bg-blue-600 hover:shadow-2xl transition-all duration-300">
               Explorar Big Data
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
      className={`bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.06)] border border-gray-100 transition-all duration-1000 transform hover:translate-y-[-8px] hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.12)] cursor-default group overflow-hidden relative
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
    >
      <div className="flex items-start justify-between mb-8 md:mb-12 relative z-10">
        <p className="text-blue-600 font-black text-[10px] md:text-xs tracking-[0.3em] uppercase">{label}</p>
        <div className="p-4 md:p-5 bg-gray-50 group-hover:bg-blue-50/80 rounded-[1.5rem] transition-all duration-500 group-hover:scale-110 shadow-sm">
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { 
            className: `${(icon.props as any).className || ''} size-6 md:size-8` 
          }) : icon}
        </div>
      </div>
      <div className="flex items-baseline gap-3 md:gap-4 relative z-10">
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-gray-900 leading-none whitespace-nowrap">
          <AnimatedCounter target={value} />
        </p>
        {label.includes('RESOLVIDOS') && (
           <span className="text-emerald-600 font-black text-[10px] md:text-xs bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 animate-pulse tracking-widest">+14.2%</span>
        )}
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
};

export default Dashboard;
