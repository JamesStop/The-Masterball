import React, { useInsertionEffect } from 'react';
import { useEffect, useState } from 'react';
import DropDownDisplay from './DropDownDisplay';

function TeamPage({ POKE_URL }) {
	const [species, setSpecies] = useState([]);

	useInsertionEffect(() => {
		fetch(`${POKE_URL}pokemon-species/?limit=905`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setSpecies([...res.results]);
			});
	}, []);

	return (
		<div>
			<section className='pokemon-selectors-wrapper'>
				<div className='pokemon-selector-wrapper'>
					<label htmlFor='gen1'>Generation 1</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index < 151;
							})
							.map((specie, index) => {
								return <DropDownDisplay key={index} specie={specie} index={index} />;
							})}
					</select>
				</div>
			</section>
		</div>
	);
}

export default TeamPage;
