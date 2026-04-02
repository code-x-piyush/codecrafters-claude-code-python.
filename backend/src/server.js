const fs = require('fs');
const path = require('path');
const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const start = async () => {
  await connectDB(env.MONGODB_URI);
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on port ${env.PORT}`);
  });
};

start();
