import React from 'react';
import { useState, useEffect } from 'react';
import './SignUp.css';
import axios from 'axios';

function SignUp({ signingUp, setSigningUp }) {
	const BLANK_USER = {
		username: '',
		email: '',
		password: '',
	};

	const [userInfo, setUserInfo] = useState(BLANK_USER);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`http://localhost:1738/api/signup`,
				userInfo
			);
		} catch (error) {
			console.log(error);
		}
		setSigningUp(false);
	};

	const handleChange = (event) => {
		setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
	};

	if (signingUp) {
		return (
			<div className='sign-up-modal'>
				<form className='signup-form' onSubmit={handleSubmit}>
					<label htmlFor='username'>Username</label>
					<input
						onChange={handleChange}
						value={userInfo.username}
						id='username'
						type='text'
						minLength={1}
						maxLength={7}
						required
					/>
					<label htmlFor='email'>email</label>
					<input
						onChange={handleChange}
						value={userInfo.email}
						type='email'
						id='email'
					/>
					<label htmlFor='password'>password</label>
					<input
						onChange={handleChange}
						value={userInfo.password}
						type='text'
						id='password'
						minLength={1}
						maxLength={20}
					/>
					<button className='signup-button'>Sign Up</button>
				</form>
			</div>
		);
	}
}

export default SignUp;
