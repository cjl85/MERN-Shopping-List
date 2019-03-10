const express = require('express');
const router  = express.Router();

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
// Public

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })

  newItem.save().then(item => res.json(item));
});

// DELETE api/items/:id
// Delete an item
// Public

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ deleted: false }));
})




module.exports = router;
