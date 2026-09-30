import React, { useState } from 'react';
import { 
  BespokeOrder, 
  TailorTask, 
  ChatMessage, 
  OrderStage 
} from '../../types';
import { 
  Scissors, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Send, 
  Ruler, 
  MessageSquare, 
  FileText, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronRight
} from 'lucide-react';

interface EmployeeWorkspaceProps {
  orders: BespokeOrder[];
  onUpdateOrderStage: (orderId: string, newStage: OrderStage, progress: number) => void;
  onAddFittingNote: (orderId: string, note: string) => void;
  tasks: TailorTask[];
  onUpdateTaskStage: (taskId: string, stage: TailorTask['stage'], progress: number) => void;
  onAddTask: (task: Omit<TailorTask, 'id'>) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
}

export const EmployeeWorkspace: React.FC<EmployeeWorkspaceProps> = ({
  orders,
  onUpdateOrderStage,
  onAddFittingNote,
  tasks,
  onUpdateTaskStage,
  onAddTask,
  chatMessages,
  onSendMessage,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || 'GTS-8492');
  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  // Internal chat channels
  const [activeChannel, setActiveChannel] = useState<'internal-staff' | 'cutting-room'>('internal-staff');
  const [chatInput, setChatInput] = useState('');

  // Add note state
  const [newNote, setNewNote] = useState('');
  const [noteSuccess, setNoteSuccess] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStage, setNewTaskStage] = useState<TailorTask['stage']>('Drafting');
  const [newTaskPriority, setNewTaskPriority] = useState<TailorTask['priority']>('High');
  const [showTaskModal, setShowTaskModal] = useState(false);

  const stages: OrderStage[] = [
    'Consultation & Measurement',
    'Pattern Drafting',
    'Fabric Cutting & Canvas Prep',
    'Skeleton Basting Fitting',
    'Fine Stitching & Detailing',
    'Final Press & Quality QC',
    'Ready for Delivery / Fitting Completed',
  ];

  const handleStageSelect = (stage: OrderStage, idx: number) => {
    const progress = Math.min(100, Math.round(((idx + 1) / stages.length) * 100));
    onUpdateOrderStage(activeOrder.id, stage, progress);
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    onAddFittingNote(activeOrder.id, `[${new Date().toLocaleDateString()}] ${newNote.trim()}`);
    setNewNote('');
    setNoteSuccess(true);
    setTimeout(() => setNoteSuccess(false), 2000);
  };

  const handleSendTeamChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    onSendMessage({
      sender: 'Master Ananthan (Senior Cutter)',
      role: 'tailor',
      channel: activeChannel,
      text: chatInput,
      orderIdRef: activeOrder.id,
    });
    setChatInput('');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      orderId: activeOrder.id,
      title: newTaskTitle.trim(),
      stage: newTaskStage,
      assigneeName: 'Master Ananthan',
      deadline: 'Tomorrow, 5:00 PM',
      priority: newTaskPriority,
      notes: `Assigned for ${activeOrder.clientName}`,
      progressPercent: 10,
    });

    setNewTaskTitle('');
    setShowTaskModal(false);
  };

  const channelMessages = chatMessages.filter(m => m.channel === activeChannel);

  return (
    <div className="space-y-8 animate-fade-in text-white">
      
      {/* Top Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#101b33] to-slate-900 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
              Artisan & Cutter Workspace
            </span>
            <span className="text-xs text-slate-400">Signed In As:</span>
            <span className="text-sm font-bold text-white font-serif-luxury">Master Ananthan (Senior Cutter)</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-luxury text-amber-200 mt-1">
            Pattern Drafting, Cutting & Stage Dispatch
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Real-time stage transitions synchronize directly with client tracker & CRM.
          </p>
        </div>

        {/* Order Selector */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800 flex items-center space-x-2 text-xs w-full md:w-auto">
            <span className="text-slate-400 whitespace-nowrap pl-1">Working Order:</span>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="bg-slate-900 text-amber-300 font-mono font-bold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} - {o.clientName} ({o.currentStage})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Order Workflow & Stage Advancement Console */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold font-mono text-amber-300">{activeOrder.id}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeOrder.priority}
              </span>
              <span className="text-xs text-slate-400">• Client: {activeOrder.clientName}</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1 font-serif-luxury">
              {activeOrder.garmentType}
            </h3>
            <p className="text-xs text-slate-300">
              Fabric Selected: <strong className="text-slate-200">{activeOrder.fabricChoice}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Milestone Status</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono">
              {activeOrder.stageProgressPercent}% Completed
            </span>
          </div>
        </div>

        {/* Interactive Stage Advancer */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            Click to Advance Atelier Production Stage:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {stages.map((st, idx) => {
              const isCurrent = activeOrder.currentStage === st;
              const isPassed = stages.indexOf(activeOrder.currentStage) > idx;

              return (
                <button
                  key={st}
                  onClick={() => handleStageSelect(st, idx)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-start space-x-2.5 ${
                    isCurrent
                      ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20'
                      : isPassed
                      ? 'bg-slate-950/70 border-emerald-500/40 text-slate-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5">
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <Scissors className="w-4 h-4 text-amber-400 animate-pulse" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600 font-mono">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs font-semibold block ${isCurrent ? 'text-amber-200 font-bold' : ''}`}>
                      {st}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {isPassed ? 'Completed' : isCurrent ? 'Active Work' : 'Upcoming'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid: 36-Point Specs + Daily Tasks + Internal Team Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Client Measurements & Add Note */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Ruler className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold font-serif-luxury text-amber-200">
                Cutting Table Measurements
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">36-PT SPEC</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Chest</span>
              <span className="text-sm font-bold text-white block">{activeOrder.measurementsSummary.chest}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Waist</span>
              <span className="text-sm font-bold text-white block">{activeOrder.measurementsSummary.waist}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Shoulders</span>
              <span className="text-sm font-bold text-white block">{activeOrder.measurementsSummary.shoulder}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase">Sleeve</span>
              <span className="text-sm font-bold text-white block">{activeOrder.measurementsSummary.sleeve}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-amber-300 font-semibold block mb-1">Posture Correction Directive:</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {activeOrder.measurementsSummary.postureCorrection}
            </p>
          </div>

          {/* Append fitting note */}
          <form onSubmit={handleAddNoteSubmit} className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-semibold text-slate-300 block">
              Log Chalk Note or Fitting Modification:
            </label>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="e.g. Added 3mm lapel roll padding..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all border border-slate-700"
            >
              Append Note
            </button>
            {noteSuccess && (
              <span className="text-[11px] text-emerald-400 block text-center">Note appended successfully!</span>
            )}
          </form>
        </div>

        {/* Tailor Daily Tasks List */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Scissors className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold font-serif-luxury text-amber-200">
                Active Craft Tasks
              </h3>
            </div>
            <button
              onClick={() => setShowTaskModal(true)}
              className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
              title="Add task"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-white leading-tight">{task.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    task.priority === 'Critical' ? 'bg-red-950/80 text-red-300 border border-red-500/30' :
                    task.priority === 'High' ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {task.priority}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Order: <strong className="text-amber-300">{task.orderId}</strong></span>
                  <span>Due: {task.deadline}</span>
                </div>

                {/* Progress bar for task */}
                <div className="w-full bg-slate-900 rounded-full h-1.5">
                  <div
                    className="bg-amber-500 h-1.5 rounded-full"
                    style={{ width: `${task.progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500">Stage: {task.stage}</span>
                  <button
                    onClick={() => {
                      const nextProgress = Math.min(100, task.progressPercent + 25);
                      const nextStage = nextProgress >= 100 ? 'Completed' : task.stage;
                      onUpdateTaskStage(task.id, nextStage, nextProgress);
                    }}
                    className="text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center"
                  >
                    <span>Advance ({task.progressPercent}%)</span>
                    <ChevronRight className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Internal Communication Channels */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold font-serif-luxury text-amber-200">
                  Staff Communication Hub
                </h3>
              </div>
            </div>

            {/* Channel Switcher */}
            <div className="flex space-x-1.5 mt-3 mb-3 text-xs">
              <button
                onClick={() => setActiveChannel('internal-staff')}
                className={`flex-1 py-1.5 rounded-lg border text-center font-medium transition-all ${
                  activeChannel === 'internal-staff'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                #atelier-main
              </button>
              <button
                onClick={() => setActiveChannel('cutting-room')}
                className={`flex-1 py-1.5 rounded-lg border text-center font-medium transition-all ${
                  activeChannel === 'cutting-room'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                #cutting-room
              </button>
            </div>

            {/* Chat Box */}
            <div className="h-60 overflow-y-auto space-y-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-800">
              {channelMessages.map((msg) => (
                <div key={msg.id} className="space-y-0.5 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-300">{msg.sender}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendTeamChat} className="flex gap-2 pt-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Message #${activeChannel}...`}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

      {/* Task Creation Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#090f20] border border-amber-500/40 p-6 text-white space-y-4">
            <h3 className="text-base font-bold font-serif-luxury text-amber-200">
              Create New Tailoring Task
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Task Title / Specification</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Hand-stitch milanaise lapel buttonhole"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Stage</label>
                  <select
                    value={newTaskStage}
                    onChange={(e) => setNewTaskStage(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  >
                    <option value="Drafting">Drafting</option>
                    <option value="Cutting">Cutting</option>
                    <option value="Basting">Basting</option>
                    <option value="Stitching">Stitching</option>
                    <option value="QC_Press">QC & Press</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
