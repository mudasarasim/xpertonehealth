// backend/routes/angelRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // <- this is pool.promise()
const multer = require('multer');
const path = require('path');
const transporter = require('../utils/mailer'); 
// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
router.post('/submit-angel', upload.single('youtube_image'), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      instagram,
      tiktok,
      youtube,
      facebook,
      linkedin,
      followers,
      niche,
      other_niche,
      description
    } = req.body;

    const youtube_image = req.file ? `/uploads/${req.file.filename}` : '';

    // Save in DB
   const sql = `
  INSERT INTO angels 
  (name, email, phone, instagram, tiktok, youtube, facebook, linkedin, youtube_image, followers, niche, other_niche, description, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
`;

    const values = [
      name, email, phone, instagram, tiktok, youtube, facebook, linkedin,
      youtube_image, followers, niche, other_niche, description
    ];

    await db.query(sql, values);

    // ✅ Applicant ko confirmation email
    await transporter.sendMail({
      from: '"Dubai Creator Summit" <info@dubaicreatorsummit.com>',
      to: email,  
      subject: "Thank you for applying as Angel!",
      text: `Dear ${name},

Thank you for submitting your details. Our team will review and contact you soon.

Dubai Creator Summit 2025`
    });

    // ✅ Admin ko applicant details email
    await transporter.sendMail({
      from: '"Dubai Creator Summit" <info@dubaicreatorsummit.com>',
      to: "info@dubaicreatorsummit.com",  
      subject: `New Angel Application Received - ${name}`,
      text: `New application received from ${name} (${email}, ${phone}).

Instagram: ${instagram || 'N/A'}
TikTok: ${tiktok || 'N/A'}
YouTube: ${youtube || 'N/A'}
Facebook: ${facebook || 'N/A'}
LinkedIn: ${linkedin || 'N/A'}

Followers: ${followers || 'N/A'}
Niche: ${niche || 'N/A'}
Other Niche: ${other_niche || 'N/A'}

Description:
${description || 'N/A'}

📷 YouTube Image: ${youtube_image ? 'https://dubaicreatorsummit.com' + youtube_image : 'No Image'}
`
    });

    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (err) {
    console.error('❌ Error inserting data:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/api/speakers', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM angels WHERE status = "approved"');
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching speakers:', err);
    res.status(500).json({ error: 'Database error' });
  }
});
// Get all pending angels (for admin)
router.get('/api/pending-angels', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM angels WHERE status = "pending"');
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching pending angels:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Approve angel
router.post('/api/approve-angel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('UPDATE angels SET status = "approved" WHERE id = ?', [id]);
    res.json({ success: true, message: "Angel approved successfully!" });
  } catch (err) {
    console.error("❌ Error approving angel:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
