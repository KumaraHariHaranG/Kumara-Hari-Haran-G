import { BespokeOrder, TailorTask, ChatMessage, EncryptedFileItem, UserPermission, FirewallTelemetry, SecurityReportData, CrmSyncData, AuditLogItem } from '../types';

/**
 * Backend API Client for Guna Tailor Services
 * Communicates with full-stack Express server endpoints protected by the 5-Stage Firewall.
 */

// Helper to attach User Role headers for Stage 3 RBAC validation
function getHeaders(userRole?: string) {
  return {
    'Content-Type': 'application/json',
    'x-user-role': userRole || 'client',
  };
}

// 1. ORDERS
export async function apiFetchOrders(): Promise<BespokeOrder[]> {
  try {
    const res = await fetch('/api/orders');
    if (!res.ok) throw new Error('Failed to fetch orders');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching orders, returning empty array:', err);
    return [];
  }
}

export async function apiUpdateOrderStage(
  orderId: string,
  stage: string,
  progressPercent: number,
  userRole: string
): Promise<{ success: boolean; order?: BespokeOrder }> {
  try {
    const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/stage`, {
      method: 'PUT',
      headers: getHeaders(userRole),
      body: JSON.stringify({ stage, progressPercent }),
    });
    return await res.json();
  } catch (err) {
    console.error('API error updating order stage:', err);
    return { success: false };
  }
}

export async function apiAppendFittingNote(
  orderId: string,
  note: string,
  userRole: string
): Promise<{ success: boolean; fittingNotes?: string[] }> {
  try {
    const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/notes`, {
      method: 'POST',
      headers: getHeaders(userRole),
      body: JSON.stringify({ note }),
    });
    return await res.json();
  } catch (err) {
    console.error('API error adding fitting note:', err);
    return { success: false };
  }
}

// 2. TASKS (KANBAN)
export async function apiFetchTasks(): Promise<TailorTask[]> {
  try {
    const res = await fetch('/api/tasks');
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching tasks:', err);
    return [];
  }
}

export async function apiCreateTask(
  task: Omit<TailorTask, 'id'>,
  userRole: string
): Promise<TailorTask | null> {
  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: getHeaders(userRole),
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return await res.json();
  } catch (err) {
    console.error('API error creating task:', err);
    return null;
  }
}

export async function apiUpdateTask(
  taskId: string,
  updates: Partial<TailorTask>,
  userRole: string
): Promise<{ success: boolean; task?: TailorTask }> {
  try {
    const res = await fetch(`/api/tasks/${encodeURIComponent(taskId)}`, {
      method: 'PUT',
      headers: getHeaders(userRole),
      body: JSON.stringify(updates),
    });
    return await res.json();
  } catch (err) {
    console.error('API error updating task:', err);
    return { success: false };
  }
}

