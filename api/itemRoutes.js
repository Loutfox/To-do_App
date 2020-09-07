const express = require("express");
const router = express.Router();


//Item model
const Item = require("../models/Item");



// @route api/items
// Descendant sorting (-1)
// GET / Get all items
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => console.log(err));
})

// @route /api/items
// POST / Create a new item
router.post('/', (req, res) => {
    const newItem = new Item(req.body);
    newItem.save()
        .then(item => res.json(item))
        .catch(err => {
            // Duplicate error code
            if (err.code === 11000) {
                res.status(400).json({ errorName: "This task is already added" })
            }

            //Validation errors
            if (err._message === "Item validation failed") {
                res.status(400).json({ errorName: err.errors.name.properties.message });
            }
        });
})

// @route /api/items/:id
// DELETE / Delete an item by ID
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(item => res.json(item))
            .catch(err => console.log(err)))
        .catch(err => res.status(404).send("404, Item not found"));
})



module.exports = router;