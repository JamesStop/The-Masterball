import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import TeamsPage from './components/TeamsPage/TeamsPage';
import TeamPage from './components/TeamPage/TeamPage';
import PokemonPage from './components/PokemonPage/PokemonPage';


function App() {
  return (
		<div className='main-wrapper'>
			<header>header</header>
			<main>
				<Routes>
					<Route path='/' element={<Homepage />} />
					<Route path='/teams/' element={<TeamsPage />} />
					<Route path='/team/' element={<TeamPage />} />
					<Route path='/pokemon/' element={<PokemonPage />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
