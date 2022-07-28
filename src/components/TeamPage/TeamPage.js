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
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
					<label htmlFor='gen1'>Generation 2</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index >= 151 && index < 252;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
					<label htmlFor='gen1'>Generation 3</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index >= 252 && index < 386;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
					<label htmlFor='gen1'>Generation 4</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index >= 386 && index < 494;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
					<label htmlFor='gen1'>Generation 5</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index >= 494 && index < 649;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
					<label htmlFor='gen1'>Generation 6</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index >= 649 && index < 721;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
					<label htmlFor='gen1'>Generation 7</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index >= 721 && index < 809;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
					<label htmlFor='gen1'>Generation 8</label>
					<select id='gen1'>
						{species
							.filter((specie, index) => {
								return index >= 809;
							})
							.map((specie, index) => {
								return (
									<DropDownDisplay
										key={index}
										specie={specie}
										species={species}
									/>
								);
							})}
					</select>
				</div>
			</section>
		</div>
	);
}

export default TeamPage;
