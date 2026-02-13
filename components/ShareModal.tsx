
import React from 'react';
import { X, Copy, Facebook, MessageCircle, Send, Link as LinkIcon, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, text, url }) => {
  if (!isOpen) return null;

  const encodedText = encodeURIComponent(`${title}\n\n${text}`);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366]',
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#0088cc]',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: 'Line',
      icon: MessageCircle,
      color: 'bg-[#00C300]',
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${title}\n${text}\n${url}`);
    alert('ຄັດລອກໄປທີ່ຄລິບບອດແລ້ວ!');
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log('User cancelled native share');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="glass w-full max-w-md p-8 rounded-[40px] border border-white/30 relative animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="bg-pink-500 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl rotate-3">
            <Share2 size={32} />
          </div>
          <h2 className="text-2xl font-bold font-romantic">ແບ່ງປັນຄວາມຮັກ</h2>
          <p className="text-white/60 text-sm mt-1">ເລືອກຊ່ອງທາງທີ່ທ່ານຕ້ອງການສົ່ງຕໍ່</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform shadow-lg`}
            >
              <link.icon size={24} />
              <span className="text-xs font-bold uppercase tracking-widest">{link.name}</span>
            </a>
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={copyToClipboard}
            className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center space-x-2 hover:bg-white/20 transition-all"
          >
            <Copy size={20} />
            <span className="font-bold">ຄັດລອກລິ້ງ</span>
          </button>
          
          {navigator.share && (
            <button
              onClick={nativeShare}
              className="w-full py-4 bg-white text-pink-600 rounded-2xl flex items-center justify-center space-x-2 hover:scale-[1.02] transition-all font-bold shadow-lg"
            >
              <Share2 size={20} />
              <span>ແບ່ງປັນຜ່ານລະບົບເຄື່ອງ</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
