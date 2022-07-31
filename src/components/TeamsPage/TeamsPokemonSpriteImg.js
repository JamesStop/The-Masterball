import React, { useEffect, useState } from 'react';
import './TeamsPokemonSpriteImg.css';
import Draggable from 'react-draggable';

function TeamsPokemonSpriteImg({ pokemon, index  }) {
	const [sprite, setSprite] = useState('');
    

	const positioning = {
		0: {
			x: 50,
			y: 0,
		},
		1: {
			x: 97,
			y: 20,
		},
		2: {
			x: 97,
			y: 82,
		},
		3: {
			x: 50,
			y: 102,
		},
		4: {
			x: 0,
			y: 82,
		},
		5: {
			x: 0,
			y: 20,
		},
	};

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
			<Draggable bounds='parent' defaultPosition={positioning[index]}>
				<img className={`pokemon-sprite-img`} src={sprite} alt='' />
			</Draggable>
		);
	} else {
		return <div>bark</div>;
	}
}

export default TeamsPokemonSpriteImg;
