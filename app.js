const express = require('express'); 
const app = express(); 
const port = 3000; 
const db = require('./db/index')
const Catalog = db.catalog
const Feedback = db.feedback
const bodyParser = require('body-parser')
const cors = require("cors")

// Middleware 
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5502'); // Izinkan akses dari origin tertentu
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // Izinkan metode HTTP tertentu
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Izinkan header tertentu
    next();
});

// // Middleware for contact form input validation
// function validateFeedback(req, res, next) {
//   const { firstName, lastName, email, phone, message } = req.body;
//   if (!firstName || !lastName || !email || !phone || !message) {
//     return res.status(400).json({ error: 'Semua kolom harus diisi.' });
//   }
//   next();
// }

// // Endpoint to store feedback (POST request)
// app.post("/proses_feedback", validateFeedback, async (req, res) => {
//   try {
//     const { firstName, lastName , email, phone, message } = req.body;
//     // Save feedback to database using Sequelize model
//     await Feedback.create({ firstName, lastName, email, phone, message });
//     res.status(201).json({ message: 'Message berhasil dikirim.' });
//   } catch (error) {
//     res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
//   }
// });


// app.post('/api/contact', async(req, res) => {
//   // Extract form data from the request body
//   // const { name, price, rebate, photo } = req.body;
//   const item = req.body
//   console.log(item)
//   try {
//     const contactcreate = await Contact.create(item)
//     res.status(201).json({
//       success:true,
//       message:"Successful",
//       data:contactcreate
//     })
//   } catch (error) {
//     res.status(500).json({
//       success:false,
//       message:"Usuccessful"
//     })
//   }
// })

// Handle GET Request for Catalog Items
app.post('/api/catalog', async(req, res) => {
  // Extract form data from the request body
  // const { name, price, rebate, photo } = req.body;
  const item = req.body
  console.log(item)
  try {
    const catalogcreate = await Catalog.create(item)
    res.status(201).json({
      success:true,
      message:"Successful",
      data:catalogcreate
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Usuccessful"
    })
  }
})


app.get('/api/catalog', async (req, res) => {
    try {
        const response = await fetch('https://motionless-hen-tie.cyclic.app/api/catalog');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Database Synchronization
async function startdb(){
  try {
    await db.sequelize.sync({alter:true})
    console.log("database connected")
  } catch (error) {
    console.log("database not connected")
  }
}


startdb()

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

