import { handleLead } from '@/lib/lead-handler';
import { demoRequestSchema } from '@/lib/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function POST(req: Request) {
  return handleLead(req, 'demo', demoRequestSchema, (d) => ({
    edition: d.edition === 'lite' ? 'MaamulPlus Lite' : 'MaamulPlus Enterprise',
    name: d.name,
    business: d.business,
    phone: d.phone,
    email: d.email || undefined,
    branches: d.branches,
    message: d.message || undefined,
  }));
}
