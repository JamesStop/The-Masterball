import React, { useEffect, useState } from 'react';
import './Sprite.css';

function Sprite({ morePokemonInfo, pokemon }) {
	const [pokemonSprite, setPokemonSprite] = useState('');
	const [pokemonInfo, setPokemonInfo] = useState({});

	useEffect(() => {
		setPokemonSprite(
			`${morePokemonInfo.sprites.other['official-artwork'].front_default}`
		);
		setPokemonInfo(pokemon);
	}, []);

	if (pokemonSprite.length) {
		if (Object.keys(pokemonInfo).length) {
			return (
				<img
					className='pokemon-sprite'
					src={pokemonSprite}
					alt={`${pokemonInfo.name} sprite`}
				/>
			);
		}
	}
}

export default Sprite;
