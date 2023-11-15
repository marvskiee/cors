const express = require('express');
const cors = require('cors');

// Use dynamic import to import node-fetch
import('node-fetch').then(({ default: fetch }) => {
  const app = express();

  // Enable CORS for all routes
  app.use(cors());

  // Define a route to proxy the requests
  app.get('/proxy', async (req, res) => {
    const { url } = req.query;

    try {
      const response = await fetch(url);
      const data = await response.blob();

      res.setHeader('Content-Type', response.headers.get('Content-Type'));
      res.send(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Error importing node-fetch:', error);
});
