import React, { useEffect, useState } from 'react';

function IncreasedStat({ nature }) {
	

	if (nature.increasedStat) {
		return (
			<div className='increased-stat'>{nature.increasedStat.name}</div>
		);
	} else {
		return <div className='increased-stat'>N/A</div>;
	}
}

export default IncreasedStat;
