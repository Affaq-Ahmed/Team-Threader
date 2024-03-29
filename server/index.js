const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
