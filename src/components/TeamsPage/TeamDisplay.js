import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamDisplay.css';
import axios from 'axios';
import TeamPokemonSprites from './TeamPokemonSprites';

function TeamDisplay({ team, getTeams }) {
	const teamId = team._id;

	const navigate = useNavigate();

	const handleEditTeam = () => {
		navigate(`/team/${team._id}`);
	};

	const deleteTeam = async (team) => {
		try {
			const response = await axios.delete(
				`https://the-link-cable.herokuapp.com/api/teams/${teamId}`
			);
			getTeams();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='teams-team-display-wrapper'>
			<span className='team-name-text'>{team.name}</span>
			<TeamPokemonSprites getTeams={getTeams} team={team} />

			<section className='team-buttons-wrapper'>
				<button className='edit-team-button' onClick={handleEditTeam}>edit</button>
				<button className='delete-team-button' onClick={deleteTeam}>delete</button>
			</section>
		</div>
	);
}

export default TeamDisplay;
