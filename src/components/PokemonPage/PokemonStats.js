import React, { useEffect, useState } from 'react';
import './PokemonStats.css';

function PokemonStats({
	morePokemonInfo,
	index,
	stat,
	speed,
	setSpeed,
	health,
	setHealth,
	attack,
	setAttack,
	defense,
	setDefense,
	sattack,
	setSattack,
	sdefense,
	setSdefense,
	level,
	nature,
}) {
	const [thisStat, setThisStat] = useState(
		useState({
			base: parseInt(morePokemonInfo.stats[index]['base_stat']),
			nature: 0,
			iv: 0,
			ev: 0,
			total: 0,
		})
	);

	const [statName, setStatName] = useState('');

	const [evAvailable, setEvAvailable] = useState(
		510 -
			parseInt(
				health.ev + attack.ev + defense.ev + sattack.ev + sdefense.ev + speed.ev
			)
	);

	useEffect(() => {
		setEvAvailable(
			510 -
				parseInt(
					health.ev +
						attack.ev +
						defense.ev +
						sattack.ev +
						sdefense.ev +
						speed.ev
				)
		);
	}, [health.ev, attack.ev, defense.ev, sattack.ev, sdefense.ev, speed.ev]);

	const updateStates = () => {
		if (stat == 'health') {
			setHealth(thisStat);
		} else if (stat == 'attack') {
			setAttack(thisStat);
		} else if (stat == 'defense') {
			setDefense(thisStat);
		} else if (stat == 'sattack') {
			setSattack(thisStat);
		} else if (stat == 'sdefense') {
			setSdefense(thisStat);
		} else if (stat == 'speed') {
			setSpeed(thisStat);
		}
	};

	useEffect(() => {}, [thisStat]);

	const firstload = () => {
		
		setThisStat({
			...thisStat,
			base: parseInt(morePokemonInfo.stats[index]['base_stat']),
		});
		let newName = stat;
		if (stat[0] == 's') {
			if (stat[1] == 'a' || stat[1] == 'd') {
				newName = stat[0] + 'p. ' + stat.slice(1);
			}
		}
		setStatName(newName);
		calcTotal();
	};

	useEffect(() => {
		firstload();
	}, []);

	useEffect(() => {
		if (nature?.decreasedStat?.name == statName) {
			return;
		}
		if (nature?.increasedStat == null || !nature.increasedStat) {
			setThisStat({ ...thisStat, nature: 0 });
		} else {
			if (nature?.increasedStat.name == statName) {
				setThisStat((previousState) => {
					return { ...previousState, nature: 1 };
				});
			} else {
				setThisStat({ ...thisStat, nature: 0 });
			}
		}
	}, [nature?.increasedStat?.name]);

	useEffect(() => {
		if (nature?.increasedStat?.name == statName) {
			return;
		}
		if (nature?.decreasedStat == null || !nature?.decreasedStat) {
			setThisStat({ ...thisStat, nature: 0 });
		} else {
			if (nature?.decreasedStat?.name == statName) {
				setThisStat({ ...thisStat, nature: -1 });
			} else {
				setThisStat({ ...thisStat, nature: 0 });
			}
		}
	}, [nature?.decreasedStat?.name]);

	useEffect(() => {
		setThisStat({
			...thisStat,
			base: parseInt(morePokemonInfo.stats[index]['base_stat']),
		});
	}, [morePokemonInfo]);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const calcTotal = () => {
		let natureMulti = 1;
		if (thisStat.nature == 1) {
			natureMulti = 1.1;
		} else if (thisStat.nature == -1) {
			natureMulti = 0.9;
		} else {
			natureMulti = 1;
		}
		let newTotal = thisStat.total;
		if (stat == 'health') {
			newTotal =
				Math.floor(
					0.01 *
						(2 * thisStat.base + thisStat.iv + Math.floor(0.25 * thisStat.ev)) *
						level
				) +
				level +
				10;
		} else {
			newTotal = Math.floor(
				(0.01 *
					(2 * thisStat.base + thisStat.iv + Math.floor(0.25 * thisStat.ev)) *
					level +
					5) *
					natureMulti
			);
		}
		setThisStat({ ...thisStat, total: newTotal });
	};

	useEffect(() => {
		calcTotal();
	}, [thisStat.base, thisStat.iv, thisStat.ev, level, nature]);

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
					<span>{thisStat.total}</span>
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
