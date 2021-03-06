const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/item');

// @route   GET api/items
// @desc    Get all items
// @acess   Public
router.get('/', (req, res) =>{
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create a new item
// @acess   Public
router.post('/', (req, res) =>{
    const newItem = new Item({
        name: req.body.name
    });
    
    newItem.save().then(item => res.json(item));
});

// @route   POST api/items/:id
// @desc    Delete a item
// @acess   Public
router.delete('/:id', (req, res) =>{
    Item.findById(req.params.id)
        .then(item => {
            item.remove()
                .then(res.json({success: true}))
        })
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;