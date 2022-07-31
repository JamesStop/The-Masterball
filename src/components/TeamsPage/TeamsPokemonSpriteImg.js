import React, { useEffect, useState } from 'react';
import './TeamsPokemonSpriteImg.css';
import Draggable from 'react-draggable';




function TeamsPokemonSpriteImg({ pokemon, index, onStop }) {
	const [sprite, setSprite] = useState('');
	let Draggable = require('react-draggable');


	

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
			<Draggable bounds='parent'>
				<img className={`pokemon-sprite-img ${index}`} src={sprite} alt='' />
			</Draggable>
		);
	} else {
		return <div>bark</div>;
	}
}

export default TeamsPokemonSpriteImg;
