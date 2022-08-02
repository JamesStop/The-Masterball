import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonPage.css';
import Sprite from './Sprite';
import Nickname from './Nickname';
import TeamPokemonTyping from '../TeamPage/TeamPokemonTyping';
import AbilityDisplay from './AbilityDisplay';
import NatureDisplay from './NatureDisplay';

function PokemonPage(props) {
	const [pokemon, setPokemon] = useState({});
	const { id } = useParams();
	const [morePokemonInfo, setMorePokemonInfo] = useState({});
	const [pokemonSpecies, setPokemonSpecies] = useState({});

	useEffect(() => {
		getPokemon();
	}, []);

	useEffect(() => {
		if (pokemon._id) {
			getMoreInfo();
		}
		updatePokemon();
	}, [pokemon]);

	useEffect(() => {}, [morePokemonInfo]);

	const getPokemon = async () => {
		try {
			const response = await axios.get(
				`http://localhost:1738/api/pokemon/${id}`
			);
			let results = {};
			if (response.data.owner == window.localStorage.getItem('userid')) {
				results = response.data;
			}
			setPokemon(results);
		} catch (error) {
			console.log(error);
		}
	};

	const getMoreInfo = () => {
		fetch(`${pokemon.formUrl}`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setMorePokemonInfo(res);
			});
		fetch(`${pokemon.speciesUrl}`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setPokemonSpecies(res);
			});
	};

	const updatePokemon = async () => {
		try {
			const response = await axios.patch(
				`http://localhost:1738/api/pokemon/${id}`,
				pokemon
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLevelChange = async (event) => {
		event.preventDefault();
		const newLevel = event.target.value;
		await setPokemon({ ...pokemon, level: newLevel });
	};

	const stopRefresh = (event) => {
		event.preventDefault();
	};

	if (Object.keys(pokemon).length) {
		if (Object.keys(morePokemonInfo).length) {
			if (Object.keys(pokemonSpecies).length) {
				return (
					<div className='pokemon-customizer-wrapper'>
						<section className='big-info-wrapper'>
							<div className='pokemon-number'>
								<span>#{pokemonSpecies.id}</span>
							</div>
							<div className='pokemon-level'>
								<form className='level-form' onSubmit={stopRefresh}>
									<label className='label-level' htmlFor='level'>
										Level
									</label>
									<input
										value={pokemon.level}
										type='number'
										min={1}
										max={100}
										className='level-input'
										id='level'
										onChange={handleLevelChange}
									/>
								</form>
							</div>
							<section className='name-nickname-wrapper'>
								<span className='pokemon-name'>{pokemon.name}, aka:</span>
								<Nickname pokemon={pokemon} setPokemon={setPokemon} />
							</section>
							<div className='image-wrapper'>
								<Sprite morePokemonInfo={morePokemonInfo} pokemon={pokemon} />
							</div>
							<TeamPokemonTyping formInfo={morePokemonInfo} />
						</section>
						<section className='ability-nature-wrapper'>
							<section className='ability-wrapper'>
								<span className='underlined'>Ability Info:</span>
								<AbilityDisplay
									morePokemonInfo={morePokemonInfo}
									pokemon={pokemon}
									setPokemon={setPokemon}
								/>
							</section>
							<section className='nature-wrapper'>
								<span className='underlined'>Nature Info:</span>
								<NatureDisplay
									morePokemonInfo={morePokemonInfo}
									pokemon={pokemon}
									setPokemon={setPokemon}
								/>
							</section>
						</section>
						<section></section>
					</div>
				);
			}
		}
	}
}

export default PokemonPage;
