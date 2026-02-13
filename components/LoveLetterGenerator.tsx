
import React, { useState } from 'react';
import { Mail, Send, Copy, Download, Sparkles, Wand2, Heart } from 'lucide-react';
import { generateLoveLetter } from '../services/geminiService';
import ShareModal from './ShareModal';

const LoveLetterGenerator: React.FC = () => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tone, setTone] = useState<'Romantic' | 'Funny' | 'Poetic' | 'Short' | 'Long Distance'>('Romantic');
  const [details, setDetails] = useState('');
  const [letter, setLetter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleGenerate = async () => {
    if (!sender || !recipient) return;
    setIsGenerating(true);
    const result = await generateLoveLetter({ sender, recipient, tone, details });
    setLetter(result || null);
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    if (letter) {
      navigator.clipboard.writeText(letter);
      alert('ຄັດລອກຈົດໝາຍແລ້ວ!');
    }
  };

  const downloadLetter = () => {
    if (!letter) return;
    const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LoveLetter_to_${recipient}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toneMap: Record<string, string> = {
    'Romantic': 'ໂຣແມນຕິກ',
    'Funny': 'ຕະຫຼົກ',
    'Poetic': 'ບົດກອນ',
    'Short': 'ສັ້ນໆ',
    'Long Distance': 'ຮັກທາງໄກ'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10">
      <div className="glass p-10 rounded-[40px] space-y-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-purple-500 p-2 rounded-xl"><Mail className="text-white" /></div>
          <h2 className="text-3xl font-romantic font-bold">ນັກອອກແບບຈົດໝາຍ</h2>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white/60 mb-1 ml-2">ຈາກ</label>
              <input 
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="ຊື່ຂອງທ່ານ"
                className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/60 mb-1 ml-2">ເຖິງ</label>
              <input 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="ຊື່ຂອງເຂົາ"
                className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/60 mb-2 ml-2">ບັນຍາກາດ / ອາລົມ</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(toneMap).map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t as any)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tone === t ? 'bg-purple-500 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {toneMap[t]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/60 mb-1 ml-2">ລາຍລະອຽດພິເສດ (ຄວາມຊົງຈຳ, ມຸກຕະຫຼົກ...)</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="ຕົວຢ່າງ: ຈື່ວັນທີ່ຝົນຕົກຢູ່ປາກເຊໄດ້ບໍ່... ຫຼື ຂ້ອຍມັກຮອຍຍິ້ມຂອງເຈົ້າຫຼາຍ..."
              rows={4}
              className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !sender || !recipient}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {isGenerating ? (
              <><Sparkles className="animate-spin" /> <span>ກຳລັງສ້າງຄວາມມະຫັດສະຈັນ...</span></>
            ) : (
              <><Wand2 /> <span>ສ້າງຈົດໝາຍ</span></>
            )}
          </button>
        </div>
      </div>

      <div className="glass p-10 rounded-[40px] flex flex-col min-h-[500px] relative overflow-hidden">
        {letter ? (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right duration-500">
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-white/5 p-8 rounded-3xl font-romantic text-2xl leading-relaxed text-white/90 whitespace-pre-wrap border border-white/10">
                {letter}
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex space-x-3">
                <button onClick={copyToClipboard} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors" title="ຄັດລອກ">
                  <Copy size={20} />
                </button>
                <button onClick={downloadLetter} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors" title="ດາວໂຫລດ">
                  <Download size={20} />
                </button>
              </div>
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="px-8 py-3 bg-pink-500 rounded-full font-bold flex items-center space-x-2 hover:bg-pink-600 transition-colors"
              >
                <Send size={18} /> <span>ແບ່ງປັນ</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center opacity-40">
            <div className="border-2 border-dashed border-white/30 p-12 rounded-[40px] space-y-4">
              <Mail size={64} className="mx-auto" />
              <p className="text-xl">ຜົນງານອັນລ້ຳຄ່າຂອງທ່ານຈະປາກົດຢູ່ນີ້.</p>
              <p className="text-sm">ກະລຸນາຕື່ມແບບຟອມເພື່ອເລີ່ມຕົ້ນ.</p>
            </div>
          </div>
        )}
        
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
          <Heart fill="white" size={300} />
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`ຈົດໝາຍຮັກຈາກ ${sender} ເຖິງ ${recipient}`}
        text={letter || ''}
        url={window.location.href}
      />
    </div>
  );
};

export default LoveLetterGenerator;
