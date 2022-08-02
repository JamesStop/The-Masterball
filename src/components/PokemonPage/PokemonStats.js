import React, { useEffect, useInsertionEffect, useState } from 'react';
import './PokemonStats.css';

function PokemonStats({ pokemon, stat, index, morePokemonInfo }) {
	const [thisStat, setThisStat] = useState(pokemon.stats[stat]);
	const [stateName, setStatName] = useState(stat)


	useEffect(() => {
		setThisStat({
			...thisStat,
			base: morePokemonInfo.stats[index]['base_stat'],
		});
		let newName = stat
		if (stat[0] == 's') {
			if (stat[1] == 'a' || stat[1] == 'd') {
				newName = stat[0] + 'p. ' + stat.slice(1)
			}
		}
		setStatName(newName)
	}, []);

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    useEffect(() => {

    }, [thisStat.base, thisStat.nature, thisStat.iv])
    

    const handleChange = (event) => {
        let numbers = event.target.value
        const id = event.target.id
        const max = event.target.max
		if (numbers == '') {
			numbers = 0
		}
        if (numbers > max) {
            numbers = max
        }
        setThisStat({...thisStat, [id]: parseInt(numbers)})
    }

	return (
		<div className='big-stat-wrapper'>
			<span className='stat-name'>{stateName}:</span>
			<section className='stat-wrapper'>
				<section className='stat-base-wrapper'>
					<span>Base:</span>
					<span>{morePokemonInfo.stats[index]['base_stat']}</span>
				</section>
				<section className='stat-iv-wrapper'>
					<form className='stat-form' onSubmit={handleSubmit}>
						<label htmlFor='iv'>IV:</label>
						<input
							className='stat-iv-input'
							id='iv'
							value={thisStat.iv}
							onChange={handleChange}
							type='number'
							min={0}
							max={31}
						/>
					</form>
				</section>
				<section className='stat-total-wrapper'>
					<span>Total:</span>
					<span>{pokemon.stats[stat].total}</span>
				</section>
				<section className='stat-ev-wrapper'>
					<form className='stat-form' onSubmit={handleSubmit}>
						<label htmlFor='ev'>EV:</label>
						<input
							className='stat-ev-input'
							id='ev'
							value={thisStat.ev}
							onChange={handleChange}
							type='number'
							min={0}
							max={255}
						/>
					</form>
				</section>
			</section>
		</div>
	);
}

export default PokemonStats;
