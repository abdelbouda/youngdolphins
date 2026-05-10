import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
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
    const opmerkingen     = data.get('opmerkingen')?.toString().trim() ?? '';

    if (!ouderVoornaam || !ouderEmail || !kindVoornaam || !diploma) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'E-mailconfiguratie ontbreekt.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(apiKey);

    const fromAddress = import.meta.env.RESEND_FROM ?? 'Young Dolphins <onboarding@resend.dev>';
    const toAddress   = import.meta.env.NOTIFY_EMAIL ?? 'info@youngdolphins.nl';

    const internalHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
        <div style="background:#001F3F;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;">🐬 Nieuwe aanmelding – Young Dolphins</h1>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 8px 8px;">
          <h2 style="color:#001F3F;font-size:16px;border-bottom:2px solid #E6F4FF;padding-bottom:8px;margin-top:0;">Ouder / Verzorger</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr><td style="padding:6px 0;color:#6b7280;width:40%;">Naam</td><td style="padding:6px 0;font-weight:600;">${ouderVoornaam} ${ouderAchternaam}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">E-mailadres</td><td style="padding:6px 0;font-weight:600;">${ouderEmail}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Telefoonnummer</td><td style="padding:6px 0;font-weight:600;">${ouderTelefoon || '–'}</td></tr>
          </table>
          <h2 style="color:#001F3F;font-size:16px;border-bottom:2px solid #E6F4FF;padding-bottom:8px;">Kind</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr><td style="padding:6px 0;color:#6b7280;width:40%;">Naam</td><td style="padding:6px 0;font-weight:600;">${kindVoornaam} ${kindAchternaam}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Geboortedatum</td><td style="padding:6px 0;font-weight:600;">${geboortedatum}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Zwemniveau</td><td style="padding:6px 0;font-weight:600;">${zwemniveau}</td></tr>
          </table>
          <h2 style="color:#001F3F;font-size:16px;border-bottom:2px solid #E6F4FF;padding-bottom:8px;">Zwemlessen voorkeur</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr><td style="padding:6px 0;color:#6b7280;width:40%;">Gewenst diploma</td><td style="padding:6px 0;font-weight:600;">${diploma}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Voorkeursdagen</td><td style="padding:6px 0;font-weight:600;">${voorkeursdagen || '–'}</td></tr>
          </table>
          ${opmerkingen ? `<h2 style="color:#001F3F;font-size:16px;border-bottom:2px solid #E6F4FF;padding-bottom:8px;">Opmerkingen</h2><p style="margin:0 0 24px;line-height:1.6;">${opmerkingen.replace(/\n/g, '<br>')}</p>` : ''}
          <div style="background:#E6F4FF;border-radius:8px;padding:16px;font-size:13px;color:#001F3F;">
            📧 Stuur een bevestiging aan: <strong>${ouderEmail}</strong>
          </div>
        </div>
      </div>`;

    const confirmHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
        <div style="background:#001F3F;padding:24px 32px;border-radius:8px 8px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;">🐬 Bedankt voor je aanmelding!</h1>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 8px 8px;">
          <p>Beste ${ouderVoornaam},</p>
          <p>We hebben de aanmelding van <strong>${kindVoornaam}</strong> voor het <strong>${diploma}</strong> ontvangen.</p>
          <p>We nemen binnenkort contact met je op om de startdatum en groep te bevestigen.</p>
          <p>Heb je vragen? Mail ons op <a href="mailto:info@youngdolphins.nl">info@youngdolphins.nl</a> of WhatsApp via <a href="https://wa.me/31628421354">06-28421354</a>.</p>
          <p style="margin-top:32px;">Met vriendelijke groet,<br><strong>Team Young Dolphins</strong><br>Zwemschool Amsterdam</p>
        </div>
      </div>`;

    await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: ouderEmail,
      subject: `Nieuwe aanmelding: ${kindVoornaam} ${kindAchternaam} – ${diploma}`,
      html: internalHtml,
    });

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
    return new Response(JSON.stringify({ error: 'Er ging iets mis. Probeer het opnieuw of neem contact op.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
