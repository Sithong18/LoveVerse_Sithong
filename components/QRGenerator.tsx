
import React, { useState } from 'react';
import { QrCode, Download, Link, Info, Share2 } from 'lucide-react';
import ShareModal from './ShareModal';

const QRGenerator: React.FC = () => {
  const [text, setText] = useState('https://loveverse.com');
  const [color, setColor] = useState('#FF4E88');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&color=${color.substring(1)}&bgcolor=FFFFFF`;

  const downloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `LoveVerse_QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      window.open(qrUrl, '_blank');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="glass p-10 rounded-[40px] space-y-8 border border-white/30 text-center">
        <div className="space-y-2">
          <div className="inline-block p-4 bg-emerald-500 rounded-full shadow-xl mb-2">
            <QrCode size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-romantic font-bold">QR ໂຄ້ດແຫ່ງຮັກ</h2>
          <p className="text-white/70 italic">ເຊື່ອງຄວາມລັບຂອງທ່ານໄວ້ໃນສາຍຕາ.</p>
        </div>

        <div className="flex justify-center bg-white p-6 rounded-[40px] shadow-inner shadow-black/10 mx-auto w-fit">
          <img 
            src={qrUrl} 
            alt="QR Code" 
            className="w-48 h-48 md:w-64 md:h-64 rounded-xl border-4 border-white"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-1 text-left">
            <label className="text-xs uppercase tracking-widest font-bold text-white/50 ml-4 flex items-center">
              <Link size={12} className="mr-1" /> ລິ້ງປາຍທາງ
            </label>
            <input 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl focus:ring-2 focus:ring-emerald-400 outline-none"
              placeholder="ວາງລິ້ງ ຫຼື ຂໍ້ຄວາມ..."
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1 space-y-1 text-left">
              <label className="text-xs uppercase tracking-widest font-bold text-white/50 ml-4 flex items-center">
                <Info size={12} className="mr-1" /> ສີຂອງ QR
              </label>
              <div className="flex space-x-2 px-2">
                {['#FF4E88', '#9C27B0', '#FFD1DC', '#4ADE80', '#FB923C'].map((c) => (
                  <button 
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-transform ${color === c ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-60'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            
            <button 
              onClick={downloadQR}
              className="mt-4 p-5 bg-emerald-500 rounded-3xl shadow-xl hover:scale-105 transition-transform"
              title="ດາວໂຫລດ"
            >
              <Download className="text-white" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="w-full py-4 bg-white/10 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 hover:bg-white/20"
          >
            <Share2 size={18} /> <span>ສົ່ງໃຫ້ຄູ່ຮັກ</span>
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="QR ໂຄ້ດແຫ່ງຮັກ"
        text="ສະແກນ QR ໂຄ້ດນີ້ເພື່ອເບິ່ງຂໍ້ຄວາມຮັກ!"
        url={text}
      />
    </div>
  );
};

export default QRGenerator;
