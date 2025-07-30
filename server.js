require('dotenv').config(); // Make sure this is at the top of your file
const express = require('express');
const cors = require('cors');
const bodyParser = require('express').json;
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(cors());
app.use(bodyParser());

// 🔐 Replace with your real SendGrid API key

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.post('/send', async (req, res) => {
  const { name, contact, request, email, message } = req.body;

  const msg = {
    to: [
  'enquiries@hpcoatings.co.uk',
  'Garyb.1406@yahoo.co.uk',
  'marc.mearns@outlook.com'],
    
    from: 'noreply@hpcoatings.co.uk', // ✅ Must be verified on SendGrid
    subject: `New Website Enquiry: ${request}`,
    html: `
      <h3>New Enquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact Number:</strong> ${contact}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Request:</strong> ${request}</p>
      <p><strong>Message:</strong><br>${message || 'N/A'}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: 'Failed to send email.' });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
