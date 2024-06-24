const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

// Endpoint untuk membuat booking baru
router.post('/', async (req, res) => {
  try {
    const { tanggalCheckin, tanggalCheckout, jumlahTamu, jenisTransportasi, jenisPenginapan, metodePembayaran } = req.body;

    console.log('Received booking data:', req.body); // Tambahkan log untuk memastikan data booking diterima dengan benar di backend

    // Simpan data booking ke database
    const booking = await Booking.create({
      tanggalCheckin,
      tanggalCheckout,
      jumlahTamu,
      jenisTransportasi,
      jenisPenginapan,
      metodePembayaran,
    });

    console.log('Booking created:', booking); // Tambahkan log untuk memastikan booking berhasil disimpan ke database

    res.status(201).json({ message: 'Booking berhasil', booking });
  } catch (error) {
    console.error('Error saat membuat booking:', error);
    res.status(500).json({ error: 'Gagal membuat booking' });
  }
});

module.exports = router;
