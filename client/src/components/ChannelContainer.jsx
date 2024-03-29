import React, { useState } from 'react';
import {
	Channel,
	useChatContext,
	Message,
	MessageList,
	MessageInput,
	MessageSimple,
	MessageText,
} from 'stream-chat-react';

import {
	ChannelInner,
	CreateChannel,
	EditChannel,
} from './';

const ChannelContainer = ({
	isCreating,
	setIsCreating,
	isEditing,
	setIsEditing,
	createType,
	setCreateType,
}) => {
	const { channel } = useChatContext();

	if (isCreating) {
		return (
			<div className='channel__container'>
				<CreateChannel
					createType={createType}
					setIsCreating={setIsCreating}
				/>
			</div>
		);
	}

	if (isEditing) {
		return (
			<div className='channel__container'>
				<EditChannel setIsEditing={setIsEditing} />
			</div>
		);
	}

	const EmptyState = () => (
		<div className='channel-empty__container'>
			<p className='channel-empty__first'>
				This is the beginning of your chat history.
			</p>
			<p className='channel-empty__second'>
				Send messages, attachments, links, emojis, and more!
			</p>
		</div>
	);

	return (
		<div className='channel__container'>
			<Channel
				channel={channel}
				EmptyStateIndicator={EmptyState}
				Message={MessageSimple}
			>
				<ChannelInner setIsEditing={setIsEditing} />
			</Channel>
		</div>
	);
};

export default ChannelContainer;
