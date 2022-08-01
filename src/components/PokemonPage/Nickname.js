import React, { useState, useEffect } from 'react';
import './Nickname.css';

function Nickname({ pokemon, setPokemon }) {
	const [updating, setUpdating] = useState(false);

	const stopEdit = (event) => {
		event.preventDefault();
		setUpdating(false);
	};

	const handleChange = (event) => {
		event.preventDefault();
		setPokemon({ ...pokemon, nickname: event.target.value });
	};

	const editMode = (event) => {
		event.preventDefault();
		setUpdating(true);
	};

	if (updating) {
		return (
			<form className='nickname-form' onSubmit={stopEdit}>
				<input
					className='nickname-input'
					value={pokemon.nickname}
					onChange={handleChange}
					type='text'
					maxLength='10'
				/>
				<button type='submit'>submit</button>
			</form>
		);
	} else {
		return (
			<div className='nickname-display'>
				<span>{pokemon.nickname}</span>
				<button onClick={editMode}>edit</button>
			</div>
		);
	}
}

export default Nickname;
