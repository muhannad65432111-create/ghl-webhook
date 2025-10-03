const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/wait-webhook', async (req, res) => {
  const { contactId, waitMinutes } = req.body;

  console.log(`Received contact ${contactId} with wait ${waitMinutes} minutes`);

  // Confirm reception immediately
  res.send({ status: 'received' });

  // Wait for the random delay
  await new Promise(r => setTimeout(r, waitMinutes * 60 * 1000));

  // Call GHL API to continue workflow (replace with your actual API endpoint and key)
  await fetch('https://api.gohighlevel.com/v1/contacts/trigger-next-step', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer YOUR_GHL_API_KEY`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ contactId })
  });

  console.log(`Contact ${contactId} waited ${waitMinutes} minutes and moved forward.`);
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));
