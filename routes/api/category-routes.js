const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
	// Lists all categories and all nested data related (products, tags).
	Category.findAll({
		include: {
			all: true,
			nested: true
		}
	}).then(categoriesFound => {
		return res.json(categoriesFound);
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

router.get('/:id', (req, res) => {
	// Find specific category by id.
	Category.findOne({
		where: {
			id: req.params.id
		},
		include: {
			all: true,
			nested: true
		}
	}).then(categoryFound => {
		return res.json(categoryFound);
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

router.post('/', (req, res) => {
	// create a new category
	Category.create(req.body)
	.then(newCategory => {
		return res.json(newCategory);
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

router.put('/:id', (req, res) => {
	// Updates the category specified by ID value.
	Category.update({
		category_name: req.body.category_name
	},
	{
		where: {
			id: req.params.id
		}
	}).then(category => {
		// Fails to update if there is nothing there originally.
		if (!category)
			return res.status(404).json({ message: "No such category found."});
		return res.json(category); // 1 (true) if changed, 0 if nothing changed.
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

router.delete('/:id', (req, res) => {
	// Deletes category specified by ID value.
	Category.destroy({
		where: {
			id:req.params.id
		}
	}).then(category => {
		// Fails to delete if there is nothing there originally.
		if (!category)
			return res.status(404).json({ message: "No such category found."});
		return res.json(category); // 1 (true) if deleted, 0 if not.
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

module.exports = router;