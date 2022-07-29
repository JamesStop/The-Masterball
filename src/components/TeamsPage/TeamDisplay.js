import React from 'react';
import { Link } from 'react-router-dom';

function TeamDisplay({team}) {
    return (
			<Link to={`/team/${team._id}`}>
				<div>{team.name}</div>
			</Link>
		);
}

export default TeamDisplay;