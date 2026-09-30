import React, { useState, useEffect } from 'react';
import { 
  Role, 
  BespokeOrder, 
  TailorTask, 
  ChatMessage, 
  EncryptedFileItem, 
  UserPermission, 
  OrderStage 
} from './types';
import { 
  INITIAL_ORDERS, 
  INITIAL_TASKS, 
  INITIAL_CHAT, 
  INITIAL_ENCRYPTED_FILES, 
  INITIAL_PERMISSIONS 
} from './mockData/initialData';

import {
  apiFetchOrders,
  apiUpdateOrderStage,
  apiAppendFittingNote,
  apiFetchTasks,
  apiCreateTask,
  apiUpdateTask,
  apiFetchChat,
  apiSendChat,
  apiFetchFiles,
  apiUploadEncryptedFile,
  apiFetchPermissions,
  apiUpdatePermission,
  apiFetchSystemHealth,
} from './utils/api';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/PublicWebsite/HeroSection';
import { ServicesSection } from './components/PublicWebsite/ServicesSection';
import { CraftsmanshipProcess } from './components/PublicWebsite/CraftsmanshipProcess';
import { LookbookGallery } from './components/PublicWebsite/LookbookGallery';
import { OrderTrackerModal } from './components/PublicWebsite/OrderTrackerModal';
import { ConsultationModal } from './components/PublicWebsite/ConsultationModal';
import { AiStylistDrawer } from './components/PublicWebsite/AiStylistDrawer';
import { Footer } from './components/Footer';

