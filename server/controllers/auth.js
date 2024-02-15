const crypto = require('crypto');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const { connect } = require('getstream');

const api_key = process.env.STREAM_API_KEY;
const secret_key = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
	try {
		const {
			fullName,
			username,
			password,
			phoneNumber,
			avatarURL,
		} = req.body;

		const userId = crypto.randomBytes(16).toString('hex');
		const hashedPassword = await bcrypt.hash(password, 12);

		const serverClient = connect(
			api_key,
			secret_key,
			app_id
		);

		const token = serverClient.createUserToken(userId);

		res.status(201).json({
			token,
			fullName,
			username,
			userId,
			hashedPassword,
			phoneNumber,
			avatarURL,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const serverClient = connect(
			api_key,
			secret_key,
			app_id
		);
		const client = StreamChat.getInstance(
			api_key,
			secret_key
		);

		const { users } = await client.queryUsers({
			name: username,
		});

		if (!users.length)
			return res
				.status(400)
				.json({ message: 'User not found' });

		const user = users[0];

		const validPassword = await bcrypt.compare(
			password,
			user.hashedPassword
		);

		if (!validPassword)
			return res
				.status(400)
				.json({ message: 'Invalid credentials' });

		const token = serverClient.createUserToken(user.id);

		res.status(200).json({
			token,
			fullName: user.fullName,
			username,
			userId: user.id,
			hashedPassword: user.hashedPassword,
			phoneNumber: user.phoneNumber,
			avatarURL: user.avatarURL,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	signup,
	login,
};
