import React, { useEffect, useState } from 'react';
import './TeamsPokemonSpriteImg.css';

function TeamsPokemonSpriteImg({ pokemon }) {
	const [sprite, setSprite] = useState('');

	useEffect(() => {
		fetch(pokemon.formUrl)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				console.log(res);
				const spriteUrl = res.sprites.front_default;
				setSprite(spriteUrl);
			});
	}, []);

	if (sprite.length) {
		return <img className='pokemon-sprite-img' src={sprite} alt='' />;
	} else {
		return <div>bark</div>;
	}
}

export default TeamsPokemonSpriteImg;
