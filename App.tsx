
import React, { useState } from 'react';
import { View } from './types';
import FloatingHearts from './components/FloatingHearts';
import LandingPage from './components/LandingPage';
import LoveCalculator from './components/LoveCalculator';
import LoveLetterGenerator from './components/LoveLetterGenerator';
import MemoryTimeline from './components/MemoryTimeline';
import CountdownTimer from './components/CountdownTimer';
import SurpriseCreator from './components/SurpriseCreator';
import QRGenerator from './components/QRGenerator';
import { Heart, Home, Gift, Calendar, Camera, Calculator, Mail, QrCode } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.LANDING: return <LandingPage onNavigate={setCurrentView} />;
      case View.CALCULATOR: return <LoveCalculator />;
      case View.GENERATOR: return <LoveLetterGenerator />;
      case View.TIMELINE: return <MemoryTimeline />;
      case View.COUNTDOWN: return <CountdownTimer />;
      case View.SURPRISE: return <SurpriseCreator />;
      case View.QR: return <QRGenerator />;
      default: return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  const NavItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: View }) => (
    <button
      onClick={() => { setCurrentView(view); setIsMenuOpen(false); }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
        currentView === view ? 'bg-white/40 text-white font-bold' : 'text-white/80 hover:bg-white/20'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="relative min-h-screen text-white pb-20 md:pb-0">
      <FloatingHearts />
      
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setCurrentView(View.LANDING)}
        >
          <div className="bg-pink-500 p-1.5 rounded-full">
            <Heart fill="white" size={24} />
          </div>
          <span className="text-2xl font-romantic font-bold tracking-wider">LoveVerse</span>
        </div>
        
        <div className="hidden lg:flex items-center space-x-1">
          <NavItem icon={Home} label="ໜ້າຫຼັກ" view={View.LANDING} />
          <NavItem icon={Calculator} label="ຄິດໄລ່ຄວາມຮັກ" view={View.CALCULATOR} />
          <NavItem icon={Mail} label="ຈົດໝາຍຮັກ" view={View.GENERATOR} />
          <NavItem icon={Camera} label="ຄວາມຊົງຈຳ" view={View.TIMELINE} />
          <NavItem icon={Calendar} label="ນັບຖອຍຫຼັງ" view={View.COUNTDOWN} />
          <NavItem icon={Gift} label="ເຊີໄພຣສ໌" view={View.SURPRISE} />
          <NavItem icon={QrCode} label="QR ໂຄ້ດ" view={View.QR} />
        </div>

        <button 
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden glass pt-24 px-6 flex flex-col space-y-4">
          <NavItem icon={Home} label="ໜ້າຫຼັກ" view={View.LANDING} />
          <NavItem icon={Calculator} label="ເຄື່ອງຄິດໄລ່ຄວາມຮັກ" view={View.CALCULATOR} />
          <NavItem icon={Mail} label="ເຄື່ອງສ້າງຈົດໝາຍຮັກ" view={View.GENERATOR} />
          <NavItem icon={Camera} label="ທາມລາຍຄວາມຊົງຈຳ" view={View.TIMELINE} />
          <NavItem icon={Calendar} label="ນັບຖອຍຫຼັງວັນສຳຄັນ" view={View.COUNTDOWN} />
          <NavItem icon={Gift} label="ສ້າງໜ້າເຊີໄພຣສ໌" view={View.SURPRISE} />
          <NavItem icon={QrCode} label="ສ້າງ QR ໂຄ້ດ" view={View.QR} />
        </div>
      )}

      <main className="pt-24 min-h-screen relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {renderView()}
      </main>

      <footer className="mt-20 py-8 text-center text-white/60 border-t border-white/10 glass hidden lg:block">
        <p>© {new Date().getFullYear()} LoveVerse. ສ້າງດ້ວຍ ❤️ ສຳລັບທຸກຄົນທີ່ມີຄວາມຮັກ.</p>
        <p className="text-xs mt-2 italic">"Code is temporary, true love is forever."</p>
      </footer>
    </div>
  );
};

export default App;
