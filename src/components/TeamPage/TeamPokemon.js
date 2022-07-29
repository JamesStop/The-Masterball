import React, { useEffect, useState } from 'react';
import TeamPokemonTyping from './TeamPokemonTyping';
import './TeamPokemon.css';

function TeamPokemon({ pokemon }) {

	const [formInfo, setFormInfo] = useState({});



	useEffect(() => {
		fetch(pokemon.formUrl)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setFormInfo(res);
			});
	}, []);


	if (formInfo.forms) {
		return (
			<div className='team-pokemon-display-wrapper'>
				<span className='pokemon-name'>{pokemon.name}</span>
				<img className='pokemon-image-display' src={formInfo.sprites.other['official-artwork'].front_default} alt='' />
                <TeamPokemonTyping formInfo={formInfo}/>
			</div>
		);
	}
}

export default TeamPokemon;
