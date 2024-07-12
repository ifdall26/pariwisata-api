const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user');
const Destinasi = require('../models/destinasi');

// Endpoint untuk membuat booking baru
router.post('/', async (req, res) => {
  try {
    const { tanggalCheckin, tanggalCheckout, jumlahTamu, jenisTransportasi, jenisPenginapan, metodePembayaran, destinasiId, emailUser } = req.body;

    console.log('Received booking data:', req.body);

    if (!tanggalCheckin || !tanggalCheckout || !jumlahTamu || !jenisTransportasi || !jenisPenginapan || !metodePembayaran || !destinasiId || !emailUser) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    const user = await User.findOne({ where: { email: emailUser } });
    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    // Ambil data destinasi untuk mendapatkan gambar
    const destinasi = await Destinasi.findByPk(destinasiId);
    if (!destinasi) {
      return res.status(404).json({ error: 'Destinasi tidak ditemukan' });
    }

    const booking = await Booking.create({
      tanggalCheckin,
      tanggalCheckout,
      jumlahTamu,
      jenisTransportasi,
      jenisPenginapan,
      metodePembayaran,
      destinasiId,
      userId: user.id,
      gambar: destinasi.gambar, // Gunakan gambar dari destinasi
    });

    console.log('Booking created:', booking);

    res.status(201).json({ message: 'Booking berhasil', booking });
  } catch (error) {
    console.error('Error saat membuat booking:', error);
    res.status(500).json({ error: 'Gagal membuat booking' });
  }
});

// Endpoint to get bookings
router.get('/', async (req, res) => {
  try {
    // Retrieve bookings from the database
    const bookings = await Booking.findAll(); // Menggunakan findAll untuk Sequelize

    // Send bookings as JSON response
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Endpoint untuk mendapatkan bookings berdasarkan userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Dapatkan bookings berdasarkan userId
    const bookings = await Booking.findAll({ where: { userId } });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error saat mendapatkan bookings:', error);
    res.status(500).json({ error: 'Gagal mendapatkan bookings' });
  }
});

module.exports = router;
