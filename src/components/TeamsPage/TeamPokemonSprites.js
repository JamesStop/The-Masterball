import React, { useEffect, useState } from 'react';
import './TeamPokemonSprites.css';
import TeamsPokemonSpriteImg from './TeamsPokemonSpriteImg';

function TeamPokemonSprites({ team }) {
	const [teamInfo, setTeamInfo] = useState({});

	useEffect(() => {
		setTeamInfo(team);
	}, []);

	if (teamInfo.pokemons) {
		if (teamInfo.pokemons.length) {
			return (
				<section className='pokemon-sprites-wrapper'>
					{teamInfo.pokemons.map((pokemon, index) => {
						return <TeamsPokemonSpriteImg index={index} key={pokemon._id} pokemon={pokemon} />;
					})}
				</section>
			);
		} else {
			return <section className='pokemon-sprites-wrapper'>hi</section>;
		}
	} else {
		return <section className='pokemon-sprites-wrapper'>hi</section>;
	}
}

export default TeamPokemonSprites;