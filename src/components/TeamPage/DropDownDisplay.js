import React from 'react';
import { useState, useEffect } from 'react';

function DropDownDisplay({ specie, species }) {
	return (
		<option>
			{species.indexOf(specie) + 1}. {specie.name}
		</option>
	);
}

export default DropDownDisplay;
