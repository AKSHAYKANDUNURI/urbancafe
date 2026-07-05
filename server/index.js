const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

app.use('/api/categories', require('./routes/categories'))
app.use('/api/products', require('./routes/products'))
app.use('/api/sales', require('./routes/sales'))
app.use('/api/settings', require('./routes/settings'))

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set in server/.env')
  process.exit(1)
}

console.log('🔌  Connecting to MongoDB Atlas...')

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  })
  .then(() => {
    console.log('✅  Connected to MongoDB Atlas')
    app.listen(PORT, () => console.log(`🚀  Urban Cafe API running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('❌  MongoDB connection failed:')
    console.error('    Code   :', err.code || 'N/A')
    console.error('    Reason :', err.message)
    process.exit(1)
  })

process.on('unhandledRejection', (reason) => {
  console.error('❌  Unhandled rejection:', reason)
})
