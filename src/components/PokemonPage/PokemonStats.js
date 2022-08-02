import React, { useEffect, useInsertionEffect, useState } from 'react';
import './PokemonStats.css';

function PokemonStats({ morePokemonInfo, pokemon, setPokemon, stat, index }) {
	const [thisStat, setThisStat] = useState({
		...pokemon.stats[stat],
		base: morePokemonInfo.stats[index]['base_stat'],
	});
	const [statName, setStatName] = useState(stat);
	const [pokemonLevel, setPokemonLevel] = useState(pokemon.level);
	const [evAvailable, setEvAvailable] = useState(
		510 -
			parseInt(
				pokemon.stats.health.ev +
					pokemon.stats.attack.ev +
					pokemon.stats.defense.ev +
					pokemon.stats.sattack.ev +
					pokemon.stats.sdefense.ev +
					pokemon.stats.speed.ev
			)
	);

	useEffect(() => {
		setPokemonLevel(pokemon.level);
	}, [pokemon.level]);

	useEffect(() => {
		setEvAvailable(
			510 -
				parseInt(
					pokemon.stats.health.ev +
						pokemon.stats.attack.ev +
						pokemon.stats.defense.ev +
						pokemon.stats.sattack.ev +
						pokemon.stats.sdefense.ev +
						pokemon.stats.speed.ev
				)
		);
	}, [
		pokemon.stats.health.ev,
		pokemon.stats.attack.ev,
		pokemon.stats.defense.ev,
		pokemon.stats.sattack.ev,
		pokemon.stats.sdefense.ev,
		pokemon.stats.speed.ev,
	]);

	const firstload = async () => {
		await setThisStat({
			...thisStat,
			base: parseInt(morePokemonInfo.stats[index]['base_stat']),
		});
		let newName = stat;
		if (stat[0] == 's') {
			if (stat[1] == 'a' || stat[1] == 'd') {
				newName = stat[0] + 'p. ' + stat.slice(1);
			}
		}
		await setStatName(newName);
		await calcTotal();
		updatePokemon();
	};

	useEffect(() => {
		firstload()
	}, []);

	useEffect(() => {
		if (pokemon.nature.increasedStat == null || !pokemon.nature.increasedStat) {
			setThisStat({ ...thisStat, nature: 0 });
		} else {
			if (pokemon.nature.increasedStat.name == statName) {
				console.log(statName + 'positive');
				setThisStat({ ...thisStat, nature: 1 });
			} else {
				setThisStat({ ...thisStat, nature: 0 });
			}
		}
	}, [pokemon.nature.increasedStat]);

	useEffect(() => {
		if (pokemon.nature.decreasedStat == null || !pokemon.nature.decreasedStat) {
			setThisStat({ ...thisStat, nature: 0 });
		} else {
			if (pokemon.nature.decreasedStat.name == statName) {
				console.log(statName + 'negative');
				setThisStat({ ...thisStat, nature: -1 });
			} else {
				setThisStat({ ...thisStat, nature: 0 });
			}
		}
	}, [pokemon.nature.decreasedStat]);

	const updatePokemon = () => {
		setPokemon({ ...pokemon, stats: { ...pokemon.stats, [stat]: thisStat } });
	};

	useEffect(() => {
		setThisStat({
			...thisStat,
			base: parseInt(morePokemonInfo.stats[index]['base_stat']),
		});
	}, [morePokemonInfo]);

	useEffect(() => {
		updatePokemon();
	}, [thisStat]);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const calcTotal = () => {
		let natureMulti = 1;
		if (thisStat.nature == 0) {
			natureMulti = 1;
		} else if (thisStat.nature == 1) {
			natureMulti = 1.1;
		} else if (thisStat.nature == -1) {
			natureMulti = 0.9;
		}
		let newTotal = thisStat.total;
		if (stat == 'health') {
			newTotal =
				Math.floor(
					0.01 *
						(2 * thisStat.base + thisStat.iv + Math.floor(0.25 * thisStat.ev)) *
						pokemonLevel
				) +
				pokemonLevel +
				10;
		} else {
			newTotal = Math.floor(
				((
					0.01 *
						(2 * thisStat.base + thisStat.iv + Math.floor(0.25 * thisStat.ev)) *
						pokemonLevel
				) +
					5) *
					natureMulti
			);
		}
		setThisStat({ ...thisStat, total: newTotal });
	};

	useEffect(() => {
		calcTotal();
	}, [thisStat.base, thisStat.iv, thisStat.ev, pokemon.level, thisStat.nature]);

	const handleChange = (event) => {
		let numbers = event.target.value;
		const id = event.target.id;
		const max = event.target.max;
		if (numbers == '') {
			numbers = 0;
		}
		if (parseInt(numbers) > max) {
			numbers = max;
		}
		setThisStat({ ...thisStat, [id]: parseInt(numbers) });
	};

	return (
		<div className='big-stat-wrapper'>
			<span className='stat-name'>{statName}:</span>
			<button onClick={calcTotal}>calc</button>
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
							max={evAvailable >= 255 ? 255 : evAvailable + thisStat.ev}
						/>
					</form>
				</section>
			</section>
		</div>
	);
}

export default PokemonStats;
