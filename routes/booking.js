const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user'); // Impor model User

// Endpoint untuk membuat booking baru
router.post('/', async (req, res) => {
  try {
    const { tanggalCheckin, tanggalCheckout, jumlahTamu, jenisTransportasi, jenisPenginapan, metodePembayaran, destinasiId, emailUser } = req.body;

    console.log('Received booking data:', req.body); // Tambahkan log untuk memastikan data booking diterima dengan benar di backend

    // Validasi data masukan
    if (!tanggalCheckin || !tanggalCheckout || !jumlahTamu || !jenisTransportasi || !jenisPenginapan || !metodePembayaran || !destinasiId || !emailUser) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email: emailUser } });
    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    // Simpan data booking ke database
    const booking = await Booking.create({
      tanggalCheckin,
      tanggalCheckout,
      jumlahTamu,
      jenisTransportasi,
      jenisPenginapan,
      metodePembayaran,
      destinasiId,
      userId: user.id, // Gunakan ID user yang ditemukan
    });

    console.log('Booking created:', booking); // Tambahkan log untuk memastikan booking berhasil disimpan ke database

    res.status(201).json({ message: 'Booking berhasil', booking });
  } catch (error) {
    console.error('Error saat membuat booking:', error);
    res.status(500).json({ error: 'Gagal membuat booking' });
  }
});

module.exports = router;
