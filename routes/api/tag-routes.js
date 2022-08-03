const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
	// Lists all tags and all products related.
	Tag.findAll({
		include: {
			all: true,
			nested: true
		}
	}).then(tagsFound => {
		return res.json(tagsFound);
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	})
});

router.get('/:id', (req, res) => {
	// Find specific tag by id.
	Tag.findOne({
		where: {
			id: req.params.id
		},
		include: {
			all: true,
			nested: true
		}
	}).then(tagFound => {
		return res.json(tagFound);
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

router.post('/', (req, res) => {
	// create a new tag
	Tag.create(req.body)
	.then(newTag => {
		return res.json(newTag);
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	})
});

router.put('/:id', (req, res) => {
	// Updates the tag specified by ID value.
	Tag.update({
		tag_name: req.body.tag_name
	},
	{
		where: {
			id: req.params.id
		}
	}).then(tag => {
		// Fails to update if there is nothing there originally.
		if (!tag)
			return res.status(404).json({ message: "No such tag found."});
		return res.json(tag); // 1 (true) if changed, 0 otherwise.
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err});
	});
});

router.delete('/:id', (req, res) => {
	// Deletes tag specified by ID value.
	Tag.destroy({
		where: {
			id: req.params.id
		}
	}).then(tag => {
		// Fails to delete if there is nothing there originally.
		if (!tag)
			return res.status(404).json({ message: "No such tag found."});
		return res.json(tag); // 1 (true) if deleted.
	}).catch(err => {
		res.status(500).json({ message: "Server error retrieving data.", err });
	});
});

module.exports = router;