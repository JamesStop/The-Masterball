import React, { useEffect, useState } from 'react';

function IncreasedStat({ pokemon }) {
	

	if (pokemon.nature.increasedStat) {
		return (
			<div className='increased-stat'>{pokemon.nature.increasedStat.name}</div>
		);
	} else {
		return <div className='decreased-stat'>N/A</div>;
	}
}

export default IncreasedStat;
