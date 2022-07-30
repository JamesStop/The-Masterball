import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TeamDisplay from './TeamDisplay';
import './TeamsPage.css'

function TeamsPage(props) {
	const [teams, setTeams] = useState({});

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

	if (teams.length) {
		return (
			<section className='teams-wrapper'>
				<section className='new-team-create-wrapper'>
					<div>create new team</div>
				</section>
				<section className='existing-teams-wrapper'>
					{teams.map((team, index) => {
						return <TeamDisplay key={index} team={team} />;
					})}
				</section>
			</section>
		);
	}
}

export default TeamsPage;
