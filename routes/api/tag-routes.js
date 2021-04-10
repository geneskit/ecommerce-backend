const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(e => {
    console.log("There was an error with finding the tags. " + e);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then (dbTagData => {
    if (!dbTagData) {
      res.status(404).json({
        message: "ERROR: There was an issue finding a tag with this ID."
      })
      return;
    }
    res.json(dbTagData);
  })
  .catch(e => {
    console.log("There was an error with finding a tag. " + e);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(e => {
    console.log("There was an error with creating a new tag. " + e);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    where: {
      id: req.params.id
    },
  })
  .then(dbTagData => {
    if(!dbTagData[0]) {
      res.status(404).json({
        message: "ERROR: There was an issue with finding the tag to update."
      })
    }
  })
  .catch(e => {
    console.log("There was an error with updating the tag. " + e);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    },
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({
        message: "ERROR: There was an issue with finding the tag with this ID."
      })
    }
    res.json(dbTagData);
  })
  .catch(e => {
    console.log("There was an error with deleting the tag. " + e);
  })
});

module.exports = router;