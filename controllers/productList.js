const handleProductListGet = async (req, res, db) => {
	// const { id } = req.params;
	try {
		const products = await db.select('*').from('products')
		// .where({id: id})
		// .then(products => {
		// 	res.json(products)
		// })
		return res.json(products)
	} catch {
		return res.status(400).json('error getting product list')
	}
	// .catch(err => res.status(400).json('error getting product list'))
}

module.exports = {
	handleProductListGet: handleProductListGet
}