// 3. CHAT
export async function apiFetchChat(channel?: string, orderId?: string): Promise<ChatMessage[]> {
  try {
    const params = new URLSearchParams();
    if (channel) params.set('channel', channel);
    if (orderId) params.set('orderId', orderId);
    const res = await fetch(`/api/chat?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch chat');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching chat:', err);
    return [];
  }
}

export async function apiSendChat(
  msg: Omit<ChatMessage, 'id' | 'timestamp'>,
  userRole: string
): Promise<ChatMessage | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: getHeaders(userRole),
      body: JSON.stringify(msg),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return await res.json();
  } catch (err) {
    console.error('API error sending chat:', err);
    return null;
  }
}

// 4. ENCRYPTED FILES (STAGE 4 E2EE)
export async function apiFetchFiles(orderId?: string): Promise<EncryptedFileItem[]> {
  try {
    const params = orderId ? `?orderId=${encodeURIComponent(orderId)}` : '';
    const res = await fetch(`/api/files${params}`);
    if (!res.ok) throw new Error('Failed to fetch files');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching files:', err);
    return [];
  }
}

export async function apiUploadEncryptedFile(
  fileData: {
    name: string;
    size: string;
    category: string;
    orderIdRef: string;
    uploader: string;
    sha256Hash: string;
    cipherTextBase64?: string;
  },
  userRole: string
): Promise<{ success: boolean; record?: EncryptedFileItem }> {
  try {
    const res = await fetch('/api/files/upload', {
      method: 'POST',
      headers: getHeaders(userRole),
      body: JSON.stringify(fileData),
    });
    return await res.json();
  } catch (err) {
    console.error('API error uploading file:', err);
    return { success: false };
  }
}

// 5. PERMISSIONS (RBAC)
export async function apiFetchPermissions(): Promise<UserPermission[]> {
  try {
    const res = await fetch('/api/permissions');
    if (!res.ok) throw new Error('Failed to fetch permissions');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching permissions:', err);
    return [];
  }
}

export async function apiUpdatePermission(
  key: string,
  role: 'client' | 'tailor' | 'admin',
  value: boolean,
  userRole: string
): Promise<{ success: boolean; permissions?: UserPermission[] }> {
  try {
    const res = await fetch('/api/permissions', {
      method: 'PUT',
      headers: getHeaders(userRole),
      body: JSON.stringify({ key, role, value }),
    });
    return await res.json();
  } catch (err) {
    console.error('API error updating permission:', err);
    return { success: false };
  }
}

// 6. FIREWALL TELEMETRY & SYSTEM CONCURRENCY
export async function apiFetchFirewallStatus(): Promise<FirewallTelemetry | null> {
  try {
    const res = await fetch('/api/firewall/status');
    if (!res.ok) throw new Error('Failed to fetch firewall status');
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function apiFetchSystemHealth(): Promise<{
  status: string;
  heapUsedMB: string;
  activeConnections: number;
  eventLoopLagMs: number;
  serverUptimeSeconds: number;
} | null> {
  try {
    const res = await fetch('/api/system/concurrency');
    if (!res.ok) throw new Error('Failed to fetch health');
    return await res.json();
  } catch (err) {
    return null;
  }
}

// 7. CRM SYNC
export async function apiTriggerCrmSync(userRole: string): Promise<{
  success: boolean;
  message: string;
  crmSyncState?: CrmSyncData;
}> {
  try {
    const res = await fetch('/api/crm/sync', {
      method: 'POST',
      headers: getHeaders(userRole),
    });
    return await res.json();
  } catch (err) {
    return {
      success: false,
      message: 'Failed to contact CRM backend',
    };
  }
}

// 8. SECURITY AUDIT REPORT
export async function apiFetchSecurityReport(): Promise<SecurityReportData | null> {
  try {
    const res = await fetch('/api/security/report');
    if (!res.ok) throw new Error('Failed to fetch security report');
    return await res.json();
  } catch (err) {
    return null;
  }
}

// 9. AUDIT LOGS (TAMPER-EVIDENT CRYPTOGRAPHIC AUDIT TRAIL)
export async function apiFetchAuditLogs(
  filters?: {
    severity?: string;
    actionType?: string;
    status?: string;
    query?: string;
  },
  userRole?: string
): Promise<AuditLogItem[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.severity) params.set('severity', filters.severity);
    if (filters?.actionType) params.set('actionType', filters.actionType);
    if (filters?.status) params.set('status', filters.status);
    if (filters?.query) params.set('query', filters.query);

    const res = await fetch(`/api/audit-logs?${params.toString()}`, {
      headers: getHeaders(userRole || 'admin'),
    });
    if (!res.ok) throw new Error('Failed to fetch audit logs');
    return await res.json();
  } catch (err) {
    console.warn('API error fetching audit logs:', err);
    return [];
  }
}

export async function apiCreateAuditLog(
  entry: Partial<AuditLogItem>,
  userRole?: string
): Promise<AuditLogItem | null> {
  try {
    const res = await fetch('/api/audit-logs', {
      method: 'POST',
      headers: getHeaders(userRole || 'admin'),
      body: JSON.stringify(entry),
    });
    if (!res.ok) throw new Error('Failed to create audit log entry');
    return await res.json();
  } catch (err) {
    console.error('API error creating audit log:', err);
    return null;
  }
}

export async function apiVerifyAuditLogs(userRole?: string): Promise<{
  chainValid: boolean;
  totalRecordsVerified: number;
  compromisedIndex: number;
  algorithm: string;
  complianceStandard: string;
  verifiedAt: string;
} | null> {
  try {
    const res = await fetch('/api/audit-logs/verify', {
      headers: getHeaders(userRole || 'admin'),
    });
    if (!res.ok) throw new Error('Failed to verify audit logs');
    return await res.json();
  } catch (err) {
    console.error('API error verifying audit logs:', err);
    return null;
  }
}

