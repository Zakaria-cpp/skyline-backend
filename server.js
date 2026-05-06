require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/flights',  require('./routes/flights'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/', (req, res) => {
  res.json({ message: '✈ SkyLine Airways API is running!' });
});

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    console.log('🔄 Connecting to database...');
    await initDB();
    console.log('✅ Database ready!');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
  }
}

start();