export type Role = 'client' | 'tailor' | 'admin';

export type OrderStage = 
  | 'Consultation & Measurement'
  | 'Pattern Drafting'
  | 'Fabric Cutting & Canvas Prep'
  | 'Skeleton Basting Fitting'
  | 'Fine Stitching & Detailing'
  | 'Final Press & Quality QC'
  | 'Ready for Delivery / Fitting Completed';

export interface BespokeOrder {
  id: string; // e.g. GTS-8492
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  garmentType: string; // 'Bespoke 3-Piece Italian Wool Suit' | 'Silk Ceremonial Sherwani' | 'Tuxedo' | etc.
  fabricChoice: string;
  liningDetails: string;
  assignedTailor: string;
  orderDate: string;
  targetFittingDate: string;
  finalDeliveryDate: string;
  currentStage: OrderStage;
  stageProgressPercent: number;
  priority: 'Standard' | 'Urgent / VIP' | 'Wedding Express';
  totalPrice: number;
  paidAmount: number;
  encryptedFileCount: number;
  fittingNotes: string[];
  measurementsSummary: {
    chest: string;
    waist: string;
    shoulder: string;
    jacketLength: string;
    sleeve: string;
    trouserInseam: string;
    postureCorrection: string;
  };
}

export interface TailorTask {
  id: string;
  orderId: string;
  title: string;
  stage: 'Drafting' | 'Cutting' | 'Basting' | 'Stitching' | 'QC_Press' | 'Completed';
  assigneeName: string;
  deadline: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  notes: string;
  progressPercent: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  role: Role;
  channel: 'internal-staff' | 'cutting-room' | 'client-direct';
  text: string;
  timestamp: string;
  orderIdRef?: string;
  fileAttachment?: {
    name: string;
    encryptedHash: string;
  };
}

export interface EncryptedFileItem {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  uploader: string;
  category: 'Measurement Sheet' | 'Fitting Reference Photo' | 'Invoice' | 'Pattern CAD';
  sha256Hash: string;
  encryptionAlgorithm: 'AES-GCM-256';
  isEncrypted: boolean;
  orderIdRef: string;
}

export interface FirewallTelemetry {
  overallStatus: string;
  uptimePercentage: string;
  stages: {
    stage: number;
    name: string;
    status: string;
    details: string;
    badge: string;
  }[];
  stats: {
    threatsBlockedToday: number;
    activeEncryptedSessions: number;
    averageLatencyMs: number;
    mfaEnforcementRate: string;
  };
}

export interface SecurityReportData {
  reportId: string;
  generatedAt: string;
  period: string;
  complianceScore: string;
  firewallTiersActive: number;
  totalSessionsAudited: number;
  blockedAnomalies: number;
  bruteForceMitigations: number;
  e2eeFilesEncryptedThisWeek: number;
  mfaVerificationSuccessRate: string;
  crmSyncEventsAudited: number;
  executiveSummary: string;
  recommendations: string[];
}

export interface UserPermission {
  key: string;
  name: string;
  description: string;
  client: boolean;
  tailor: boolean;
  admin: boolean;
}

export interface CrmSyncData {
  lastSyncTime: string;
  status: string;
  connectedPlatform: string;
  syncedRecords: number;
  syncLatencyMs: number;
  pendingChanges: number;
  encryptionStatus: string;
}

export type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL';
export type AuditActionType = 
  | 'PERMISSION_MODIFIED'
  | 'FILE_DECRYPTED'
  | 'FILE_UPLOADED'
  | 'ORDER_STAGE_OVERRIDE'
  | 'CRM_SYNC_TRIGGERED'
  | 'MFA_CHALLENGE'
  | 'FIREWALL_DEFENSE_TRIGGERED'
  | 'CLIENT_PII_ACCESSED'
  | 'SYSTEM_CONFIGURATION_CHANGE';

export interface AuditLogItem {
  id: string; // e.g. AUD-90214
  timestamp: string;
  actor: string;
  actorRole: Role;
  actionType: AuditActionType;
  severity: AuditSeverity;
  targetResource: string;
  ipAddress: string;
  status: 'SUCCESS' | 'DENIED' | 'FLAGGED';
  details: string;
  hashChecksum: string; // SHA-256 tamper-evident chain
}

