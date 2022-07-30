import React from 'react';
import TeamDisplay from './TeamDisplay';
import './TeamsDisplaySection.css';

function TeamsDisplaySection({ teams, getTeams }) {
	if (teams.length) {
		return (
			<section className='existing-teams-wrapper'>
				{teams.map((team, index) => {
					return <TeamDisplay getTeams={getTeams} key={index} team={team} />;
				})}
			</section>
		);
	} else {
		return <section className='existing-teams-wrapper'></section>;
	}
}

export default TeamsDisplaySection;
