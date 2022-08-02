import React from 'react';
import './SignIn.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SignIn({ signingIn, setSigningIn, setSignedIn }) {
	const BLANK_USER = {
		username: '',
		password: '',
	};

	const [userInfo, setUserInfo] = useState(BLANK_USER);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`http://localhost:1738/api/signin`,
				userInfo
			);
            window.localStorage.setItem('userid', response.data._id);
			window.localStorage.setItem('username', response.data.username)
		} catch (error) {
			console.log(error);
		}
		setSigningIn(false);
        setSignedIn(
					!localStorage.getItem('userid')
						? false
						: localStorage.getItem('userid') == 'undefined'
						? false
						: true
				);
	};

	const handleChange = (event) => {
		setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
	};

	if (signingIn) {
		return (
			<div className='sign-in-modal'>
				<form className='signin-form' onSubmit={handleSubmit}>
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
					<label htmlFor='password'>password</label>
					<input
						onChange={handleChange}
						value={userInfo.password}
						type='text'
						id='password'
						minLength={1}
						maxLength={20}
					/>
					<button className='signin-button'>Sign In</button>
				</form>
			</div>
		);
	}
}

export default SignIn;
