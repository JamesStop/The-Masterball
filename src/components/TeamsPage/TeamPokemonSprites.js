import React from 'react';

function TeamPokemonSprites({team}) {

    if (team.pokemons.length) {
        return <section className='pokemon-sprites-wrapper'>hi</section>;
    } else {
        return <section className='pokemon-sprites-wrapper'></section>;
    }

    
}

export default TeamPokemonSprites;