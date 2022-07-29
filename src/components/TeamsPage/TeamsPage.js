import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TeamDisplay from './TeamDisplay';

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
				<div>create new team</div>
				{teams.map((team) => {
					return <TeamDisplay team={team}/>;
				})}
			</section>
		);
	}
}

export default TeamsPage;
