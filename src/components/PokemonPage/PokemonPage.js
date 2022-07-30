import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonPage.css';

function PokemonPage(props) {
	const [pokemon, setPokemon] = useState({});
	const { id } = useParams();
	const [morePokemonInfo, setMorePokemonInfo] = useState({});

	useEffect(() => {
		getPokemon();
	}, []);

	useEffect(() => {
        if (pokemon._id) {
            getMoreInfo();
        }
	}, [pokemon]);

	useEffect(() => {
		// console.log(morePokemonInfo);
	}, [morePokemonInfo]);

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
	};

	return <div className='pokemon-customizer-wrapper'>{pokemon.name}</div>;
}

export default PokemonPage;
