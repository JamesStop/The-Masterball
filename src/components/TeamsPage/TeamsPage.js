import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './TeamsPage.css';
import TeamsDisplaySection from './TeamsDisplaySection';

function TeamsPage(props) {
	const [teams, setTeams] = useState({});
	const [newTeamName, setNewTeamName] = useState('');

	async function getTeams() {
		try {
			const response = await axios.get('http://localhost:1738/api/teams');
			const results = await response.data;
			setTeams(results);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getTeams();
	}, []);

	function handleChange(event) {
		setNewTeamName(`${event.target.value}`);
	}

	const createNewTeam = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:1738/api/teams', {
				name: newTeamName,
			});
			setNewTeamName('');
			getTeams();
		} catch (error) {
			console.log(error);
		}
	};

	


		return (
			<section className='teams-wrapper'>
				<section className='new-team-create-wrapper'>
					<form onSubmit={createNewTeam}>
						<label htmlFor='new-team-name'>Team Name</label>
						<input
							type='text'
							id='new-team-name'
							value={newTeamName}
							onChange={handleChange}
							required
						/>
						<button type='submit'>create new team</button>
					</form>
				</section>
				<TeamsDisplaySection getTeams={getTeams} teams={teams} />
			</section>
		);

}

export default TeamsPage;
