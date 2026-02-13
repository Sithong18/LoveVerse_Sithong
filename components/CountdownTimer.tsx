
import React, { useState, useEffect } from 'react';
import { Trophy, Heart } from 'lucide-react';

const CountdownTimer: React.FC = () => {
  const [targetDate, setTargetDate] = useState('2025-02-14T00:00:00');
  const [eventTitle, setEventTitle] = useState('ວັນວາເລນທາຍ');
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="glass p-4 md:p-8 rounded-3xl flex flex-col items-center justify-center min-w-[80px] md:min-w-[120px] shadow-2xl border border-white/30">
      <span className="text-3xl md:text-6xl font-bold font-mono tracking-tighter">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-white/60 font-bold mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-romantic font-bold">ການນັບຖອຍຫຼັງທີ່ຍິ່ງໃຫຍ່</h2>
        <p className="text-white/70 italic">ທຸກໆວິນາທີທີ່ໃກ້ເຈົ້າ ແມ່ນວິນາທີທີ່ມີຄວາມໝາຍທີ່ສຸດ.</p>
      </div>

      <div className="flex justify-center items-center space-x-2 md:space-x-6">
        <TimeUnit value={timeLeft.days} label="ວັນ" />
        <span className="text-4xl opacity-50 mb-8">:</span>
        <TimeUnit value={timeLeft.hours} label="ຊົ່ວໂມງ" />
        <span className="text-4xl opacity-50 mb-8">:</span>
        <TimeUnit value={timeLeft.minutes} label="ນາທີ" />
        <span className="text-4xl opacity-50 mb-8">:</span>
        <TimeUnit value={timeLeft.seconds} label="ວິນາທີ" />
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-pink-100 flex items-center justify-center space-x-2">
          <Trophy size={24} className="text-amber-400" />
          <span>ຈົນກວ່າຈະຮອດ {eventTitle}</span>
        </h3>
      </div>

      <div className="glass p-8 rounded-[40px] max-w-lg mx-auto space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-white/60 ml-2">ພວກເຮົາກຳລັງລໍຖ້າຫຍັງ?</label>
          <input 
            type="text" 
            value={eventTitle} 
            onChange={(e) => setEventTitle(e.target.value)}
            className="bg-white/10 border border-white/20 p-4 rounded-2xl"
            placeholder="ວັນຄົບຮອບ, ວັນເກີດ..."
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-white/60 ml-2">ເລືອກຊ່ວງເວລາ</label>
          <input 
            type="datetime-local" 
            value={targetDate.split('.')[0]} 
            onChange={(e) => setTargetDate(e.target.value)}
            className="bg-white/10 border border-white/20 p-4 rounded-2xl"
          />
        </div>
      </div>
      
      <div className="flex justify-center opacity-20">
        <Heart size={120} strokeWidth={0.5} />
      </div>
    </div>
  );
};

export default CountdownTimer;
