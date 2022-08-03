import React, { useEffect, useState } from 'react';
import './PokemonStats.css';

function PokemonStatSDefense({
	morePokemonInfo,
	index,
	stat,
	setSdefense,
	speed,
	attack,
	defense,
	health,
	sattack,
	sdefense,
	level,
}) {
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



	const firstload = () => {
		setSdefense({
			...sdefense,
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
		setSdefense({
			...sdefense,
			base: parseInt(morePokemonInfo.stats[index]['base_stat']),
		});
	}, [morePokemonInfo]);

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const calcTotal = () => {
		let natureMulti = 1;
		if (sdefense.nature == 1) {
			natureMulti = 1.1;
		} else if (sdefense.nature == -1) {
			natureMulti = 0.9;
		} else {
			natureMulti = 1;
		}
		let newTotal = sdefense.total;
		if (stat == 'health') {
			newTotal =
				Math.floor(
					0.01 *
						(2 * sdefense.base + sdefense.iv + Math.floor(0.25 * sdefense.ev)) *
						level
				) +
				level +
				10;
		} else {
			newTotal = Math.floor(
				(0.01 *
					(2 * sdefense.base + sdefense.iv + Math.floor(0.25 * sdefense.ev)) *
					level +
					5) *
					natureMulti
			);
		}
		
		setSdefense({ ...sdefense, total: newTotal });
	};

	useEffect(() => {
		calcTotal();
	}, [sdefense.base, sdefense.iv, sdefense.ev, level, sdefense.nature]);

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
		setSdefense({ ...sdefense, [id]: parseInt(numbers) });
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
							value={sdefense.iv}
							onChange={handleChange}
							type='number'
							min={0}
							max={31}
						/>
					</form>
				</section>
				<section className='stat-total-wrapper'>
					<span>Total:</span>
					<span>{sdefense.total}</span>
				</section>
				<section className='stat-ev-wrapper'>
					<form className='stat-form' onSubmit={handleSubmit}>
						<label htmlFor='ev'>EV:</label>
						<input
							className='stat-ev-input'
							id='ev'
							value={sdefense.ev}
							onChange={handleChange}
							type='number'
							min={0}
							max={evAvailable >= 255 ? 255 : evAvailable + sdefense.ev}
						/>
					</form>
				</section>
			</section>
		</div>
	);
}

export default PokemonStatSDefense;
