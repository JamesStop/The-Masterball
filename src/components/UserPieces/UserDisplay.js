import React from 'react';
import './UserDisplay.css';

function UserDisplay({ setSigningUp, setSigningIn, signedIn, setSignedIn }) {
	const signIn = () => {
        setSigningIn(true);
    };

	const signUp = () => {
        setSigningUp(true)
    };

    const signOut = () => {
        setSignedIn(false)
        window.localStorage.removeItem('userid');
    }

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
						<button onClick={signOut}>Sign Out</button>
					</div>
				);
    }
}

export default UserDisplay;
