export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.formData();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot — silent 200 if filled
  const website = body.get('website') ?? '';
  if (website.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const name    = (body.get('name')    ?? '').trim();
  const email   = (body.get('email')   ?? '').trim();
  const message = (body.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: 'Missing required fields.' }, 400);
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Website <sent@onclik.com>',
        to: 'sent@onclik.com',
        reply_to: email,
        subject: `New message from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return json({ ok: false, error: 'Email failed.' }, 500);
    }

    return json({ ok: true }, 200);

  } catch (err) {
    console.error('Submit error:', err);
    return json({ ok: false }, 500);
  }
}

export function onRequest() {
  return json({ ok: false, error: 'Method not allowed.' }, 405);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
