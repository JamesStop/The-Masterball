import React, { useEffect, useState } from 'react';

function IncreasedStat({ pokemon }) {
	

	if (pokemon.nature.increasedStat) {
		return <div>{pokemon.nature.increasedStat.name}</div>;
	} else {
		return <div>no stat increase</div>;
	}
}

export default IncreasedStat;
