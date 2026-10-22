import { handleLead } from '@/lib/lead-handler';
import { newsletterSchema } from '@/lib/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function POST(req: Request) {
  return handleLead(req, 'newsletter', newsletterSchema, (d) => ({ email: d.email }));
}
