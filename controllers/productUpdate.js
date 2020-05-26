
const handleProductUpdate = async (req, res, db) => {
	const { id, title, short_desc, description, ingredient, price, promo, best, quantity } = req.body.product;

	if (!id || !title) {
		return res.status(400).json("id and title cannot be blank");
	}		

	try {
		await db('products')
		.where('id', '=', id)
		.update({
			title: title,
			short_desc: short_desc,
			description: description,
			ingredient: ingredient,
			price: price,
			promo: promo,
			best: best,
			quantity: quantity
		})
		return res.status(200).send({message: "product update success!!"})

	} catch (error) {
		return res.status(400).send({message: "Error: Unable to update product"})
	}
	// .then(res.status(200).send({message: 'product update success'})) 
	// .catch(err => res.status(400).json('unable to get entries'))
}

const handleProductCreate = async (req, res, db) => {
	const { id, title, short_desc, description, ingredient, price, promo, best, quantity } = req.body.product;

	if (!id || !title) {
		return res.status(400).json("id and title cannot be blank");
	}		

	try {
		await db('products')
		.insert({
			id: id,
			title: title,
			short_desc: short_desc,
			description: description,
			ingredient: ingredient,
			price: price,
			promo: promo,
			best: best,
			quantity: quantity
		})

		return res.status(200).send({message: "product created yay!!"})

	} catch (error) {
		return res.status(400).send({message: "Error: Unable to create product"})
	}

	// .then(res.status(200).send({message: 'product create success'})) 
	// .then(res.status(200).json('yay create product success!!')) 
	// .catch(err => res.status(400).json('unable to create product'))
}

const handleProductDelete = (req, res, db) => {
	// why this can't use async??
	db('products')
	.where('id', '=', req.body.id)
	.del()	
	.then(res.status(200).json('product deleted! no regret!')) 
	.catch(err => res.status(400).json('unable to delete product'))
	// return res.status(200).json('product deleted! no regret!')

	// } catch (error) {
	// 	return res.status(400).send({message: "Error: Unable to delete product"})
	// }
}

module.exports = {
	handleProductUpdate: handleProductUpdate,
	handleProductCreate: handleProductCreate,
	handleProductDelete: handleProductDelete
}