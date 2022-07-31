import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonPage.css';
import Sprite from './Sprite';

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
			const results = await response.data;
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
		const newLevel = event.target.value;
		await setPokemon({ ...pokemon, level: newLevel });
		
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
								<form className='level-form'>
									<label className='label-level'htmlFor="level">Level</label>
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
							<section className='name-nickname-level-wrapper'>
								<span>{pokemon.name} /</span>
								<span>{pokemon.nickName}</span>
							</section>
							<div className='image-wrapper'>
								<Sprite morePokemonInfo={morePokemonInfo} pokemon={pokemon} />
							</div>
						</section>
					</div>
				);
			}
		}
	}
}

export default PokemonPage;
