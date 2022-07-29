import { typeImplementation } from '@testing-library/user-event/dist/type/typeImplementation';
import React, { useState, useEffect } from 'react';
import './TeamPokemonTyping.css';

function TeamPokemonTyping({ formInfo }) {
	const [typing, setTyping] = useState([]);

	useEffect(() => {
		setTyping(formInfo.types);
	}, []);

	if (typing.length) {
		return (
			<div className='typing-display'>
				{typing.map((types) => {
					return (
						<div className={types.type.name}>
							<span>{types.type.name}</span>
						</div>
					);
				})}
			</div>
		);
	}
}

export default TeamPokemonTyping;
