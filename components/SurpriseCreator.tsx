
import React, { useState } from 'react';
import { Gift, Lock, Globe, Share2, Copy, Sparkles, Heart } from 'lucide-react';
import ShareModal from './ShareModal';

const SurpriseCreator: React.FC = () => {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [surpriseId, setSurpriseId] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const createSurprise = () => {
    if (!message) return;
    const id = Math.random().toString(36).substring(7);
    setSurpriseId(id);
    setIsCreated(true);
  };

  const surpriseUrl = `${window.location.origin}/surprise/${surpriseId}`;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="glass p-10 rounded-[40px] shadow-2xl space-y-8 border border-white/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={120} /></div>

        <div className="text-center space-y-2">
          <div className="inline-block p-4 bg-amber-400 rounded-3xl shadow-xl mb-4 rotate-3">
            <Gift size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-romantic font-bold">ເຄື່ອງສ້າງເຊີໄພຣສ໌</h2>
          <p className="text-white/70">ສ້າງຂໍ້ຄວາມລັບໃຫ້ຄູ່ຮັກຂອງທ່ານ. ປິດດ້ວຍລະຫັດຜ່ານເພື່ອຄວາມຕື່ນເຕັ້ນ.</p>
        </div>

        {!isCreated ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-2">ຂໍ້ຄວາມລັບ</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ຂຽນຂໍ້ຄວາມລັບຈາກຫົວໃຈຢູ່ນີ້..."
                rows={5}
                className="w-full bg-white/10 border border-white/20 p-5 rounded-3xl focus:ring-2 focus:ring-amber-300 outline-none resize-none text-lg leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-2">ລະຫັດລັບ (ຖ້າມີ)</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ລະຫັດຜ່ານ"
                  className="w-full bg-white/10 border border-white/20 py-4 pl-12 pr-5 rounded-3xl outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
              <p className="text-xs text-white/40 ml-2">ປະໄວ້ວ່າງຖ້າຕ້ອງການໃຫ້ເປັນລິ້ງສາທາລະນະ.</p>
            </div>

            <button
              onClick={createSurprise}
              disabled={!message}
              className="w-full py-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl font-bold text-xl shadow-xl hover:shadow-amber-500/20 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Globe size={20} /> <span>ເຜີຍແຜ່ຄວາມລັບຂອງຂ້ອຍ</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in zoom-in duration-500 text-center">
            <div className="py-6 space-y-4">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                <Sparkles size={32} />
              </div>
              <h3 className="text-2xl font-bold">ຄວາມລັບຖືກລັອກແລ້ວ!</h3>
              <p className="text-white/60 px-10">ຄູ່ຮັກຂອງທ່ານສາມາດເຫັນຂໍ້ຄວາມນີ້ຜ່ານລິ້ງລຸ່ມນີ້ເທົ່ານັ້ນ.</p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between group">
              <span className="text-pink-200 font-mono truncate mr-4">{surpriseUrl}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(surpriseUrl);
                  alert('ຄັດລອກລິ້ງແລ້ວ!');
                }}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Copy size={18} />
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="w-full py-4 bg-white text-pink-600 font-bold rounded-2xl shadow-lg flex items-center justify-center space-x-2"
              >
                <Share2 size={20} /> <span>ແບ່ງປັນໂດຍກົງ</span>
              </button>
              <button 
                onClick={() => setIsCreated(false)}
                className="w-full py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all"
              >
                ສ້າງອັນໃໝ່
              </button>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-center space-x-4 opacity-40">
                <Heart size={20} />
                <span className="text-xs uppercase tracking-widest font-bold">ປົກປ້ອງດ້ວຍຄວາມຮັກ</span>
                <Heart size={20} />
              </div>
            </div>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="ມີເຊີໄພຣສ໌ໃຫ້ເຈົ້າ!"
        text="ຂ້ອຍມີຂໍ້ຄວາມລັບໃຫ້ເຈົ້າເບິ່ງຢູ່ LoveVerse."
        url={surpriseUrl}
      />
    </div>
  );
};

export default SurpriseCreator;
