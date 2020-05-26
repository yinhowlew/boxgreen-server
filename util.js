const { SECRET_ADMIN } = require('./config.js')

const isAdmin = (req, res, next) => {
	const user = req.headers.authorization;

	if (user === SECRET_ADMIN) {
		return next();
	} else {
		return res.status(401).send({message: "Not valid admin"})
	}
}

module.exports = isAdmin