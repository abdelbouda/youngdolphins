import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();

    // Data ophalen uit het formulier
    const ouderVoornaam   = data.get('ouder_voornaam')?.toString().trim() ?? '';
    const ouderAchternaam = data.get('ouder_achternaam')?.toString().trim() ?? '';
    const ouderEmail      = data.get('ouder_email')?.toString().trim() ?? '';
    const ouderTelefoon   = data.get('ouder_telefoon')?.toString().trim() ?? '';
    const kindVoornaam    = data.get('kind_voornaam')?.toString().trim() ?? '';
    const kindAchternaam  = data.get('kind_achternaam')?.toString().trim() ?? '';
    const geboortedatum   = data.get('geboortedatum')?.toString().trim() ?? '';
    const zwemniveau      = data.get('zwemniveau')?.toString().trim() ?? '';
    
    // Pakket/Diploma veld (gekoppeld aan de PricingSection ID's)
    const gekozenPakket   = data.get('diploma')?.toString().trim() ?? ''; 
    
    const voorkeursdagen  = data.getAll('voorkeursdagen').map(d => d.toString()).join(', ');
    const opmerkingen      = data.get('opmerkingen')?.toString().trim() ?? '';

    // Validatie
    if (!ouderVoornaam || !ouderEmail || !kindVoornaam || !geboortedatum) {
      return new Response(JSON.stringify({ error: 'Vul alle verplichte velden in.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Configuratie fout.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(apiKey);
    const fromAddress = 'Young Dolphins <info@youngdolphins.nl>';
    const toAddress   = 'info@youngdolphins.nl';

    // Interne e-mail template
    const internalHtml = `
      <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
        <div style="background:#001F3F;padding:20px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:20px;">🐬 Nieuwe Aanmelding Monnickendam</h1>
        </div>
        <div style="border:1px solid #e5e7eb;padding:24px;border-top:none;">
          <h2 style="color:#001F3F;font-size:16px;border-bottom:1px solid #eee;">Ouder Details</h2>
          <p><strong>Naam:</strong> ${ouderVoornaam} ${ouderAchternaam}<br>
             <strong>Email:</strong> ${ouderEmail}<br>
             <strong>Tel:</strong> ${ouderTelefoon}</p>
          
          <h2 style="color:#001F3F;font-size:16px;border-bottom:1px solid #eee;">Kind Details</h2>
          <p><strong>Naam:</strong> ${kindVoornaam} ${kindAchternaam}<br>
             <strong>Geboortedatum:</strong> ${geboortedatum}<br>
             <strong>Huidig niveau:</strong> ${zwemniveau}</p>

          <h2 style="color:#001F3F;font-size:16px;border-bottom:1px solid #eee;">Selectie</h2>
          <p><strong>Gekozen Pakket:</strong> ${gekozenPakket}<br>
             <strong>Voorkeursdagen:</strong> ${voorkeursdagen || 'Nog niet opgegeven'}</p>
          
          ${opmerkingen ? `<h2 style="color:#001F3F;font-size:16px;border-bottom:1px solid #eee;">Extra info</h2><p>${opmerkingen}</p>` : ''}
        </div>
      </div>`;

    // Klant e-mail template
    const confirmHtml = `
      <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a;">
        <div style="background:#001F3F;padding:20px;border-radius:8px 8px 0 0;">
          <h1 style="color:#ffffff;margin:0;font-size:20px;">🐬 Welkom bij Young Dolphins!</h1>
        </div>
        <div style="border:1px solid #e5e7eb;padding:24px;border-top:none;">
          <p>Beste ${ouderVoornaam},</p>
          <p>Bedankt voor de aanmelding van <strong>${kindVoornaam}</strong> voor onze zwemlessen in <strong>Monnickendam</strong>.</p>
          <p>We hebben de aanmelding voor het pakket <strong>${gekozenPakket}</strong> in goede orde ontvangen. Ons team bekijkt de beschikbaarheid op de door jou opgegeven dagen (${voorkeursdagen}) en neemt zo snel mogelijk contact met je op.</p>
          <p>Heb je in de tussentijd vragen? Reageer dan gerust op deze e-mail.</p>
          <br>
          <p>Met vriendelijke groet,<br><strong>Team Young Dolphins</strong></p>
        </div>
      </div>`;

    // Verstuur e-mails
    await Promise.all([
      resend.emails.send({
        from: fromAddress,
        to: [toAddress],
        replyTo: ouderEmail,
        subject: `Aanmelding: ${kindVoornaam} (${gekozenPakket})`,
        html: internalHtml,
      }),
      resend.emails.send({
        from: fromAddress,
        to: [ouderEmail],
        subject: `Bevestiging aanmelding ${kindVoornaam} - Young Dolphins`,
        html: confirmHtml,
      })
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Serverfout' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
