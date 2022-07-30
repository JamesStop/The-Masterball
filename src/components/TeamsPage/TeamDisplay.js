import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamDisplay.css'
import axios from 'axios';

function TeamDisplay({team, getTeams}) {

	const teamId = team._id

	const navigate = useNavigate();

	const handleEditTeam = () => {
		navigate(`/team/${team._id}`)
	}

	const deleteTeam = async (team) => {
		console.log(teamId);
		try {
			const response = await axios.delete(
				`http://localhost:1738/api/teams/${teamId}`
			);
			getTeams();
		} catch (error) {
			console.log(error);
		}
	};

    return (
				<div className='teams-team-display-wrapper'>{team.name}<button onClick={handleEditTeam}>edit</button><button onClick={deleteTeam}>delete</button></div>
		);
}

export default TeamDisplay;