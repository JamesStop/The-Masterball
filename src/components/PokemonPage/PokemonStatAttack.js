import React, { useEffect, useState } from 'react';
import './PokemonStats.css';

function PokemonStatAttack({
	morePokemonInfo,
	index,
	stat,
	setAttack,
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



	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const calcTotal = () => {
		let natureMulti = 1;
		if (attack.nature == 1) {
			natureMulti = 1.1;
		} else if (attack.nature == -1) {
			natureMulti = 0.9;
		} else {
			natureMulti = 1;
		}
		let newTotal = attack.total;
		if (stat == 'health') {
			newTotal =
				Math.floor(
					0.01 *
						(2 * attack.base + attack.iv + Math.floor(0.25 * attack.ev)) *
						level
				) +
				level +
				10;
		} else {
			newTotal = Math.floor(
				(0.01 *
					(2 * attack.base + attack.iv + Math.floor(0.25 * attack.ev)) *
					level +
					5) *
					natureMulti
			);
		}
		setAttack({ ...attack, total: newTotal });
	};

	useEffect(() => {
		calcTotal();
	}, [attack.base, attack.iv, attack.ev, level, attack.nature]);

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
		setAttack({ ...attack, [id]: parseInt(numbers) });
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
							value={attack.iv}
							onChange={handleChange}
							type='number'
							min={0}
							max={31}
						/>
					</form>
				</section>
				<section className='stat-total-wrapper'>
					<span>Total:</span>
					<span>{attack.total}</span>
				</section>
				<section className='stat-ev-wrapper'>
					<form className='stat-form' onSubmit={handleSubmit}>
						<label htmlFor='ev'>EV:</label>
						<input
							className='stat-ev-input'
							id='ev'
							value={attack.ev}
							onChange={handleChange}
							type='number'
							min={0}
							max={evAvailable + attack.ev >= 255 ? 255 : evAvailable + attack.ev}
						/>
					</form>
				</section>
			</section>
		</div>
	);
}

export default PokemonStatAttack;
