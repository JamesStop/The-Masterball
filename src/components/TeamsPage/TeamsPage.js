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
				positioning: {
					0: {
						x: 50,
						y: 0,
					},
					1: {
						x: 97,
						y: 20,
					},
					2: {
						x: 97,
						y: 82,
					},
					3: {
						x: 50,
						y: 102,
					},
					4: {
						x: 0,
						y: 82,
					},
					5: {
						x: 0,
						y: 20,
					},
				},
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
			<TeamsDisplaySection setTeams={setTeams} getTeams={getTeams} teams={teams} />
		</section>
	);
}

export default TeamsPage;
