import React, { useInsertionEffect } from 'react';
import { useEffect, useState } from 'react';

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
					<label for='gen1'>Generation 1</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index < 151;
							})
							.map((specie) => {
								return <option>{specie.name}</option>;
							})}
					</select>
				</div>
			</section>
			{species.map((specie) => {
				return <div>{specie.index}</div>;
			})}
		</div>
	);
}

export default TeamPage;
