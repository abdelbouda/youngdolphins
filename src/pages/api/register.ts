import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    // 1. Taal detecteren (handig voor de bevestigingsmail)
    // We kijken naar de 'referer' header om te zien of ze van /en/ of /nl/ komen
    const referer = request.headers.get('referer') ?? '';
    const isEnglish = referer.includes('/en/');

    // 2. Data ophalen uit het formulier
    const ouderVoornaam   = data.get('ouder_voornaam')?.toString().trim() ?? '';
    const ouderAchternaam = data.get('ouder_achternaam')?.toString().trim() ?? '';
    const ouderEmail      = data.get('ouder_email')?.toString().trim() ?? '';
    const ouderTelefoon   = data.get('ouder_telefoon')?.toString().trim() ?? '';
    const kindVoornaam    = data.get('kind_voornaam')?.toString().trim() ?? '';
    const kindAchternaam  = data.get('kind_achternaam')?.toString().trim() ?? '';
    const geboortedatum   = data.get('geboortedatum')?.toString().trim() ?? '';
    const zwemniveau      = data.get('zwemniveau')?.toString().trim() ?? '';
    const gekozenPakket   = data.get('pakket')?.toString().trim() ?? ''; // Gekozen pakket
    
    const voorkeursdagen  = data.getAll('voorkeursdagen').map(d => d.toString()).join(', ');
    const opmerkingen     = data.get('opmerkingen')?.toString().trim() ?? '';

    // Validatie
    if (!ouderVoornaam || !ouderEmail || !kindVoornaam || !geboortedatum) {
      return new Response(JSON.stringify({ 
        error: isEnglish ? 'Please fill in all required fields.' : 'Vul alle verplichte velden in.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    const resend = new Resend(apiKey);
    const fromAddress = 'Young Dolphins <info@youngdolphins.nl>';
    const toAddress   = 'info@youngdolphins.nl';

    // 3. Interne e-mail (altijd Nederlands voor eigen administratie)
    const internalHtml = `
      <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;border:1px solid #eee;border-radius:8px;overflow:hidden;">
        <div style="background:#001F3F;padding:20px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:20px;">🐬 Nieuwe Aanmelding (${isEnglish ? 'EN' : 'NL'})</h1>
        </div>
        <div style="padding:24px;">
          <p><strong>Locatie:</strong> Monnickendam</p>
          <p><strong>Gekozen Pakket:</strong> ${gekozenPakket}</p>
          <hr style="border:0;border-top:1px solid #eee;margin:20px 0;">
          <p><strong>Ouder:</strong> ${ouderVoornaam} ${ouderAchternaam} (${ouderTelefoon})</p>
          <p><strong>Kind:</strong> ${kindVoornaam} ${kindAchternaam} (${geboortedatum})</p>
          <p><strong>Niveau/Dagen:</strong> ${zwemniveau} / ${voorkeursdagen}</p>
          ${opmerkingen ? `<p><strong>Extra:</strong> ${opmerkingen}</p>` : ''}
        </div>
      </div>`;

    // 4. Klant e-mail (Meertalig!)
    const confirmHtml = isEnglish ? `
      <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
        <div style="background:#00AEEF;padding:20px;border-radius:8px 8px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;">🐬 Registration Received!</h1>
        </div>
        <div style="border:1px solid #e5e7eb;padding:32px;border-top:none;">
          <p>Dear ${ouderVoornaam},</p>
          <p>Thank you for registering <strong>${kindVoornaam}</strong> for swimming lessons in Monnickendam.</p>
          <p>We have received your request for the <strong>${gekozenPakket}</strong> package. Our team will check availability for your preferred days (${voorkeursdagen}) and contact you as soon as possible.</p>
          <p>Best regards,<br><strong>Team Young Dolphins</strong></p>
        </div>
      </div>` : `
      <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
        <div style="background:#00AEEF;padding:20px;border-radius:8px 8px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;">🐬 Aanmelding Ontvangen!</h1>
        </div>
        <div style="border:1px solid #e5e7eb;padding:32px;border-top:none;">
          <p>Beste ${ouderVoornaam},</p>
          <p>Bedankt voor de aanmelding van <strong>${kindVoornaam}</strong> voor zwemlessen in Monnickendam.</p>
          <p>We hebben je aanvraag voor het pakket <strong>${gekozenPakket}</strong> ontvangen. We bekijken de beschikbaarheid voor de voorkeursdagen (${voorkeursdagen}) en nemen snel contact met je op.</p>
          <p>Met vriendelijke groet,<br><strong>Team Young Dolphins</strong></p>
        </div>
      </div>`;

    // Verstuur e-mails
    await Promise.all([
      resend.emails.send({
        from: fromAddress,
        to: [toAddress],
        replyTo: ouderEmail,
        subject: `Nieuwe aanmelding: ${kindVoornaam} (${gekozenPakket})`,
        html: internalHtml,
      }),
      resend.emails.send({
        from: fromAddress,
        to: [ouderEmail],
        subject: isEnglish ? `Confirmation registration ${kindVoornaam}` : `Bevestiging aanmelding ${kindVoornaam}`,
        html: confirmHtml,
      })
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
