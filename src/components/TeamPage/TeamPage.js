import React, { useInsertionEffect } from 'react';
import { useEffect, useState } from 'react';
import DropDownDisplay from './DropDownDisplay';
import TeamPokemon from './TeamPokemon';
import './TeamPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TeamPage({ POKE_URL, signedIn }) {
	const [species, setSpecies] = useState([]);
	const [team, setTeam] = useState([]);
	const { id } = useParams();
	const [creatingPokemon, setCreatingPokemon] = useState({});

	const getTeam = async () => {
		try {
			const response = await axios.get(`http://localhost:1738/api/teams/${id}`);
			let results = {};
			if (response.data.owner == window.localStorage.getItem('userid')) {
				results = response.data;
			}
			setTeam(results);
		} catch (error) {
			console.log(error);
		}
	};

	async function createPokemon() {
		try {
			const response = await axios.post(
				`http://localhost:1738/api/pokemon`,
				creatingPokemon
			);
		} catch (error) {
			console.log(error);
		}
		getTeam();
	}

	useEffect(() => {
		getTeam();
	}, [signedIn]);

	useEffect(() => {
		fetch(`${POKE_URL}pokemon-species/?limit=905`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setSpecies([...res.results]);
			});
		getTeam();
	}, []);

	useEffect(() => {
		createPokemon();
	}, [creatingPokemon]);

	const handleClick = (event) => {
		const url = event.target.options[event.target.selectedIndex].value;
		if (event.target.value != '#') {
			if (team.pokemons.length < 6) {
				fetch(`${url}`)
					.then((res) => {
						return res.json();
					})
					.then((res) => {
						const pokemonName = res.name[0].toUpperCase() + res.name.slice(1);
						setCreatingPokemon({
							owner: window.localStorage.getItem('userid'),
							name: pokemonName,
							nickname: pokemonName,
							speciesUrl: url,
							formUrl: res.varieties[0].pokemon.url,
							level: 1,
							teamId: id,
							ability: {
								name: '',
								effect: '',
							},
							nature: {
								name: '',
								increasedStat: {
									name: '',
									url: '',
								},
								decreasedStat: {
									name: '',
									url: '',
								},
							},
							stats: {
								health: {
									base: 0,
									nature: 0,
									iv: 0,
									ev: 0,
									total: 0,
								},
								attack: {
									base: 0,
									nature: 0,
									iv: 0,
									ev: 0,
									total: 0,
								},
								defense: {
									base: 0,
									nature: 0,
									iv: 0,
									ev: 0,
									total: 0,
								},
								sattack: {
									base: 0,
									nature: 0,
									iv: 0,
									ev: 0,
									total: 0,
								},
								sdefense: {
									base: 0,
									nature: 0,
									iv: 0,
									ev: 0,
									total: 0,
								},
								speed: {
									base: 0,
									nature: 0,
									iv: 0,
									ev: 0,
									total: 0,
								},
							},
						});
					});
			}
		}
		event.target.value = '#';
	};

	if (team.pokemons) {
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
					{team.pokemons.map((pokemon, index) => {
						return (
							<TeamPokemon
								getTeam={getTeam}
								key={pokemon._id}
								pokemon={pokemon}
							/>
						);
					})}
				</section>
			</div>
		);
	}
}

export default TeamPage;
