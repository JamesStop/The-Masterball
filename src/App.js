import './App.css';
import { Routes, Route } from 'react-router-dom';
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

function App() {
	const POKE_URL = 'https://pokeapi.co/api/v2/';

	const [signingIn, setSigningIn] = useState(true);
	const [signingUp, setSigningUp] = useState(false);
	const [signedIn, setSignedIn] = useState(false);

	return (
		<div className='main-wrapper'>
			<header className=''>
				<div className='site-header-logo'>
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
					/>
				</div>
			</header>
			<main>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/user' />
					<Route path='/teams/' element={<TeamsPage />} />
					<Route path='/team/:id' element={<TeamPage POKE_URL={POKE_URL} />} />
					<Route path='/pokemon/:id' element={<PokemonPage />} />
				</Routes>
			</main>
			<SignIn signingIn={signingIn} setSigningIn={setSigningIn} />
			<SignUp signingUp={signingUp} setSigningUp={setSigningUp} />
		</div>
	);
}

export default App;
