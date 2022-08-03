import React, { useEffect, useState } from 'react';
import TeamPokemonTyping from './TeamPokemonTyping';
import './TeamPokemon.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeamPokemon({ pokemon, getTeam }) {
	const [formInfo, setFormInfo] = useState({});

	useEffect(() => {
		fetch(pokemon.formUrl)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setFormInfo(res);
			});
	}, []);

	const navigate = useNavigate();

	const goToEditing = () => {
		navigate(`/pokemon/${pokemon._id}`);
	};

	const deletePokemon = async (event) => {
		try {
			const response = await axios.delete(
				`http://localhost:1738/api/pokemon/${pokemon._id}`
			);
		} catch (error) {
			console.log(error);
		}
		getTeam();
	};

	if (formInfo.forms) {
		return (
			<div className='team-pokemon-display-wrapper'>
				<span className='pokemon-name'>{pokemon.name}</span>
				<div className='middle-display'>
					<button onClick={goToEditing} className='poke-change-button'>
						edit
					</button>
					<img
						className='pokemon-image-display'
						src={formInfo.sprites.other['official-artwork'].front_default}
						alt=''
					/>
					<button onClick={deletePokemon} className='poke-change-button'>
						delete
					</button>
				</div>
				<TeamPokemonTyping formInfo={formInfo} />
			</div>
		);
	}
}

export default TeamPokemon;
