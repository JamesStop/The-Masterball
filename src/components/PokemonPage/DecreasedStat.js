import React, { useEffect, useState } from 'react';

function DecreasedStat({ nature }) {
	

	if (nature.decreasedStat) {
		return (
			<span className='decreased-stat'>
				{nature.decreasedStat.name}
			</span>
		);
	} else {
		return <span className='decreased-stat'>N/A</span>;
	}
}

export default DecreasedStat;
