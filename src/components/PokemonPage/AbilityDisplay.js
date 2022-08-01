import React, { useEffect, useState } from 'react';
import './AbilityDisplay.css';

function AbilityDisplay({ morePokemonInfo, pokemon, setPokemon }) {
	const [editing, setEditing] = useState(false);

	const handleClick = (event) => {
		const url = event.target.options[event.target.selectedIndex].value;
		if (event.target.value != '#') {
			fetch(`${url}`)
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					const abilityEffect = res['effect_entries'][1].effect;
					const abilityName = res.name[0].toUpperCase() + res.name.slice(1);
					setPokemon({
						...pokemon,
						ability: { name: abilityName, effect: abilityEffect },
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
			<select className='ability-selector' onClick={handleClick}>
				<option value='#'>Abilities</option>
				{morePokemonInfo.abilities.map((abilities, index) => {
					return (
						<option value={abilities.ability.url} key={index}>
							{abilities.ability.name[0].toUpperCase() +
								abilities.ability.name.slice(1)}
						</option>
					);
				})}
			</select>
		);
	} else {
		if (pokemon.ability.name.length) {
			return (
				<div className='ability-info-display'>
					<span className='ability-name-display'>{pokemon.ability.name}:</span>{' '}
					<span className='ability-effect-display'>
						{pokemon.ability.effect}
					</span>
					<button onClick={editMode}>Change</button>
				</div>
			);
		} else {
			return (
				<div className='ability-info-display'>
					<button onClick={editMode}>Select</button>
				</div>
			);
		}
	}
}

export default AbilityDisplay;
