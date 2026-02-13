
import React from 'react';
import { View } from '../types';
import { Calculator, Mail, Camera, Calendar, Gift, QrCode, ArrowRight } from 'lucide-react';

interface Props {
  onNavigate: (view: View) => void;
}

const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  const features = [
    { title: "ຄິດໄລ່ຄວາມຮັກ", desc: "ທົດສອບຄວາມເຂົ້າກັນໄດ້ຂອງດວງຊະຕາດ້ວຍອັນກໍຣິທຶມ.", icon: Calculator, color: "bg-pink-400", view: View.CALCULATOR },
    { title: "ສ້າງຈົດໝາຍຮັກ", desc: "ຂຽນຈົດໝາຍຮັກດ້ວຍ AI ສຳລັບຄົນພິເສດຂອງທ່ານ.", icon: Mail, color: "bg-purple-500", view: View.GENERATOR },
    { title: "ທາມລາຍຄວາມຊົງຈຳ", desc: "ສ້າງສະໝຸດບັນທຶກດິຈິຕອນຂອງຊ່ວງເວລາທີ່ດີທີ່ສຸດ.", icon: Camera, color: "bg-rose-400", view: View.TIMELINE },
    { title: "ນັບຖອຍຫຼັງຄວາມຮັກ", desc: "ລໍຖ້າວັນຄົບຮອບ ຫຼື ວັນແຕ່ງງານຄັ້ງຕໍ່ໄປຂອງທ່ານ.", icon: Calendar, color: "bg-indigo-400", view: View.COUNTDOWN },
    { title: "ໜ້າເຊີໄພຣສ໌", desc: "ສ້າງຂໍ້ຄວາມລັບທີ່ປ້ອງກັນດ້ວຍລະຫັດຜ່ານ.", icon: Gift, color: "bg-amber-400", view: View.SURPRISE },
    { title: "QR ໂຄ້ດແຫ່ງຮັກ", desc: "ເຊື່ອງຂໍ້ຄວາມຮັກຂອງທ່ານໄວ້ໃນ QR ໂຄ້ດ.", icon: QrCode, color: "bg-emerald-400", view: View.QR },
  ];

  return (
    <div className="py-10 space-y-20">
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-romantic font-bold text-white drop-shadow-lg leading-tight">
          ຂຽນເລື່ອງລາວຄວາມຮັກຂອງທ່ານ
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-light tracking-wide max-w-2xl mx-auto">
          ຍິນດີຕ້ອນຮັບສູ່ LoveVerse, ຈັກກະວານດິຈິຕອນທີ່ອອກແບບມາເພື່ອສະເຫຼີມສະຫຼອງ ແລະ ຮັກສາການເດີນທາງແຫ່ງຄວາມຮັກຂອງທ່ານ.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
          <button 
            onClick={() => onNavigate(View.CALCULATOR)}
            className="px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:scale-105 transition-transform flex items-center shadow-xl"
          >
            ເລີ່ມຕົ້ນການເດີນທາງ <ArrowRight className="ml-2" size={20} />
          </button>
          <button className="px-8 py-4 bg-white/20 border border-white/40 text-white font-bold rounded-full hover:bg-white/30 transition-all">
            ເຂົ້າຮ່ວມກັບ 5,000+ ຄູ່ຮັກ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "ຈົດໝາຍທີ່ຂຽນແລ້ວ", val: "125k+" },
          { label: "ຄູ່ທີ່ສົມຫວັງ", val: "89%" },
          { label: "ຄວາມຊົງຈຳທີ່ບັນທຶກ", val: "2M+" },
          { label: "ເຊີໄພຣສ໌ທີ່ສົ່ງແລ້ວ", val: "45k" },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl text-center">
            <div className="text-3xl font-bold">{stat.val}</div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div 
            key={i} 
            onClick={() => onNavigate(f.view)}
            className="group glass p-8 rounded-[40px] hover:bg-white/30 transition-all cursor-pointer border border-white/20 shadow-xl flex flex-col items-center text-center space-y-4"
          >
            <div className={`${f.color} p-5 rounded-2xl group-hover:rotate-12 transition-transform shadow-lg`}>
              <f.icon size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold">{f.title}</h3>
            <p className="text-white/70 leading-relaxed">{f.desc}</p>
            <div className="pt-2 text-white font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              ສຳຫຼວດຟີເຈີ <ArrowRight size={16} className="ml-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-20 px-6 glass rounded-[60px] border border-white/30">
        <span className="text-pink-200 text-6xl opacity-50 font-serif leading-none">“</span>
        <blockquote className="text-3xl md:text-4xl italic font-romantic mb-6">
          "ຄວາມຮັກແມ່ນພາສາດຽວທີ່ຂ້າມຜ່ານທຸກຂອບເຂດ, ທຸກລະຫັດ, ແລະ ທຸກຫົວໃຈ."
        </blockquote>
        <p className="text-white/60 uppercase tracking-[0.3em] font-bold text-sm">ສ້າງຕັ້ງຂຶ້ນດ້ວຍຄວາມຮັກ, ສ້າງມາເພື່ອທ່ານ</p>
      </div>
    </div>
  );
};

export default LandingPage;
