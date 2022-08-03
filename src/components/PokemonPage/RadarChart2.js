import React, { useContext } from 'react';
import { Radar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { ChartContext } from './PokemonPage';

function RadarChart2({
	setChartShowing,
	health,
	attack,
	defense,
	sattack,
	sdefense,
	speed,
}) {
	const RadarData = {
		labels: [
			'Health',
			'Attack',
			'Defense',
			'Speed',
			'Sp. Defense',
			'Sp. Attack',
		],
		datasets: [
			{
				label: 'Stat Totals',
				backgroundColor: 'rgba(34, 42, 236, .2)',
				borderColor: 'rgba(34, 42, 236, 1)',
				pointBackgroundColor: 'rgba(34, 202, 236, 1)',
				poingBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
				data: [
					health.total,
					attack.total,
					defense.total,
					speed.total,
					sdefense.total,
					sattack.total,
				],
			},
		],
	};

	const RadarOptions = {
		scale: {
			r: {
				suggestedMin: 0,
			},
			ticks: {
				min: 0,
				stepSize: 20,
				showLabelBackdrop: false,
				backdropColor: 'rgba(203, 197, 11, 1)',
			},
			angleLines: {
				color: 'rgba(255, 255, 255, .3)',
				lineWidth: 1,
			},
			gridLines: {
				color: 'rgba(255, 255, 255, .3)',
				circular: true,
			},
		},
	};

	const chartRef = React.createRef();
	const handleClick = () => {
		setChartShowing(false);
	};

	return (
		<div className='radar-chart-container'>
			<button onClick={handleClick} className='exit-chart-button'>
				X
			</button>
			<Radar ref={chartRef} data={RadarData} options={RadarOptions} />
		</div>
	);
}

export default RadarChart2;
