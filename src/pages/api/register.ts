import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    // We gaan uit van FormData omdat jouw code daarop is gebouwd
    const data = await request.formData();

    const ouderVoornaam   = data.get('ouder_voornaam')?.toString().trim() ?? '';
    const ouderAchternaam = data.get('ouder_achternaam')?.toString().trim() ?? '';
    const ouderEmail      = data.get('ouder_email')?.toString().trim() ?? '';
    const ouderTelefoon   = data.get('ouder_telefoon')?.toString().trim() ?? '';
    const kindVoornaam    = data.get('kind_voornaam')?.toString().trim() ?? '';
    const kindAchternaam  = data.get('kind_achternaam')?.toString().trim() ?? '';
    const geboortedatum   = data.get('geboortedatum')?.toString().trim() ?? '';
    const zwemniveau      = data.get('zwemniveau')?.toString().trim() ?? '';
    const diploma         = data.get('diploma')?.toString().trim() ?? '';
    const voorkeursdagen  = data.getAll('voorkeursdagen').map(d => d.toString()).join(', ');
    const opmerkingen      = data.get('opmerkingen')?.toString().trim() ?? '';

    // Validatie
    if (!ouderVoornaam || !ouderEmail || !kindVoornaam || !diploma) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'E-mailconfiguratie ontbreekt op de server.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(apiKey);

    // AANPASSING: Gebruik ALTIJD je geverifieerde domein
    const fromAddress = 'Young Dolphins <info@youngdolphins.nl>';
    const toAddress   = 'info@youngdolphins.nl';

    // Je mooie templates (onveranderd laten)
    const internalHtml = `... (houd je eigen HTML hier) ...`;
    const confirmHtml = `... (houd je eigen HTML hier) ...`;

    // 1. Mail naar jezelf
    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: ouderEmail,
      subject: `🐬 Nieuwe aanmelding: ${kindVoornaam} ${kindAchternaam}`,
      html: internalHtml,
    });

    // 2. Bevestiging naar de ouder
    await resend.emails.send({
      from: fromAddress,
      to: [ouderEmail],
      subject: `Bevestiging aanmelding ${kindVoornaam} – Young Dolphins`,
      html: confirmHtml,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Aanmelding fout:', err);
    return new Response(JSON.stringify({ error: 'Fout bij verwerken aanmelding.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
