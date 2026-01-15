
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
  Minimize2
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { ServiceMetric } from '../types';

const METRICS_DATA: ServiceMetric[] = [
  { 
    label: 'Limpeza Urbana', 
    days: 2.5, 
    totalPercentage: 75, 
    totalSolicitations: 12540,
    sectors: [
      { sigla: 'EM', percentage: 45, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 35, color: 'bg-indigo-500' },
      { sigla: 'SF', percentage: 20, color: 'bg-indigo-300' }
    ]
  },
  { 
    label: 'Iluminação Pública', 
    days: 1.8, 
    totalPercentage: 60, 
    totalSolicitations: 8920,
    sectors: [
      { sigla: 'SEURB', percentage: 50, color: 'bg-blue-600' },
      { sigla: 'EM', percentage: 30, color: 'bg-indigo-500' },
      { sigla: 'SS', percentage: 20, color: 'bg-indigo-300' }
    ]
  },
  { 
    label: 'Poda de Árvores', 
    days: 4.2, 
    totalPercentage: 45, 
    totalSolicitations: 5410,
    sectors: [
      { sigla: 'EM', percentage: 60, color: 'bg-blue-600' },
      { sigla: 'SEURB', percentage: 40, color: 'bg-indigo-500' }
    ]
  },
  { 
    label: 'Drenagem Pluvial', 
    days: 3.0, 
    totalPercentage: 30, 
    totalSolicitations: 3215,
    sectors: [
      { sigla: 'SEURB', percentage: 70, color: 'bg-blue-600' },
      { sigla: 'SF', percentage: 30, color: 'bg-indigo-500' }
    ]
  },
  { 
    label: 'Manutenção Viária', 
    days: 3.5, 
    totalPercentage: 55, 
    totalSolicitations: 10100,
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
    sectors: [
      { sigla: 'SESAU', percentage: 100, color: 'bg-blue-600' }
    ]
  },
  { 
    label: 'Coleta de Resíduos', 
    days: 0.8, 
    totalPercentage: 90, 
    totalSolicitations: 15400,
    sectors: [
      { sigla: 'EM', percentage: 90, color: 'bg-blue-600' },
      { sigla: 'SF', percentage: 10, color: 'bg-indigo-500' }
    ]
  },
];

