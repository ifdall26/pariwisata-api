const express = require('express');
const router = express.Router();
const Destinasi = require('../models/destinasi');

// GET all destinasi
router.get('/', async (req, res) => {
  const destinasi = await Destinasi.findAll();
  res.json(destinasi);
});

// GET destinasi by ID
router.get('/:id', async (req, res) => {
  const destinasi = await Destinasi.findByPk(req.params.id);
  if (destinasi) {
    res.json(destinasi);
  } else {
    res.status(404).send('Destinasi not found');
  }
});

// POST new destinasi
router.post('/', async (req, res) => {
  const destinasi = await Destinasi.create(req.body);
  res.status(201).json(destinasi);
});

// PUT update destinasi
router.put('/:id', async (req, res) => {
  const destinasi = await Destinasi.findByPk(req.params.id);
  if (destinasi) {
    await destinasi.update(req.body);
    res.json(destinasi);
  } else {
    res.status(404).send('Destinasi not found');
  }
});

// DELETE destinasi
router.delete('/:id', async (req, res) => {
  const destinasi = await Destinasi.findByPk(req.params.id);
  if (destinasi) {
    await destinasi.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Destinasi not found');
  }
});

module.exports = router;
