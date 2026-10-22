export type LeadKind = 'demo' | 'contact' | 'newsletter';

export interface Lead {
  id: string;
  kind: LeadKind;
  receivedAt: string;
  /** Validated fields (anti-spam fields removed). */
  fields: Record<string, string | undefined>;
  page: string;
  utm?: { source?: string | undefined; medium?: string | undefined; campaign?: string | undefined } | undefined;
}

export interface LeadSink {
  name: string;
  send: (lead: Lead) => Promise<void>;
}
