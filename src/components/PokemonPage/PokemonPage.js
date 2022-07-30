import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonPage.css'

function PokemonPage(props) {
	const [pokemon, setPokemon] = useState({});
	const { id } = useParams();

	useEffect(() => {
		getPokemon();
	}, []);

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

	return <div>{pokemon.name}</div>;
}

export default PokemonPage;
