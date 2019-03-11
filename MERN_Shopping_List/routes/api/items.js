const express = require('express');
const router  = express.Router();
const auth    = require('../../middleware/auth');

// Item Model

const Item = require('../../models/item');

// GET api/items
// get all items
// public

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// POST api/items
// create an item
// Private

router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })

  newItem.save().then(item => res.json(item));
});

// DELETE api/items/:id
// Delete an item
// Private

router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ deleted: false }));
})




module.exports = router;
