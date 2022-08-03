import React from 'react';
import './UserDisplay.css';
import { useNavigate } from 'react-router-dom';

function UserDisplay({ setSigningUp, setSigningIn, signedIn, setSignedIn }) {

	const navigate = useNavigate()

	const signIn = () => {
        setSigningIn(true);
    };

	const signUp = () => {
        setSigningUp(true)
    };

    const signOut = () => {
        setSignedIn(false)
        window.localStorage.removeItem('userid');
		window.localStorage.removeItem('username');
    }

	const goToTeams = () => {
		navigate('/teams')
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
						<div className='user' onClick={goToTeams}>
							<span>
								{localStorage.getItem('username').length > 3
									? 'you'
									: localStorage.getItem('username')}
							</span>
						</div>
						<button onClick={signOut}>Sign Out</button>
					</div>
				);
    }
}

export default UserDisplay;
