import React, { useState } from 'react';
import {
	ChannelList,
	useChatContext,
} from 'stream-chat-react';
import {
	ChannelSearch,
	TeamChannelList,
	TeamChannelPreview,
} from './';
import Cookies from 'universal-cookie';
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
	<div className='channel-list__sidebar'>
		<div className='channel-list__sidebar__icon1'>
			<div className='icon1__inner'>
				<img src={HospitalIcon} alt='hospital' width='30' />
			</div>
		</div>
		<div className='channel-list__sidebar__icon2'>
			<div className='icon1__inner' onClick={logout}>
				<img src={LogoutIcon} alt='logout' width='30' />
			</div>
		</div>
	</div>
);

const CompanyHeader = () => (
	<div className='channel-list__header'>
		<p className='channel-list__header__text'>
			Team Threader
		</p>
	</div>
);

const CustomChannelTeamFilter = (channels) => {
	return channels.filter(
		(channel) => channel.type === 'team'
	);
};

const CustomChannelMessagingFilter = (channels) => {
	return channels.filter(
		(channel) => channel.type === 'messaging'
	);
};

const ChannelListContent = ({
	setIsCreating,
	setIsEditing,
	isCreating,
	setCreateType,
	setToggleContainer,
}) => {
	const { client } = useChatContext();

	const filters = { members: { $in: [client.userID] } };

	const logout = () => {
		cookies.remove('token');
		cookies.remove('userId');
		cookies.remove('username');
		cookies.remove('fullName');
		cookies.remove('avatarURL');
		cookies.remove('hashedPassword');
		cookies.remove('phoneNumber');

		window.location.reload();
	};

	return (
		<>
			<SideBar logout={logout} />
			<div className='channel-list__list__wrapper'>
				<CompanyHeader />
				<ChannelSearch />
				<ChannelList
					filters={filters}
					channelRenderFilterFn={CustomChannelTeamFilter}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type='team'
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setCreateType={setCreateType}
							setToggleContainer={setToggleContainer}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							setToggleContainer={setToggleContainer}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							type='team'
						/>
					)}
				/>
				<ChannelList
					filters={filters}
					channelRenderFilterFn={
						CustomChannelMessagingFilter
					}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type='messaging'
							isCreating={isCreating}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setCreateType={setCreateType}
							setToggleContainer={setToggleContainer}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							setToggleContainer={setToggleContainer}
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							type='messaging'
						/>
					)}
				/>
			</div>
		</>
	);
};

const ChannelListContainer = ({
	setIsCreating,
	setIsEditing,
	isCreating,
	setCreateType,
}) => {
	const [toggleContainer, setToggleContainer] =
		useState(false);

	return (
		<>
			<div className={'channel-list__container'}>
				<ChannelListContent
					setIsCreating={setIsCreating}
					setIsEditing={setIsEditing}
					isCreating={isCreating}
					setCreateType={setCreateType}
				/>
			</div>

			<div
				className='channel-list__container-responsive'
				style={{
					left: toggleContainer ? '0%' : '-89%',
					background: '#005fff',
				}}
			>
				<div
					className='channel-list__container-toggle'
					onClick={() =>
						setToggleContainer((prevToggle) => !prevToggle)
					}
				>
					<p>{toggleContainer ? 'Close' : 'Open'}</p>
				</div>
				<ChannelListContent
					setIsCreating={setIsCreating}
					setIsEditing={setIsEditing}
					setCreateType={setCreateType}
					setToggleContainer={setToggleContainer}
				/>
			</div>
		</>
	);
};

export default ChannelListContainer;
