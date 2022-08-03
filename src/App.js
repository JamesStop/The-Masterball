import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import TeamsPage from './components/TeamsPage/TeamsPage';
import TeamPage from './components/TeamPage/TeamPage';
import PokemonPage from './components/PokemonPage/PokemonPage';
import Profile from './components/UserPieces/Profile';
import SignIn from './components/UserPieces/SignIn';
import SignUp from './components/UserPieces/SignUp';
import Masterball from './assets/masterball.png';
import UserDisplay from './components/UserPieces/UserDisplay';
import { useEffect, useState } from 'react';
import PleaseSignIn from './components/PleaseSignIn/PleaseSignIn';

function App() {
	const POKE_URL = 'https://pokeapi.co/api/v2/';

	const [signingIn, setSigningIn] = useState(false);
	const [signingUp, setSigningUp] = useState(false);
	const [signedIn, setSignedIn] = useState(
		!localStorage.getItem('userid')
			? false
			: localStorage.getItem('userid') == 'undefined'
			? false
			: true
	);

	const navigate = useNavigate()

	const handleGohome = () => {
		navigate('/')
	}

	return (
		<div className='main-wrapper'>
			<header className=''>
				<div className='site-header-logo' onClick={handleGohome}>
					<img className='masterball-logo' src={Masterball} alt='masterball' />
					<h1 className='header-title'>
						<span className='site-heading'>The Masterball:</span>
						<span className='sub-heading'>
							Your Pokemon team building resource
						</span>
					</h1>
				</div>
				<div className='user-stuff'>
					<UserDisplay
						setSigningIn={setSigningIn}
						setSigningUp={setSigningUp}
						signedIn={signedIn}
						setSignedIn={setSignedIn}
					/>
				</div>
			</header>
			<main>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/user' />
					<Route
						path='/teams/'
						element={
							!signedIn ? <PleaseSignIn /> : <TeamsPage signedIn={signedIn} />
						}
					/>
					<Route
						path='/team/:id'
						element={
							!signedIn ? (
								<PleaseSignIn />
							) : (
								<TeamPage signedIn={signedIn} POKE_URL={POKE_URL} />
							)
						}
					/>
					<Route
						path='/pokemon/:id'
						element={
							!signedIn ? <PleaseSignIn /> : <PokemonPage signedIn={signedIn} />
						}
					/>
				</Routes>
			</main>
			<SignIn
				signingIn={signingIn}
				setSigningIn={setSigningIn}
				setSignedIn={setSignedIn}
			/>
			<SignUp signingUp={signingUp} setSigningUp={setSigningUp} />
		</div>
	);
}

export default App;
