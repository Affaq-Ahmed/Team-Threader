import React from 'react';
import { Message } from 'stream-chat-react';

const TeamMessage = (props) => {
	const { message } = props;

	// Check if the message is not defined
	if (!message) {
		return null;
	}

	// Check if the message has the expected properties
	if (!message.user || !message.text) {
		return null;
	}

	return (
		<div
			className={`team-message ${
				message.type === 'system' ? 'system-message' : ''
			}`}
		>
			<div className='team-message-user'>
				{message.user.name}:
			</div>
			<div className='team-message-text'>
				{message.text}
			</div>
		</div>
	);
};

export default TeamMessage;
