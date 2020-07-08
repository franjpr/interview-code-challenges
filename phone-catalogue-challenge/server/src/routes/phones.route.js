const router = require('express').Router();
const phonesRepository = require('../repository/phones.repository');

// Get all
router.get('/', (req, res) => {
  try {
    let phonesCollection = phonesRepository.findAll()

    res.json(phonesCollection);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: error.message })
  }
});


// Get one
router.get('/:id', (req, res) => {
  try {
    let id = req.params.id;
    let phone = phonesRepository.findOneById(+id);

    if (!phone) {
      res.status(404).json({ message: 'Phone not found' });
    }

    res.json(phone);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: error.message })
  }
});

module.exports = router;