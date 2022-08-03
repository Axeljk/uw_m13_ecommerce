const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
	// Lists all products and all nested data related (tags).
	Product.findAll({
		include: {
			all: true,
			nested: true
		}
	}).then(productsFound => {
		return res.json(productsFound);
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

// get one product
router.get('/:id', (req, res) => {
	// Find specific product by id.
	Product.findOne({
		where: {
			id: req.params.id
		},
		include: {
			all: true,
			nested: true
		}
	}).then(productFound => {
		return res.json(productFound);
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
	  category_id: 1
    }
  */
	Product.create(req.body)
	.then(product => {
		// Check if tags. Pair if so to bulk create in productTag model.
		if (req.body.tagIds.length) {
			const productTagIdArr = req.body.tagIds.map(tag_id => {
				return {
					product_id: product.id,
					tag_id
				};
			});
			return ProductTag.bulkCreate(productTagIdArr);
		}
		return res.status(200).json(product);
	}).then(productTagIds => {
		return res.status(200).json(productTagIds)
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
	// Deletes product specified by ID value.
	Product.destroy({
		where: {
			id: req.params.id
		}
	}).then(product => {
		// Fails to destroy if there is nothing there originally.
		if (!product)
			return res.status(404).json({ message: "No such product found."});
		return res.json(product); // 1 (true) if deleted.
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	})
});

module.exports = router;
