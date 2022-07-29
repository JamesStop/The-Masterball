import React, { useInsertionEffect } from 'react';
import { useEffect, useState } from 'react';
import DropDownDisplay from './DropDownDisplay';
import TeamPokemon from './TeamPokemon';
import './TeamPage.css';

function TeamPage({ POKE_URL }) {
	const [species, setSpecies] = useState([]);
	const [team, setTeam] = useState([]);

	useEffect(() => {
		fetch(`${POKE_URL}pokemon-species/?limit=905`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setSpecies([...res.results]);
			});
	}, []);

	const handleClick = (event) => {
		const url = event.target.options[event.target.selectedIndex].value;
		if (event.target.value != '#') {
			if (team.length < 6) {
				fetch(`${url}`)
					.then((res) => {
						return res.json();
					})
					.then((res) => {
						setTeam([
							...team,
							{
								name: res.name,
								speciesUrl: url,
								formUrl: res.varieties[0].pokemon.url,
							},
						]);
					});
			}
		}
		event.target.value = '#'
	};

	return (
		<div className='team-wrapper'>
			<section className='pokemon-selectors-wrapper'>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen1'>Generation 1</label>
					<select id='gen1' onClick={handleClick}>
						<option value='#'>001-151</option>
						{species
							.filter((specie, index) => {
								return index < 151;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen2'>Generation 2</label>
					<select id='gen2' onClick={handleClick}>
						<option value='#'>152-251</option>
						{species
							.filter((specie, index) => {
								return index >= 151 && index < 251;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen3'>Generation 3</label>
					<select id='gen3' onClick={handleClick}>
						<option value='#'>252-386</option>
						{species
							.filter((specie, index) => {
								return index >= 251 && index < 386;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen4'>Generation 4</label>
					<select id='gen4' onClick={handleClick}>
						<option value='#'>387-494</option>
						{species
							.filter((specie, index) => {
								return index >= 386 && index < 494;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen5'>Generation 5</label>
					<select id='gen5' onClick={handleClick}>
						<option value='#'>495-649</option>
						{species
							.filter((specie, index) => {
								return index >= 494 && index < 649;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen6'>Generation 6</label>
					<select id='gen6' onClick={handleClick}>
						<option value='#'>650-721</option>
						{species
							.filter((specie, index) => {
								return index >= 649 && index < 721;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen7'>Generation 7</label>
					<select id='gen7' onClick={handleClick}>
						<option value='#'>722-809</option>
						{species
							.filter((specie, index) => {
								return index >= 721 && index < 809;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen8'>Generation 8</label>
					<select id='gen8' onClick={handleClick}>
						<option value='#'>810-905</option>
						{species
							.filter((specie, index) => {
								return index >= 809 && index < 905;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
			</section>
			<section className='team-display-wrapper'>
				{team.map((pokemon, index) => {
					return <TeamPokemon key={pokemon.name + index} pokemon={pokemon} />;
				})}
			</section>
		</div>
	);
}

export default TeamPage;
