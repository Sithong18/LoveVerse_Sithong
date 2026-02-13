
import React, { useState } from 'react';
import { Heart, RefreshCcw, Share2, Sparkles, Download } from 'lucide-react';
import { getLoveAdvice } from '../services/geminiService';
import ShareModal from './ShareModal';

const LoveCalculator: React.FC = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const calculateLove = async () => {
    if (!name1 || !name2) return;
    
    setIsCalculating(true);
    setScore(null);
    setAdvice(null);

    await new Promise(r => setTimeout(r, 2000));

    const combined = (name1.toLowerCase() + name2.toLowerCase()).split('').sort().join('');
    let sum = 0;
    for (let i = 0; i < combined.length; i++) {
      sum += combined.charCodeAt(i);
    }
    const finalScore = (sum % 41) + 60;

    setScore(finalScore);
    const aiAdvice = await getLoveAdvice([name1, name2]);
    setAdvice(aiAdvice);
    setIsCalculating(false);
  };

  const getVerdict = (s: number) => {
    if (s > 90) return "ຄູ່ແທ້ທີ່ສົມບູນແບບ! 💍";
    if (s > 80) return "ມີຄວາມຜູກພັນທີ່ເລິກເຊິ່ງ 🔥";
    if (s > 70) return "ຄວາມຮັກທີ່ສວຍງາມ 🌸";
    return "ມີທ່າແຮງທີ່ດີຮ່ວມກັນ ❤️";
  };

  const downloadResult = () => {
    if (score === null) return;
    const content = `--- ຜົນການທົດສອບຄວາມຮັກຈາກ LoveVerse ---\n\n` +
      `ຄູ່ຮັກ: ${name1} & ${name2}\n` +
      `ຄະແນນຄວາມເຂົ້າກັນໄດ້: ${score}%\n` +
      `ຄຳຕັດສິນ: ${getVerdict(score)}\n\n` +
      `ຄຳແນະນຳຈາກ AI:\n"${advice}"\n\n` +
      `ສ້າງຂຶ້ນດ້ວຍຄວາມຮັກທີ່ LoveVerse.com`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LoveResult_${name1}_${name2}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="glass p-10 rounded-[40px] shadow-2xl space-y-8 text-center border border-white/30">
        <div className="inline-block p-4 bg-pink-500 rounded-full shadow-lg mb-4 animate-pulse">
          <Heart fill="white" size={40} className="text-white" />
        </div>
        
        <h2 className="text-4xl font-romantic font-bold">ຄວາມເຂົ້າກັນໄດ້ຂອງຄວາມຮັກ</h2>
        <p className="text-white/70">ປ້ອນຊື່ຂອງທ່ານເພື່ອເປີດເຜີຍຄວາມສອດຄ່ອງຂອງຈັກກະວານລະຫວ່າງຫົວໃຈຂອງທ່ານ.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ຊື່ຂອງທ່ານ"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            className="w-full px-6 py-4 rounded-3xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-white/40 text-center text-lg"
          />
          <input
            type="text"
            placeholder="ຊື່ຄູ່ຮັກຂອງທ່ານ"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            className="w-full px-6 py-4 rounded-3xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-white/40 text-center text-lg"
          />
        </div>

        <button
          onClick={calculateLove}
          disabled={isCalculating || !name1 || !name2}
          className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl font-bold text-xl shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50"
        >
          {isCalculating ? "ກຳລັງກວດສອບດວງດາວ..." : "ຄິດໄລ່ຄວາມເຂົ້າກັນໄດ້"}
        </button>

        {isCalculating && (
          <div className="flex justify-center space-x-2 py-4">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}

        {score !== null && !isCalculating && (
          <div className="space-y-6 py-4 animate-in fade-in zoom-in duration-700">
            <div className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-pink-200">
              {score}%
            </div>
            <h4 className="text-2xl font-romantic font-semibold text-pink-100">{getVerdict(score)}</h4>
            
            {advice && (
              <div className="glass p-6 rounded-2xl text-left bg-white/5 border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-20"><Sparkles size={20} /></div>
                <h5 className="text-xs uppercase font-bold tracking-widest text-pink-200 mb-2">ຄຳແນະນຳຄວາມຮັກຈາກ AI</h5>
                <p className="italic text-white/90 leading-relaxed">"{advice}"</p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={() => { setName1(''); setName2(''); setScore(null); setAdvice(null); }}
                className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <RefreshCcw size={18} /> <span>ລອງໃໝ່</span>
              </button>
              <button 
                onClick={downloadResult}
                className="flex items-center space-x-2 px-6 py-3 rounded-full bg-indigo-500/50 hover:bg-indigo-500 transition-colors"
              >
                <Download size={18} /> <span>ດາວໂຫລດຜົນ</span>
              </button>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 rounded-full bg-pink-600/50 hover:bg-pink-600 transition-colors"
              >
                <Share2 size={18} /> <span>ແບ່ງປັນຜົນ</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="ຜົນການຄິດໄລ່ຄວາມຮັກຈາກ LoveVerse"
        text={`ຄວາມເຂົ້າກັນໄດ້ຂອງ ${name1} ແລະ ${name2} ແມ່ນ ${score}%! ${score && getVerdict(score)}`}
        url={window.location.href}
      />
    </div>
  );
};

export default LoveCalculator;
