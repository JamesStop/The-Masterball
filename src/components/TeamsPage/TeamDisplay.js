import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TeamDisplay({team}) {

	const navigate = useNavigate();

	const handleEditTeam = () => {
		navigate(`/team`)
	}

    return (
			<Link to={`/team/${team._id}`}>
				<div className='team-display-wrapper'>{team.name}</div>
			</Link>
		);
}

export default TeamDisplay;