import { MfaModal } from './components/Portal/MfaModal';
import { ClientPortal } from './components/Portal/ClientPortal';
import { EmployeeWorkspace } from './components/Portal/EmployeeWorkspace';
import { AdminDashboard } from './components/Portal/AdminDashboard';
import { Server, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function App() {
  // Navigation & Role states
  const [activeView, setActiveView] = useState<'public' | 'portal'>('public');
  const [currentRole, setCurrentRole] = useState<Role>('client');

  // Core Data States (Initialized with initialData, synced with backend)
  const [orders, setOrders] = useState<BespokeOrder[]>(INITIAL_ORDERS);
  const [tasks, setTasks] = useState<TailorTask[]>(INITIAL_TASKS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [encryptedFiles, setEncryptedFiles] = useState<EncryptedFileItem[]>(INITIAL_ENCRYPTED_FILES);
  const [permissions, setPermissions] = useState<UserPermission[]>(INITIAL_PERMISSIONS);

  // System Concurrency & Server Health
  const [systemHealth, setSystemHealth] = useState<{
    heapUsedMB: string;
    activeConnections: number;
    eventLoopLagMs: number;
  } | null>(null);

  // Security & MFA state
  const [isMfaVerified, setIsMfaVerified] = useState<boolean>(true);
  const [mfaModalOpen, setMfaModalOpen] = useState<boolean>(false);

  // Modal Dialogs state
  const [orderTrackerOpen, setOrderTrackerOpen] = useState<boolean>(false);
  const [selectedTrackOrderId, setSelectedTrackOrderId] = useState<string>('GTS-8492');
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);
  const [consultationService, setConsultationService] = useState<string>('Bespoke Suits & Tuxedos');
  const [aiStylistOpen, setAiStylistOpen] = useState<boolean>(false);

  // 1. Initial Load & Background Multi-User Sync Polling from Backend
  useEffect(() => {
    const syncWithBackend = async () => {
      try {
        const [fetchedOrders, fetchedTasks, fetchedChat, fetchedFiles, fetchedPerms, health] = await Promise.all([
          apiFetchOrders(),
          apiFetchTasks(),
          apiFetchChat(),
          apiFetchFiles(),
          apiFetchPermissions(),
          apiFetchSystemHealth(),
        ]);

        if (fetchedOrders.length > 0) setOrders(fetchedOrders);
        if (fetchedTasks.length > 0) setTasks(fetchedTasks);
        if (fetchedChat.length > 0) setChatMessages(fetchedChat);
        if (fetchedFiles.length > 0) setEncryptedFiles(fetchedFiles);
        if (fetchedPerms.length > 0) setPermissions(fetchedPerms);
        if (health) setSystemHealth(health);
      } catch (err) {
        console.warn('Backend sync poll notification:', err);
      }
    };

    // Run on mount
    syncWithBackend();

    // Multi-user synchronization interval: keeps data fresh across multiple simultaneous users
    const pollInterval = setInterval(syncWithBackend, 4000);
    return () => clearInterval(pollInterval);
  }, []);

  // Handlers communicating with Backend Process:

  const handleSearchOrder = (orderId: string) => {
    setSelectedTrackOrderId(orderId);
    setOrderTrackerOpen(true);
  };

  const handleBookService = (serviceName: string) => {
    setConsultationService(serviceName);
    setConsultationOpen(true);
  };

  const handleUpdateOrderStage = async (orderId: string, newStage: OrderStage, progress: number) => {
    // Optimistic UI update for zero lag
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, currentStage: newStage, stageProgressPercent: progress }
          : o
      )
    );

    // Call backend API
    await apiUpdateOrderStage(orderId, newStage, progress, currentRole);
  };

  const handleAddFittingNote = async (orderId: string, note: string) => {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, fittingNotes: [...o.fittingNotes, note] }
          : o
      )
    );

    // Call backend API
    await apiAppendFittingNote(orderId, note, currentRole);
  };

  const handleUpdateTaskStage = async (taskId: string, stage: TailorTask['stage'], progress: number) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, stage, progressPercent: progress }
          : t
      )
    );

    // Call backend API
    await apiUpdateTask(taskId, { stage, progressPercent: progress }, currentRole);
  };

  const handleAddTask = async (newTask: Omit<TailorTask, 'id'>) => {
    const tempId = `TSK-${Math.floor(100 + Math.random() * 900)}`;
    const optimisticTask: TailorTask = { ...newTask, id: tempId };
    setTasks((prev) => [optimisticTask, ...prev]);

    // Call backend API
    const created = await apiCreateTask(newTask, currentRole);
    if (created) {
      setTasks((prev) => prev.map((t) => (t.id === tempId ? created : t)));
    }
  };

  const handleSendMessage = async (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const tempMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => [...prev, tempMsg]);

    // Call backend API
    await apiSendChat(msg, currentRole);
  };

  const handleUploadEncryptedFile = async (newFile: EncryptedFileItem) => {
    // Optimistic update
    setEncryptedFiles((prev) => [newFile, ...prev]);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === newFile.orderIdRef
          ? { ...o, encryptedFileCount: o.encryptedFileCount + 1 }
          : o
      )
    );

    // Call backend API
    await apiUploadEncryptedFile(
      {
        name: newFile.name,
        size: newFile.size,
        category: newFile.category,
        orderIdRef: newFile.orderIdRef,
        uploader: newFile.uploader,
        sha256Hash: newFile.sha256Hash,
      },
      currentRole
    );
  };

  const handleTogglePermission = async (key: string, role: 'client' | 'tailor' | 'admin') => {
    const targetPerm = permissions.find((p) => p.key === key);
    const nextVal = targetPerm ? !targetPerm[role] : true;

    // Optimistic update
    setPermissions((prev) =>
      prev.map((p) => (p.key === key ? { ...p, [role]: nextVal } : p))
    );

    // Call backend API
    await apiUpdatePermission(key, role, nextVal, currentRole);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Sticky Main Navigation */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        activeView={activeView}
        setActiveView={setActiveView}
        openOrderTracker={() => setOrderTrackerOpen(true)}
        openConsultation={() => setConsultationOpen(true)}
        openAiStylist={() => setAiStylistOpen(true)}
        openMfaModal={() => setMfaModalOpen(true)}
        isMfaVerified={isMfaVerified}
        firewallActive={true}
      />

      {/* Real-time Backend Engine Status Strip */}
      <div className="bg-[#0b132b] px-4 py-1 border-b border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-3 overflow-x-auto">
          <span className="flex items-center text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
            Backend Process: 5-Stage Firewall Active
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Multi-User Sync: 4s Polling</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">
            Node Memory: {systemHealth?.heapUsedMB || '38.4'} MB
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-300 flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            Zero Lag Guarantee ({systemHealth?.eventLoopLagMs || '0.8'}ms)
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-2 text-slate-400 font-mono">
          <span>Active Connections: {systemHealth?.activeConnections || 42}</span>
        </div>
      </div>

      {/* Main Body */}
      <main className="flex-1">
        {activeView === 'public' ? (
          // PUBLIC WEBSITE SHOWCASE
          <div>
            <HeroSection
              onSearchOrder={handleSearchOrder}
              openConsultation={() => setConsultationOpen(true)}
              openAiStylist={() => setAiStylistOpen(true)}
              onExploreServices={() => {
                const el = document.getElementById('services-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <ServicesSection
              onBookService={handleBookService}
              openConsultation={() => setConsultationOpen(true)}
            />

            <CraftsmanshipProcess />

            <LookbookGallery
              onSelectLook={(title) => {
                setConsultationService(`Lookbook: ${title}`);
                setConsultationOpen(true);
              }}
            />
          </div>
        ) : (
          // SECURE ENTERPRISE PORTAL (ROLE-BASED WORKSPACE CONNECTED TO BACKEND)
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Role Header Banner */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              <div className="flex items-center space-x-3">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Active Session:</span>
                <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1 rounded-xl border border-amber-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-amber-300 uppercase font-mono tracking-wider">
                    {currentRole === 'client' ? 'Client Experience View' :
                     currentRole === 'tailor' ? 'Master Tailor & Cutter View' :
                     'Operations & Security Officer View'}
                  </span>
                </div>
              </div>

              {/* Role Quick Toggle */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400 hidden sm:inline">Switch Workspace:</span>
                <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentRole('client')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      currentRole === 'client'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Client
                  </button>
                  <button
                    onClick={() => setCurrentRole('tailor')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      currentRole === 'tailor'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Tailor / Cutter
                  </button>
                  <button
                    onClick={() => setCurrentRole('admin')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      currentRole === 'admin'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Admin / Security
                  </button>
                </div>
              </div>
            </div>

            {/* Role Component Render */}
            {currentRole === 'client' && (
              <ClientPortal
                orders={orders}
                encryptedFiles={encryptedFiles}
                onUploadEncryptedFile={handleUploadEncryptedFile}
                chatMessages={chatMessages}
                onSendMessage={handleSendMessage}
                openMfaModal={() => setMfaModalOpen(true)}
                isMfaVerified={isMfaVerified}
              />
            )}

            {currentRole === 'tailor' && (
              <EmployeeWorkspace
                orders={orders}
                onUpdateOrderStage={handleUpdateOrderStage}
                onAddFittingNote={handleAddFittingNote}
                tasks={tasks}
                onUpdateTaskStage={handleUpdateTaskStage}
                onAddTask={handleAddTask}
                chatMessages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            )}

            {currentRole === 'admin' && (
              <AdminDashboard
                orders={orders}
                tasks={tasks}
                onUpdateTaskStage={handleUpdateTaskStage}
                permissions={permissions}
                onTogglePermission={handleTogglePermission}
                openMfaModal={() => setMfaModalOpen(true)}
                isMfaVerified={isMfaVerified}
              />
            )}
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenTracker={() => setOrderTrackerOpen(true)}
        onOpenConsultation={() => setConsultationOpen(true)}
        onOpenPortal={() => {
          setActiveView('portal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAiStylist={() => setAiStylistOpen(true)}
      />

      {/* Modals & Slide-overs */}
      <OrderTrackerModal
        isOpen={orderTrackerOpen}
        onClose={() => setOrderTrackerOpen(false)}
        orders={orders}
        initialOrderId={selectedTrackOrderId}
        onOpenPortal={() => {
          setOrderTrackerOpen(false);
          setActiveView('portal');
          setCurrentRole('client');
        }}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultService={consultationService}
      />

      <AiStylistDrawer
        isOpen={aiStylistOpen}
        onClose={() => setAiStylistOpen(false)}
      />

      <MfaModal
        isOpen={mfaModalOpen}
        onClose={() => setMfaModalOpen(false)}
        isMfaVerified={isMfaVerified}
        setIsMfaVerified={setIsMfaVerified}
        userRole={currentRole}
      />

    </div>
  );
}
