import React, { useEffect, useState } from 'react';
import './TeamsPokemonSpriteImg.css';

function TeamsPokemonSpriteImg({ pokemon, index }) {
	const [sprite, setSprite] = useState('');

	useEffect(() => {
		fetch(pokemon.formUrl)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				const spriteUrl = res.sprites.front_default;
				setSprite(spriteUrl);
			});
	}, []);

	if (sprite.length) {
		return (
			<div className={index}>
				<img className='pokemon-sprite-img' src={sprite} alt='' />
			</div>
		);
	} else {
		return <div>bark</div>;
	}
}

export default TeamsPokemonSpriteImg;
