import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signInImage from '../assets/signup.jpg';

const initialState = {
	fullName: '',
	username: '',
	phoneNumber: '',
	avatarURL: '',
	password: '',
	confirmPassword: '',
};

const cookies = new Cookies();

const Auth = () => {
	const [form, setForm] = useState(initialState);
	const [isSignUp, setIsSignUp] = useState(true);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });

		console.log(form);
	};

	const switchModeHandler = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);
		const {
			username,
			password,
			fullName,
			phoneNumber,
			avatarURL,
		} = form;

		const URL = 'http://localhost:5001/auth';

		const {
			data: { token, userId, hashedPassword },
		} = await axios.post(
			`${URL}/${isSignUp ? 'signup' : 'login'}`,
			{
				username,
				password,
				fullName,
				phoneNumber,
				avatarURL,
			}
		);

		cookies.set('token', token);
		cookies.set('username', username);
		cookies.set('fullName', fullName);
		cookies.set('userId', userId);

		if (isSignUp) {
			cookies.set('phoneNumber', phoneNumber);
			cookies.set('avatarURL', avatarURL);
			cookies.set('hashedPassword', hashedPassword);
		}

		window.location.reload();
	};

	return (
		<div className='auth__form-container'>
			<div className='auth__form-container_fields'>
				<div className='auth__form-container_fields-content'>
					<p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
					<form onSubmit={(e) => handleSubmit(e)}>
						{isSignUp && (
							<div className='auth__form-container_fields-content_input'>
								<label htmlFor='fullName'>Full Name</label>
								<input
									type='text'
									id='fullName'
									name='fullName'
									placeholder='Full Name'
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className='auth__form-container_fields-content_input'>
							<label htmlFor='username'>Username</label>
							<input
								type='text'
								id='username'
								name='username'
								placeholder='Username'
								onChange={handleChange}
								required
							/>
						</div>
						{isSignUp && (
							<div className='auth__form-container_fields-content_input'>
								<label htmlFor='phoneNumber'>
									Phone Number
								</label>
								<input
									type='text'
									id='phoneNumber'
									name='phoneNumber'
									placeholder='Phone Number'
									onChange={handleChange}
									required
								/>
							</div>
						)}
						{isSignUp && (
							<div className='auth__form-container_fields-content_input'>
								<label htmlFor='avatarURL'>
									Avatar URL
								</label>
								<input
									type='text'
									id='avatarURL'
									name='avatarURL'
									placeholder='Avatar URL'
									onChange={handleChange}
									required
								/>
							</div>
						)}

						<div className='auth__form-container_fields-content_input'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								id='password'
								name='password'
								placeholder='Password'
								onChange={handleChange}
								required
							/>
						</div>
						{isSignUp && (
							<div className='auth__form-container_fields-content_input'>
								<label htmlFor='confirmPassword'>
									Confirm Password
								</label>
								<input
									type='password'
									id='confirmPassword'
									name='confirmPassword'
									placeholder='Confirm Password'
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className='auth__form-container_fields-content_button'>
							<button>
								{isSignUp ? 'Sign Up' : 'Sign In'}
							</button>
						</div>
					</form>
					<div className='auth__form-container_fields-account'>
						<p>
							{isSignUp
								? 'Already have an account?'
								: "Don't have an account?"}
							<span onClick={switchModeHandler}>
								{isSignUp ? 'Sign In' : 'Sign Up'}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className='auth__form-container_image'>
				<img src={signInImage} alt='sign in' />
			</div>
		</div>
	);
};

export default Auth;
