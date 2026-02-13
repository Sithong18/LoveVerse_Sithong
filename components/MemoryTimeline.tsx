
import React, { useState } from 'react';
import { Camera, Plus, Calendar, Trash2, Heart, Download } from 'lucide-react';
import { Memory } from '../types';

const MemoryTimeline: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([
    { id: '1', title: 'ວັນທີ່ເຮົາພົບກັນ', description: 'ທຸກຢ່າງຮູ້ສຶກຄືກັບມົນສະກົດພາຍໃຕ້ດອກຊາກຸລະ.', date: '2023-04-12' },
    { id: '2', title: 'ເຂົ້າແລງຄັ້ງທຳອິດ', description: 'ເຂົ້າປຽກ ແລະ ສຽງຫົວທີ່ມ່ວນຊື່ນ.', date: '2023-04-20' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDate, setNewDate] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const addMemory = () => {
    if (!newTitle || !newDate) return;
    const memory: Memory = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      date: newDate,
    };
    setMemories([...memories, memory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setNewTitle('');
    setNewDesc('');
    setNewDate('');
    setShowAddForm(false);
  };

  const removeMemory = (id: string) => {
    setMemories(memories.filter(m => m.id !== id));
  };

  const downloadTimeline = () => {
    if (memories.length === 0) return;
    let content = "ເລື່ອງລາວຄວາມຮັກຂອງພວກເຮົາ (Our Love Story)\n";
    content += "========================================\n\n";
    
    memories.forEach((m, idx) => {
      content += `${idx + 1}. ${m.title} (${m.date})\n`;
      content += `   ${m.description}\n\n`;
    });
    
    content += "\nສ້າງຂຶ້ນດ້ວຍຄວາມຮັກທີ່ LoveVerse.com";
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OurLoveStory.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-romantic font-bold">ເລື່ອງລາວຄວາມຮັກຂອງພວກເຮົາ</h2>
        <div className="flex space-x-3">
          <button 
            onClick={downloadTimeline}
            className="bg-white/20 text-white p-4 rounded-full shadow-lg hover:bg-white/30 transition-all flex items-center justify-center"
            title="ດາວໂຫລດເລື່ອງລາວ"
          >
            <Download size={24} />
          </button>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-white text-pink-500 p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center space-x-2"
          >
            {showAddForm ? <Trash2 size={24} className="text-rose-500" /> : <Plus size={24} />}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="glass p-8 rounded-[30px] mb-12 animate-in slide-in-from-top duration-300">
          <h3 className="text-xl font-bold mb-4">ເພີ່ມຄວາມຊົງຈຳໃໝ່</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              placeholder="ເກີດຫຍັງຂຶ້ນ?" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-white/10 border border-white/20 p-4 rounded-2xl w-full"
            />
            <input 
              type="date" 
              value={newDate} 
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-white/10 border border-white/20 p-4 rounded-2xl w-full"
            />
            <textarea 
              placeholder="ເລົ່າເລື່ອງລາວ..." 
              value={newDesc} 
              onChange={(e) => setNewDesc(e.target.value)}
              className="bg-white/10 border border-white/20 p-4 rounded-2xl w-full md:col-span-2 h-24"
            />
          </div>
          <button 
            onClick={addMemory}
            className="mt-4 w-full py-4 bg-pink-500 rounded-2xl font-bold shadow-lg"
          >
            ບັນທຶກຄວາມຊົງຈຳ
          </button>
        </div>
      )}

      <div className="relative space-y-12 before:absolute before:inset-0 before:left-1/2 before:-ml-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-pink-300 before:via-white/40 before:to-transparent">
        {memories.length === 0 ? (
          <div className="text-center py-20 opacity-50">ຍັງບໍ່ມີຄວາມຊົງຈຳເທື່ອ. ເລີ່ມຂຽນເລື່ອງລາວຂອງທ່ານເລີຍ!</div>
        ) : (
          memories.map((m, i) => (
            <div key={m.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-pink-500 shadow-xl absolute left-1/2 -translate-x-1/2 z-10 group-hover:scale-125 transition-transform">
                <Heart size={16} fill="white" />
              </div>

              <div className="w-[calc(50%-2.5rem)] glass p-6 rounded-[32px] hover:bg-white/30 transition-all border border-white/20 shadow-lg cursor-default">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold">{m.title}</h4>
                  <button onClick={() => removeMemory(m.id)} className="text-white/30 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center text-sm text-pink-200 mb-3">
                  <Calendar size={14} className="mr-1" /> {new Date(m.date).toLocaleDateString('lo-LA', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <p className="text-white/80 line-clamp-3 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemoryTimeline;
