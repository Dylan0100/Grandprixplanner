export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' })
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({ email, listIds: [2], updateEnabled: true }),
    })

    if (response.ok || response.status === 204) {
      return res.status(200).json({ success: true })
    }

    const errorData = await response.json().catch(() => ({}))
    if (response.status === 400 && errorData.message && errorData.message.includes('already exists')) {
      return res.status(200).json({ success: true })
    }

    console.error('Brevo API error:', response.status, errorData)
    return res.status(502).json({ error: 'Signup provider error' })
  } catch (err) {
    console.error('Subscribe function error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
