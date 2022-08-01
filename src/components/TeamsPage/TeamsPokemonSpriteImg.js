import React, { useEffect, useState } from 'react';
import './TeamsPokemonSpriteImg.css';
import Draggable from 'react-draggable';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TeamsPokemonSpriteImg({ team, pokemon, index, position  }) {
	const [sprite, setSprite] = useState('');
    const [positions, setPositions] = useState({})
	const {id} = useParams();
	const positionValue = index
	console.log(position)

	useEffect(() => {
		fetch(pokemon.formUrl)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				const spriteUrl = res.sprites.front_default;
				setSprite(spriteUrl);
			});
		setPositions(team.positioning)
	}, []);

	const handleStop = (event) => {
		console.log(positionValue)
		const arrayChange = event.target.style.transform.slice(10).slice(0, -1).split(', ');
		const noPxArray = []
		arrayChange.forEach((string) => {
			noPxArray.push(parseInt(string.slice(0, -2)));
		})
		console.log(noPxArray)
		setPositions({
			...positions,
			[positionValue]: {
				x: noPxArray[0],
				y: noPxArray[1],
			},
		});
		// setPositions({...positions, index: event.target.style})
	}

	const updateTeam = async () => {
		try {
			const response = await axios.patch(
				`http://localhost:1738/api/teams/${id}`,
				{ ...team, positioning: positions }
			);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		updateTeam()
	}, [positions])

	if (sprite.length) {
		if (positions) {
			return (
				<Draggable bounds='parent' defaultPosition={positions[index]} onStop={handleStop}>
					<img className={`pokemon-sprite-img`} src={sprite} alt='' />
				</Draggable>
			);
		}
	} else {
		return <div></div>;
	}
}

export default TeamsPokemonSpriteImg;
