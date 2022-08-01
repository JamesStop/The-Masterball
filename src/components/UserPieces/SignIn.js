import React from 'react';
import './SignIn.css';
import { useEffect, useState } from 'react';

function SignIn({ signingIn, setSigningIn }) {

    const BLANK_USER = {
        username: '',
		email: '',
		password: ''
	}

    const [userInfo, setUserInfo] = useState(BLANK_USER);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
        setUserInfo({...userInfo, [event.target.id]: event.target.value})
    }

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
						required
					/>
					<label htmlFor='email'>email</label>
					<input
						onChange={handleChange}
						value={userInfo.email}
						type='text'
						id='email'
					/>
					<label htmlFor='password'>password</label>
					<input
						onChange={handleChange}
						value={userInfo.password}
						type='text'
						id='password'
					/>
					<button>Sign In</button>
				</form>
			</div>
		);
	}
}

export default SignIn;
