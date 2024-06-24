const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Endpoint untuk membuat booking baru
router.post('/', async (req, res) => {
  try {
    const { tanggalCheckin, tanggalCheckout, jumlahTamu, jenisTransportasi, jenisPenginapan, metodePembayaran } = req.body;

    // Simpan data booking ke database
    const booking = await Booking.create({
      tanggalCheckin,
      tanggalCheckout,
      jumlahTamu,
      jenisTransportasi,
      jenisPenginapan,
      metodePembayaran,
    });

    res.status(201).json({ message: 'Booking berhasil', booking });
  } catch (error) {
    console.error('Error saat membuat booking:', error);
    res.status(500).json({ error: 'Gagal membuat booking' });
  }
});

module.exports = router;
