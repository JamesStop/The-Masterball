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

	if (Object.keys(pokemon).length) {
		if (Object.keys(morePokemonInfo).length) {
			if (Object.keys(pokemonSpecies).length) {
				return (
					<div className='pokemon-customizer-wrapper'>
						<div className='big-info-wrapper'>
							<div className='naming-wrapper'>
								<span>{pokemon.name}</span>
							</div>
							<div className='nickname-wrapper'></div>
							<div className='level-wrapper'></div>
							<div className='image-wrapper'>
								<Sprite morePokemonInfo={morePokemonInfo} pokemon={pokemon}/>
							</div>
						</div>
					</div>
				);
			}
		}
	}
}

export default PokemonPage;
