import React, {useEffect, useState} from 'react';
import s from './body.module.scss';
import {Flex} from '@chakra-ui/react';
import Header from '../Header';
import Frame from '../Frame';
import Guess from '../Guess';
import FramesButtons from '../FramesButtons';
import Guesses from '../Guesses';

const shuffle = array => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const Body = () => {
  const MAX_GUESSES = 6;
  const BASE_URI = 'https://shikimori.one/';
  const API_URI = `${BASE_URI}api/animes/`;

  const headers = {
    'User-Agent': 'Api Test',
    'Authorization': 'Bearer PyiubaqT-XipRCT3Cuhdy2POTyBuF7e6tZLRh1cKTz8'
  };

  const BASE_PARAMS = {
    status: 'released',
    score: '7',
    kind: 'tv'
  };

  const listParams = new URLSearchParams({
    ...BASE_PARAMS,
    order: 'random'
  });

  const searchParams = new URLSearchParams({
    ...BASE_PARAMS,
    limit: 10
  });

  const [anime, setAnime] = useState({});
  const [screenshots, setScreenshots] = useState([]);
  const [frameNumber, setFrameNumber] = useState(1);
  const [selected, setSelected] = useState();
  const [totalGuesses, setTotalGuesses] = useState(1);
  const [guesses, setGuesses] = useState([]);

  const fetchData = async() => {
    setFrameNumber(1);
    setTotalGuesses(1);
    setSelected(null);
    setAnime({});
    setScreenshots([]);
    setGuesses([]);

    const listResponse = await fetch(`${API_URI}?${listParams}`, {headers});

    const [animeData] = await listResponse.json();

    setAnime(animeData);

    const screenshotsResponse = await fetch(`${API_URI}${animeData.id}/screenshots`, {
      headers
    });

    const screenshotsData = await screenshotsResponse.json();

    setScreenshots(shuffle(screenshotsData));
  };

  const loadOptions = async(inputValue) => {
    if (inputValue.length < 3) {
      return;
    }

    searchParams.set('search', inputValue);

    const searchResponse = await fetch(`${API_URI}?${searchParams}`, {headers});

    const searchData = await searchResponse.json();

    return searchData.map(({id, russian, name}) => {
      return {value: id, label: `${russian} / ${name}`};
    });
  };

  const guess = () => {
    if (totalGuesses > MAX_GUESSES) {
      return;
    }

    if (selected?.value === anime.id) {
      alert('Guessed');
      setTotalGuesses(MAX_GUESSES + 1);
    } else if (totalGuesses === MAX_GUESSES) {
      alert(`${anime.russian} / ${anime.name}`);
      setTotalGuesses(MAX_GUESSES + 1);
    } else {
      setTotalGuesses(totalGuesses + 1);
      setFrameNumber(totalGuesses + 1);
    }

    setGuesses([...guesses, selected]);
    setSelected(null);
  };

  useEffect(
    () => {
      fetchData();
    },
    []
  );

  return (
    <Flex className={s.container}>
      <Header fetchData={fetchData} />
      <Frame src={`${BASE_URI}${screenshots[frameNumber - 1]?.original}`} />
      <FramesButtons
        framesNumbers={[1, 2, 3, 4, 5, 6]}
        setFrameNumber={setFrameNumber}
        currentFrameNumber={frameNumber}
        totalGuesses={totalGuesses}
      />
      <Guess
        selected={selected}
        setSelected={setSelected}
        guess={guess}
        loadOptions={loadOptions}
      />
      <Guesses
        guesses={guesses}
        anime={anime}
      />
    </Flex>
  );
};

export default Body;
