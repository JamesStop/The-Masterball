import React, { useEffect, useState } from 'react';
import './NatureDisplay.css';
import IncreasedStat from './IncreasedStat';
import DecreasedStat from './DecreasedStat';

function NatureDisplay({ morePokemonInfo, pokemon, setPokemon }) {
	const [editing, setEditing] = useState(false);

	const [natures, setNatures] = useState([]);

	useEffect(() => {
		fetch('https://pokeapi.co/api/v2/nature?limit=24')
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				const natureInfo = res.results;
				setNatures(natureInfo);
			});
	}, []);

	const handleClick = (event) => {
		event.preventDefault();
		const url = event.target.options[event.target.selectedIndex].value;
		if (event.target.value != '#') {
			fetch(`${url}`)
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					const natureName = res.name[0].toUpperCase() + res.name.slice(1);
					const statIncrease = res['increased_stat'];
					if (statIncrease) {
						statIncrease.name = statIncrease.name.split('ecial-').join('. ');
					}
					const statDecrease = res['decreased_stat'];
					if (statDecrease) {
						statDecrease.name = statDecrease.name.split('ecial-').join('. ');
					}
					setPokemon({
						...pokemon,
						nature: {
							name: natureName,
							increasedStat: statIncrease,
							decreasedStat: statDecrease,
						},
					});
				});
			setEditing(false);
		}
		event.target.value = '#';
	};

	const editMode = (event) => {
		event.preventDefault();
		setEditing(true);
	};

	if (editing) {
		return (
			<select className='nature-selector' onClick={handleClick}>
				<option value='#'>Natures</option>
				{natures.map((natures, index) => {
					return (
						<option value={natures.url} key={index}>
							{natures.name[0].toUpperCase() + natures.name.slice(1)}
						</option>
					);
				})}
			</select>
		);
	} else {
		if (pokemon.nature.name.length) {
			return (
				<div className='ability-info-display'>
					<span className='ability-name-display'>{pokemon.nature.name}:</span>
					<IncreasedStat pokemon={pokemon} />
					<DecreasedStat pokemon={pokemon} />
					<button onClick={editMode}>Change</button>
				</div>
			);
		} else {
			return (
				<div className='nature-info-display'>
					<button onClick={editMode}>Select</button>
				</div>
			);
		}
	}
}

export default NatureDisplay;