interface Highlight {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const Dashboard: React.FC = () => {
  const [total, setTotal] = useState(1025880);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const highlights: Highlight[] = [
    { icon: <ArrowUpRight size={16} />, label: 'TENDÊNCIA', value: '+12% em Poda de Árvore' },
    { icon: <Zap size={16} />, label: 'MAIS SOLICITADO', value: 'Limpeza Urbana' },
    { icon: <Bell size={16} />, label: 'ALERTA EM TEMPO REAL', value: 'Poste reparado em Torre' },
    { icon: <Star size={16} />, label: 'MELHOR AVALIADO', value: 'Iluminação Pública (4.9)' },
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

  useEffect(() => {
    const handleFsChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className={`transition-all duration-500 flex flex-col bg-[#f8fafc] ${isFullScreen ? 'h-screen overflow-hidden' : 'min-h-screen pb-20'}`}>
      
      {/* HEADER: flex-none garante que ele não "roube" o espaço do conteúdo inferior em Fullscreen */}
      <header className={`blue-gradient-bg text-white relative overflow-hidden transition-all duration-700 rounded-b-[2rem] md:rounded-b-[4rem] flex-none
        ${isFullScreen ? 'rounded-none px-10 pt-8 pb-12' : 'px-6 md:px-12 2xl:px-24 pt-8 md:pt-12 pb-32 md:pb-48 2xl:pb-56'}`}>
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] 2xl:w-[1200px] 2xl:h-[1200px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <nav className={`flex items-center justify-between relative z-10 max-w-[2000px] mx-auto w-full transition-all ${isFullScreen ? 'mb-10' : 'mb-8'}`}>
          <div className="flex items-center gap-3 md:gap-5">
            <div className={`bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-xl p-2`}>
              <LayoutGrid size={isFullScreen ? 28 : 24} />
            </div>
            <div>
              <h1 className={`font-black tracking-tighter leading-none transition-all ${isFullScreen ? 'text-2xl' : 'text-xl md:text-3xl'}`}>Cidade<span className="text-blue-300 font-light">Conectada</span></h1>
              <p className={`font-bold text-blue-200/60 uppercase tracking-[0.2em] mt-0.5 text-[8px] md:text-[10px]`}>Gestão Inteligente v4.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleFullScreen}
              className={`bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all flex items-center gap-3 p-2.5 px-5`}
            >
              {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              <span className="font-bold text-[10px] uppercase tracking-widest">{isFullScreen ? 'REDUZIR' : 'MODO PAINEL'}</span>
            </button>
            <div className={`rounded-xl bg-white/10 flex items-center justify-center border border-white/10 w-9 h-9`}>
              <User size={18} />
            </div>
          </div>
        </nav>

        <div className="max-w-[2000px] mx-auto relative z-10 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8 2xl:gap-16">
            <div className="flex-1">
              <p className={`text-blue-300 uppercase tracking-[0.4em] font-black flex items-center gap-2 mb-3 transition-all ${isFullScreen ? 'text-xs' : 'text-[10px]'}`}>
                <Activity className="size-4 animate-pulse" /> MONITORAMENTO LIVE
              </p>
              <h2 className={`font-black tracking-tighter leading-[0.8] transition-all drop-shadow-2xl mb-8
                ${isFullScreen ? 'text-7xl md:text-9xl 2xl:text-[12rem]' : 'text-8xl md:text-[10rem] 2xl:text-[14rem]'}`}>
                <AnimatedCounter target={total} />
              </h2>

              {/* NOTIFICAÇÃO GLASSMORPHISM */}
              <div className={`w-full max-w-lg relative h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl`}>
                {highlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`absolute inset-0 flex items-center gap-4 px-5 transition-all duration-1000 ease-in-out
                      ${idx === highlightIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                  >
                    <div className="bg-blue-600/40 p-2 rounded-lg border border-white/10">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'text-white', size: 16 })}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-blue-200/80 uppercase tracking-widest">{item.label}</span>
                      <span className="text-base font-bold text-white truncate">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD DE EFICIÊNCIA */}
            <div className={`bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl w-full lg:w-96 2xl:w-[500px] p-8 transition-all`}>
               <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="text-blue-300 size-6 md:size-8" />
                  <h4 className="font-black text-xl md:text-2xl text-white">Eficiência</h4>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 rounded-2xl border border-white/5 p-4 md:p-6">
                     <span className="font-black text-blue-300 uppercase tracking-widest text-[10px] md:text-xs">Satisfação</span>
                     <div className="flex items-center gap-2">
                        <span className="font-black text-2xl md:text-3xl text-white">4.8</span>
                        <Star className="text-yellow-400 fill-current size-4 md:size-5" />
                     </div>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 rounded-2xl border border-white/5 p-4 md:p-6">
                     <span className="font-black text-blue-300 uppercase tracking-widest text-[10px] md:text-xs">Resolução</span>
                     <span className="font-black text-emerald-400 text-2xl md:text-3xl">92%</span>
                  </div>
               </div>
            </div>
        </div>
      </header>

      {/* KPI CARDS: Espaçamento reduzido em Fullscreen para dar lugar à lista */}
      <div className={`max-w-[2000px] mx-auto w-full px-6 md:px-12 2xl:px-24 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 transition-all
        ${isFullScreen ? 'mt-6' : '-mt-16 md:-mt-24 2xl:-mt-28'}`}>
        <MetricCard label="NOVAS SOLICITAÇÕES" value={total} icon={<FileText />} color="blue" isFS={isFullScreen} />
        <MetricCard label="EM ATENDIMENTO" value={Math.floor(total * 0.05)} icon={<Clock />} color="orange" isFS={isFullScreen} />
        <MetricCard label="CONCLUÍDAS" value={2450} icon={<CheckCircle />} color="emerald" isFS={isFullScreen} />
      </div>

      {/* MAIN CONTENT: flex-1 e overflow-hidden para scroll interno */}
      <main className={`max-w-[2000px] mx-auto w-full px-6 md:px-12 2xl:px-24 flex flex-col relative z-20 transition-all ${isFullScreen ? 'mt-8 flex-1 overflow-hidden mb-4' : 'mt-8 md:mt-12'}`}>
        
        <section className={`w-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all
          ${isFullScreen ? 'h-full p-8' : 'p-10 md:p-14 2xl:p-16'}`}>
          
          <div className={`flex justify-between items-center gap-4 ${isFullScreen ? 'mb-8' : 'mb-10'}`}>
            <div className="flex items-center gap-4">
               <div className={`bg-blue-600 rounded-full hidden md:block w-1.5 h-8`}></div>
               <h3 className={`font-black text-gray-900 tracking-tighter transition-all ${isFullScreen ? 'text-3xl' : 'text-2xl md:text-3xl 2xl:text-5xl'}`}>Serviços oferecidos e participação setorial</h3>
            </div>
            <div className="hidden sm:flex gap-4 font-black text-gray-400 uppercase tracking-widest bg-gray-50 rounded-xl border border-gray-100 p-3 text-[9px]">
              <div className="flex items-center gap-2"><div className="bg-blue-600 rounded-sm w-2.5 h-2.5" /> PRINCIPAL</div>
              <div className="flex items-center gap-2"><div className="bg-indigo-500 rounded-sm w-2.5 h-2.5" /> APOIO</div>
              <div className="flex items-center gap-2"><div className="bg-indigo-300 rounded-sm w-2.5 h-2.5" /> ADM</div>
            </div>
          </div>

          {/* ÁREA DE SCROLL: flex-1 garante que ocupe todo o espaço disponível na seção */}
          <div className={`transition-all pr-4 pl-1 custom-scrollbar overflow-y-auto flex-1 ${isFullScreen ? 'space-y-4' : 'space-y-6 md:space-y-8'}`}>
            {METRICS_DATA.map((metric, idx) => (
              <div key={metric.label} className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-8 border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                <div className="font-bold text-gray-300 shrink-0 w-8 text-base md:text-lg">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div className="shrink-0 md:w-48 lg:w-64">
                  <h4 className={`font-black text-gray-800 group-hover:text-blue-600 transition-all ${isFullScreen ? 'text-lg' : 'text-base md:text-xl'}`}>
                    {metric.label}
                  </h4>
                </div>
                <div className="flex-1">
                   <div className={`w-full bg-gray-50 rounded-xl overflow-hidden flex shadow-inner h-8 md:h-10 transition-all`}>
                    {metric.sectors.map((sector, sIdx) => (
                      <div 
                        key={sIdx}
                        className={`${sector.color} h-full transition-all duration-1000 flex items-center justify-center relative border-r border-white/10 last:border-0`} 
                        style={{ width: `${sector.percentage}%` }}
                      >
                        <span className={`font-black text-white/95 text-[8px] md:text-[10px] drop-shadow-sm whitespace-nowrap`}>
                          {sector.sigla} {sector.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0 md:w-32">
                  <p className="font-black text-gray-400 uppercase tracking-widest text-[9px] md:text-[10px]">
                    <span className={`text-gray-900 block font-black mb-0.5 ${isFullScreen ? 'text-lg' : 'text-base'}`}>{metric.totalSolicitations.toLocaleString('pt-BR')}</span>
                    solicitações
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: number; icon: React.ReactNode; color: string; isFS?: boolean }> = ({ label, value, icon, color, isFS }) => {
  return (
    <div className={`bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-gray-100 hover:translate-y-[-3px] transition-all group relative overflow-hidden
      ${isFS ? 'p-6' : 'p-6 md:p-8 2xl:p-12'}`}>
      <div className="flex justify-between items-start relative z-10 mb-4">
        <p className={`text-blue-600 font-black tracking-widest uppercase text-[9px] md:text-xs`}>{label}</p>
        <div className={`bg-gray-50 rounded-xl group-hover:bg-${color}-50 transition-colors p-2.5 md:p-3`}>
          {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { className: `text-${color}-500 size-5 md:size-6` })}
        </div>
      </div>
      <p className={`font-black tracking-tighter text-gray-900 leading-none transition-all
        ${isFS ? 'text-4xl 2xl:text-5xl' : 'text-4xl md:text-6xl 2xl:text-[5rem]'}`}>
        <AnimatedCounter target={value} />
      </p>
    </div>
  );
};

export default Dashboard;
