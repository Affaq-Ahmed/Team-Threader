const signup = async (req, res) => {
	try {
		const { fullName, username, password, phoneNumber, avatarUrl } = req.body;
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	signup,
	login,
};
