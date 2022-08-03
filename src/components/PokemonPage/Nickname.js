import React, { useState, useEffect } from 'react';
import './Nickname.css';

function Nickname({ nickName, setNickName }) {
	const [updating, setUpdating] = useState(false);

	const stopEdit = (event) => {
		event.preventDefault();
		setUpdating(false);
	};

	const handleChange = (event) => {
		event.preventDefault();
		setNickName(event.target.value);
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
					value={nickName}
					onChange={handleChange}
					type='text'
					minLength={1}
					maxLength={11}
				/>
				<button className='nick-name-submit-button' type='submit'>submit</button>
			</form>
		);
	} else {
		return (
			<div className='nickname-display'>
				<span>{nickName}</span>
				<button className='nick-name-edit-button' onClick={editMode}>
					edit
				</button>
			</div>
		);
	}
}

export default Nickname;
