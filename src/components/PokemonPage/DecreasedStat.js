import React, { useEffect, useState } from 'react';

function DecreasedStat({ pokemon }) {
	

	if (pokemon.nature.decreasedStat) {
		return (
			<span className='decreased-stat'>
				{pokemon.nature.decreasedStat.name}
			</span>
		);
	} else {
		return <span className='decreased-stat'>N/A</span>;
	}
}

export default DecreasedStat;
