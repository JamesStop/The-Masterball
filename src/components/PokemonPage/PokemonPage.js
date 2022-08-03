import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonPage.css';
import Sprite from './Sprite';
import Nickname from './Nickname';
import TeamPokemonTyping from '../TeamPage/TeamPokemonTyping';
import AbilityDisplay from './AbilityDisplay';
import NatureDisplay from './NatureDisplay';
import PokemonStatHealth from './PokemonStatHealth';
import PokemonStatAttack from './PokemonStatAttack';
import PokemonStatSpeed from './PokemonStatSpeed';
import PokemonStatSDefense from './PokemonStatSDefense';
import PokemonStatDefense from './PokemonStatDefense';
import PokemonStatSAttack from './PokemonStatSAttack';



function PokemonPage(props) {
	const [pokemon, setPokemon] = useState({});
	const [pokeName, setPokeName] = useState('');
	const [nickName, setNickName] = useState('');
	const [level, setLevel] = useState(1);
	const [ability, setAbility] = useState({});
	const [nature, setNature] = useState({});
	const [health, setHealth] = useState({});
	const [attack, setAttack] = useState({});
	const [defense, setDefense] = useState({});
	const [sattack, setSattack] = useState({});
	const [sdefense, setSdefense] = useState({});
	const [speed, setSpeed] = useState({});

	useEffect(() => {
		setPokemon({ ...pokemon, nickname: nickName });
	}, [nickName]);

	useEffect(() => {
		setPokemon({ ...pokemon, level: level });
	}, [level]);

	useEffect(() => {
		setPokemon({ ...pokemon, ability: ability });
	}, [ability]);

	useEffect(() => {
		setPokemon({ ...pokemon, nature: nature });
		if (nature.increasedStat?.name == 'health') {
			setHealth({...health, nature: 1})
		} else if (nature.decreasedStat?.name == 'health') {
			setHealth({ ...health, nature: -1 });
		} else {
			setHealth({ ...health, nature: 0 });
		}
		if (nature.increasedStat?.name == 'attack') {
			setAttack({ ...attack, nature: 1 });
		} else if (nature.decreasedStat?.name == 'attack') {
			setAttack({ ...attack, nature: -1 });
		} else {
			setAttack({ ...attack, nature: 0 });
		}
		if (nature.increasedStat?.name == 'defense') {
			setDefense({ ...defense, nature: 1 });
		} else if (nature.decreasedStat?.name == 'defense') {
			setDefense({ ...defense, nature: -1 });
		} else {
			setDefense({ ...defense, nature: 0 });
		}
		if (nature.increasedStat?.name == 'sp. attack') {
			setSattack({ ...sattack, nature: 1 });
		} else if (nature.decreasedStat?.name == 'sp. attack') {
			setSattack({ ...sattack, nature: -1 });
		} else {
			setSattack({ ...sattack, nature: 0 });
		}
		if (nature.increasedStat?.name == 'sp. defense') {
			setSdefense({ ...sdefense, nature: 1 });
		} else if (nature.decreasedStat?.name == 'sp. defense') {
			setSdefense({ ...sdefense, nature: -1 });
		} else {
			setSdefense({ ...sdefense, nature: 0 });
		}
		if (nature.increasedStat?.name == 'speed') {
			setSpeed({ ...speed, nature: 1 });
		} else if (nature.decreasedStat?.name == 'speed') {
			setSpeed({ ...speed, nature: -1 });
		} else {
			setSpeed({ ...speed, nature: 0 });
		}
			
	}, [nature]);

	useEffect(() => {
		setPokemon({
			...pokemon,
			stats: {
				health,
				attack,
				defense,
				sattack,
				sdefense,
				speed,
			},
		});
	}, [health, attack, defense, sattack, sdefense, speed]);

	const [urls, setUrls] = useState({});
	const { id } = useParams();
	const [morePokemonInfo, setMorePokemonInfo] = useState({});
	const [pokemonSpecies, setPokemonSpecies] = useState({});

	useEffect(() => {
		getPokemon();
	}, []);

	useEffect(() => {
		if (urls.speciesUrl && urls.formUrl) {
			getMoreInfo();
		}
		updatePokemon();
	}, [urls]);

	useEffect(() => {
		const stats = morePokemonInfo.stats;
		if (pokemon.stats) {
			if (pokemon.stats.health) {
				if (morePokemonInfo[0]) {
					setPokemon({
						...pokemon,
						stats: {
							health: {
								base: 10,
							},
						},
					});
				}
			}
		}
	}, [morePokemonInfo]);

	const getPokemon = async () => {
		try {
			const response = await axios.get(
				`https://the-link-cable.herokuapp.com/api/pokemon/${id}`
			);
			let results = {};
			if (response.data.owner == window.localStorage.getItem('userid')) {
				results = response.data;
			}
			setPokemon(results);
			setPokeName(results.name);
			if (results.nickname.length) {
				setNickName(results.nickname);
			} else {
				setNickName(results.name);
			}
			setLevel(results.level);
			setAbility(results.ability);
			setNature(results.nature);
			setAttack(results.stats.attack);
			setDefense(results.stats.defense);
			setHealth(results.stats.health);
			setSattack(results.stats.sattack);
			setSdefense(results.stats.sdefense);
			setSpeed(results.stats.speed);
			setUrls({ speciesUrl: results.speciesUrl, formUrl: results.formUrl });
		} catch (error) {
			console.log(error);
		}
	};

	const getMoreInfo = () => {
		fetch(`${urls.formUrl}`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setMorePokemonInfo(res);
			});
		fetch(`${urls.speciesUrl}`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				setPokemonSpecies(res);
			});
	};

	const updatePokemon = async () => {
		try {
			const response = await axios.patch(
				`https://the-link-cable.herokuapp.com/api/pokemon/${id}`,
				pokemon
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		updatePokemon();
	}, [pokemon]);

	const handleLevelChange = async (event) => {
		event.preventDefault();
		let newLevel = event.target.value;
		const max = event.target.max;
		if (newLevel < 1) {
			newLevel = 1;
		}
		if (newLevel > max) {
			newLevel = max;
		}
		await setLevel(parseInt(newLevel));
	};

	const stopRefresh = (event) => {
		event.preventDefault();
	};

	if (Object.keys(pokemon).length) {
		if (Object.keys(morePokemonInfo).length) {
			if (Object.keys(pokemonSpecies).length) {
				return (
					<div className='pokemon-customizer-wrapper'>
						<section className='big-info-wrapper'>
							<div className='pokemon-number'>
								<span>#{pokemonSpecies.id}</span>
							</div>
							<div className='pokemon-level'>
								<form className='level-form' onSubmit={stopRefresh}>
									<label className='label-level' htmlFor='level'>
										Level
									</label>
									<input
										value={level}
										type='number'
										min={1}
										max={100}
										className='level-input'
										id='level'
										onChange={handleLevelChange}
									/>
								</form>
							</div>
							<section className='name-nickname-wrapper'>
								<span className='pokemon-customization-name'>
									{pokeName}, aka:
								</span>
								<Nickname nickName={nickName} setNickName={setNickName} />
							</section>
							<div className='image-wrapper'>
								<Sprite morePokemonInfo={morePokemonInfo} pokeName={pokeName} />
							</div>
							<TeamPokemonTyping formInfo={morePokemonInfo} />
						</section>
						<section className='ability-nature-wrapper'>
							<section className='ability-wrapper'>
								<span className='underlined'>Ability Info:</span>
								<AbilityDisplay
									morePokemonInfo={morePokemonInfo}
									ability={ability}
									setAbility={setAbility}
								/>
							</section>
							<section className='nature-wrapper'>
								<span className='underlined'>Nature Info:</span>
								<NatureDisplay
									morePokemonInfo={morePokemonInfo}
									nature={nature}
									setNature={setNature}
								/>
							</section>
						</section>
						<section className='stats-wrapper'>
							<span className='stats-title'>Stats:</span>
							<PokemonStatHealth
								index={0}
								stat={'health'}
								morePokemonInfo={morePokemonInfo}
								speed={speed}
								attack={attack}
								defense={defense}
								sattack={sattack}
								sdefense={sdefense}
								health={health}
								setHealth={setHealth}
								level={level}
								nature={nature}
							/>
							<PokemonStatAttack
								index={1}
								stat={'attack'}
								morePokemonInfo={morePokemonInfo}
								speed={speed}
								attack={attack}
								setAttack={setAttack}
								defense={defense}
								sattack={sattack}
								sdefense={sdefense}
								health={health}
								level={level}
								nature={nature}
							/>
							<PokemonStatDefense
								index={2}
								stat={'defense'}
								morePokemonInfo={morePokemonInfo}
								speed={speed}
								attack={attack}
								defense={defense}
								setDefense={setDefense}
								sattack={sattack}
								sdefense={sdefense}
								health={health}
								level={level}
								nature={nature}
							/>
							<PokemonStatSAttack
								index={3}
								stat={'sattack'}
								morePokemonInfo={morePokemonInfo}
								speed={speed}
								attack={attack}
								defense={defense}
								sattack={sattack}
								setSattack={setSattack}
								sdefense={sdefense}
								health={health}
								level={level}
								nature={nature}
							/>
							<PokemonStatSDefense
								index={4}
								stat={'sdefense'}
								morePokemonInfo={morePokemonInfo}
								speed={speed}
								attack={attack}
								defense={defense}
								sattack={sattack}
								sdefense={sdefense}
								setSdefense={setSdefense}
								health={health}
								level={level}
								nature={nature}
							/>
							<PokemonStatSpeed
								index={5}
								stat={'speed'}
								morePokemonInfo={morePokemonInfo}
								speed={speed}
								setSpeed={setSpeed}
								attack={attack}
								defense={defense}
								sattack={sattack}
								sdefense={sdefense}
								health={health}
								level={level}
								nature={nature}
							/>
						</section>
					</div>
				);
			}
		}
	}
}

export default PokemonPage;
