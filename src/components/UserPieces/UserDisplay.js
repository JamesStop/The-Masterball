import React from 'react';
import './UserDisplay.css';

function UserDisplay({ signingIn, signingUp, signedIn }) {
	const signIn = () => {};

	const signUp = () => {};

	if (!signedIn) {
		return (
			<div className='signed-out-user'>
				<button onClick={signIn}>sign in</button>
				<button onClick={signUp}>sign up</button>
			</div>
		);
	} else {
        return (
					<div className='signed-in-user'>
						<button></button>
					</div>
				);
    }
}

export default UserDisplay;
