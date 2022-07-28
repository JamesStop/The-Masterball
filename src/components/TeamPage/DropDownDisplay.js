import React from 'react';
import { useState, useEffect } from 'react';

function DropDownDisplay({ specie, index }) {
	return (
		<option>
			{index + 1}. {specie.name}
		</option>
	);
}

export default DropDownDisplay;
