import { handleLead } from '@/lib/lead-handler';
import { contactSchema } from '@/lib/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function POST(req: Request) {
  return handleLead(req, 'contact', contactSchema, (d) => ({
    topic: d.topic,
    name: d.name,
    email: d.email,
    phone: d.phone || undefined,
    message: d.message,
  }));
}
