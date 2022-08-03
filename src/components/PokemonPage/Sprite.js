import React, { useEffect, useState } from 'react';
import './Sprite.css';

function Sprite({ morePokemonInfo, pokeName }) {
	const [pokemonSprite, setPokemonSprite] = useState('');

	useEffect(() => {
		setPokemonSprite(
			`${morePokemonInfo.sprites.other['official-artwork'].front_default}`
		);
	}, []);

	if (pokemonSprite.length) {
		if (Object.keys(pokeName).length) {
			return (
				<img
					className='pokemon-sprite'
					src={pokemonSprite}
					alt={`${pokeName} sprite`}
				/>
			);
		}
	}
}

export default Sprite;
