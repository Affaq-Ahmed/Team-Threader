import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import {
	ChannelContainer,
	ChannelListContainer,
	Auth,
} from './components';

import './app.css';

const cookies = new Cookies();
const authToken = cookies.get('token');

const apiKey = 'ekea79dpx39r';

const client = StreamChat.getInstance(apiKey);

if (authToken) {
	client.connectUser(
		{
			id: cookies.get('userId'),
			name: cookies.get('username'),
			fullName: cookies.get('fullName'),
			image: cookies.get('avatarURL'),
			phoneNumber: cookies.get('phoneNumber'),
			hashedPassword: cookies.get('hashedPassword'),
		},
		authToken
	);
}

const App = () => {
	if (!authToken) return <Auth />;

	return (
		<div className='app__wrapper'>
			<Chat client={client} theme='team light'>
				<ChannelListContainer />
				<ChannelContainer />
			</Chat>
		</div>
	);
};

export default App;
