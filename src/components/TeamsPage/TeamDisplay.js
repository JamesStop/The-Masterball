import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TeamDisplay.css'

function TeamDisplay({team}) {

	const navigate = useNavigate();

	const handleEditTeam = () => {
		navigate(`/team/${team._id}`)
	}

    return (
				<div className='teams-team-display-wrapper'>{team.name}<button onClick={handleEditTeam}>edit</button></div>
		);
}

export default TeamDisplay;