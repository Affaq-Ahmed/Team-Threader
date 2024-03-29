import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({
	channel,
	type,
	setToggleContainer,
	setIsCreating,
	setIsEditing,
	setActiveChannel,
}) => {
	const { channel: activeChannel, client } =
		useChatContext();

	const ChannelPreview = () => (
		<p className='channel-preview__item'>
			# {channel?.data?.name || channel?.data?.id}
		</p>
	);

	const DirectPreview = () => {
		const members = Object.values(
			channel.state.members
		).filter(({ user }) => user.id !== client.userID);

		console.log(members[0].user.image);

		return (
			<div className='channel-preview__item single'>
				<Avatar
					name={
						members[0]?.user?.fullName ||
						members[0]?.user?.id
					}
					image={members[0]?.user?.image}
					size={28}
				/>
				<p>{members[0]?.user?.fullName}</p>
			</div>
		);
	};

	return (
		<div
			className={
				channel?.id === activeChannel?.id
					? 'channel-preview__wrapper__selected'
					: 'channel-preview__wrapper'
			}
			onClick={() => {
				setIsCreating(false);
				setIsEditing(false);
				setActiveChannel(channel);
				if (setToggleContainer) {
					setToggleContainer((prevState) => !prevState);
				}
			}}
		>
			{type === 'team' ? (
				<ChannelPreview />
			) : (
				<DirectPreview />
			)}
		</div>
	);
};

export default TeamChannelPreview;
