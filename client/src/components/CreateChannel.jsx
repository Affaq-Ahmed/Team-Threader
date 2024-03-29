import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({
	channelName = '',
	setChannelName,
}) => {
	const handleChange = (event) => {
		event.preventDefault();

		setChannelName(event.target.value);
	};

	return (
		<div className='channel-name-input__wrapper'>
			<p>Name</p>
			<input
				value={channelName}
				onChange={handleChange}
				placeholder='channel-name'
			/>
			<p>Add Members</p>
		</div>
	);
};

const CreateChannel = ({ createType, setIsCreating }) => {
	const { client, setActiveChannel } = useChatContext();
	const [selected, setSelected] = useState([
		client.userID || '',
	]);
	const [channelName, setChannelName] = useState('');

	const createChannel = async (event) => {
		event.preventDefault();

		try {
			const newChannel = await client.channel(createType, {
				name: channelName,
				members: selected,
			});

			await newChannel.watch();

			setChannelName('');
			setIsCreating(false);
			setSelected([client.userID]);
			setActiveChannel(newChannel);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='create-channel__container'>
			<div className='create-channel__header'>
				<p>
					{createType === 'team'
						? 'Create a New Channel'
						: 'Send a Direct Message'}
				</p>
				<CloseCreateChannel setIsCreating={setIsCreating} />
			</div>
			{createType === 'team' && (
				<ChannelNameInput
					channelName={channelName}
					setChannelName={setChannelName}
				/>
			)}
			<UserList setSelectedUsers={setSelected} />
			<div
				className='create-channel__button-wrapper'
				onClick={createChannel}
			>
				<p>
					{createType === 'team'
						? 'Create Channel'
						: 'Create Message Group'}
				</p>
			</div>
		</div>
	);
};

export default CreateChannel;
