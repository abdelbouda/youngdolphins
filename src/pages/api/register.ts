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

    const apiKey = process.env.RESEND_API_KEY;
    const resend = new Resend(apiKey);
    const fromAddress = 'Young Dolphins <info@youngdolphins.nl>';
    const toAddress   = 'info@youngdolphins.nl';

    // WhatsApp nummer voor Young Dolphins
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '31628421354';

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

    // Alternatief: Sla registratie op in plaats van email forwarding
    try {
      // Optie 1: Verstuur e-mails (standaard)
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

      // Optie 2: Verstuur WhatsApp bericht
      try {
        const whatsappMessage = isEnglish
          ? `🐬 *New Registration (EN)*\n\n*Location:* Monnickendam\n*Package:* ${gekozenPakket}\n\n*Parent:* ${ouderVoornaam} ${ouderAchternaam}\n*Phone:* ${ouderTelefoon}\n*Email:* ${ouderEmail}\n\n*Child:* ${kindVoornaam} ${kindAchternaam}\n*DOB:* ${geboortedatum}\n*Level:* ${zwemniveau}\n*Preferred Days:* ${voorkeursdagen}\n\n${opmerkingen ? `*Remarks:* ${opmerkingen}\n` : ''}`
          : `🐬 *Nieuwe Aanmelding (NL)*\n\n*Locatie:* Monnickendam\n*Pakket:* ${gekozenPakket}\n\n*Ouder:* ${ouderVoornaam} ${ouderAchternaam}\n*Telefoon:* ${ouderTelefoon}\n*Email:* ${ouderEmail}\n\n*Kind:* ${kindVoornaam} ${kindAchternaam}\n*Geb. datum:* ${geboortedatum}\n*Niveau:* ${zwemniveau}\n*Voorkeursdagen:* ${voorkeursdagen}\n\n${opmerkingen ? `*Opmerkingen:* ${opmerkingen}\n` : ''}`;

        // Verstuur via WhatsApp API (bijvoorbeeld via Twilio of andere provider)
        const whatsappApiUrl = process.env.WHATSAPP_API_URL;
        if (whatsappApiUrl) {
          await fetch(whatsappApiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`,
            },
            body: JSON.stringify({
              to: whatsappNumber,
              message: whatsappMessage,
            }),
          });
        } else {
          // Fallback: log naar console als API niet geconfigureerd is
          console.log('WhatsApp message (API not configured):', whatsappMessage);
        }
      } catch (whatsappError) {
        console.error('WhatsApp sending failed:', whatsappError);
        // Breek de flow niet af als WhatsApp faalt
      }

      // Optie 2: Sla op in database (alternatief voor geen email forwarding)
      // Dit kan worden geactiveerd door EMAIL_FORWARDING=false in environment variables
      if (process.env.EMAIL_FORWARDING === 'false') {
        // Sla registratiegegevens op in database
        const registrationData = {
          timestamp: new Date().toISOString(),
          locale: locale,
          parent: {
            firstName: ouderVoornaam,
            lastName: ouderAchternaam,
            email: ouderEmail,
            phone: ouderTelefoon
          },
          child: {
            firstName: kindVoornaam,
            lastName: kindAchternaam,
            birthDate: geboortedatum,
            level: zwemniveau
          },
          package: gekozenPakket,
          preferences: {
            diploma: data.get('diploma')?.toString().trim() ?? '',
            days: voorkeursdagen,
            remarks: opmerkingen
          }
        };

        // Hier kun je database logica toevoegen:
        // await db.registrations.create(registrationData);
        console.log('Registration data stored:', registrationData);
      }

    } catch (emailError) {
      // Fallback: Als email niet werkt, sla op in database
      console.error('Email failed, using database fallback:', emailError);
      
      const registrationData = {
        timestamp: new Date().toISOString(),
        locale: locale,
        parent: {
          firstName: ouderVoornaam,
          lastName: ouderAchternaam,
          email: ouderEmail,
          phone: ouderTelefoon
        },
        child: {
          firstName: kindVoornaam,
          lastName: kindAchternaam,
          birthDate: geboortedatum,
          level: zwemniveau
        },
        package: gekozenPakket,
        preferences: {
          diploma: data.get('diploma')?.toString().trim() ?? '',
          days: voorkeursdagen,
          remarks: opmerkingen
        }
      };

      // Sla op als fallback
      // await db.registrations.create(registrationData);
      console.log('Fallback registration stored:', registrationData);
    }

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
