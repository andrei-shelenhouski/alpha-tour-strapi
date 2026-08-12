/**
 * lead lifecycle hooks
 *
 * Forwards every new lead to Navio's public leads API. Sync outcome is
 * written back onto the lead record (navio_synced / navio_error) so failures
 * are visible in the admin panel instead of only in server logs.
 */

interface LeadResult {
  id: number;
  documentId: string;
  name?: string;
  phone?: string;
  email?: string;
  departure?: string;
  destination?: string;
  hotel?: string;
  range_start?: string;
  range_end?: string;
  adults?: number;
  children?: number;
  comment?: string;
  reference?: string;
}

async function syncToNavio(result: LeadResult): Promise<void> {
  const navioApiUrl = process.env.NAVIO_API_URL || 'https://app.navio.by';
  const navioPublicKey = process.env.NAVIO_PUBLIC_KEY;

  if (!navioPublicKey) {
    strapi.log.warn(
      `NAVIO_PUBLIC_KEY is not set — skipping Navio sync for lead ${result.id}`,
    );

    return;
  }

  const paxCount = (result.adults || 0) + (result.children || 0) || undefined;

  const payload = {
    name: result.name,
    phone: result.phone,
    email: result.email,
    destination:
      [result.destination, result.hotel].filter(Boolean).join(', ') ||
      undefined,
    departDate: result.range_start,
    returnDate: result.range_end,
    paxCount,
    notes:
      [
        result.comment,
        result.departure ? `Отправление: ${result.departure}` : null,
        result.reference ? `Страница: ${result.reference}` : null,
      ]
        .filter(Boolean)
        .join('\n') || undefined,
  };

  try {
    const response = await fetch(`${navioApiUrl}/api/public/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${navioPublicKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();

      strapi.log.error(`Navio error ${response.status}: ${error}`);

      await strapi.documents('api::lead.lead').update({
        documentId: result.documentId,
        data: { navio_error: `${response.status}: ${error}` },
      });

      return;
    }

    await strapi.documents('api::lead.lead').update({
      documentId: result.documentId,
      data: { navio_synced: true },
    });
  } catch (error) {
    strapi.log.error('Failed to submit lead to Navio', error);

    await strapi.documents('api::lead.lead').update({
      documentId: result.documentId,
      data: { navio_error: String(error) },
    });
  }
}

export default {
  async afterCreate(event: { result: LeadResult }) {
    await syncToNavio(event.result);
  },
};
