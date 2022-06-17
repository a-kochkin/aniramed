import React, {useEffect, useState} from 'react';
import s from './body.module.scss';
import {Flex} from '@chakra-ui/react';
import Header from '../Header';
import Frame from '../Frame';
import FrameButton from '../FrameButton';
import Guess from '../Guess';

const shuffle = array => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
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
    'Authorization': 'Bearer _QVyP60jCSlKErIrET_ulK6ie2fLrfISu53ZderUPkw'
  };

  const BASE_PARAMS = {
    status: 'released',
    score: '8',
    kind: 'movie'
  }

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

  const fetchData = async() => {
    setFrameNumber(1);
    setTotalGuesses(1);
    setSelected(null);
    setAnime({});
    setScreenshots([]);

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
    if (selected?.value === anime.id) {
      alert('Guessed');
      setTotalGuesses(MAX_GUESSES);
    } else if (totalGuesses === MAX_GUESSES) {
      alert(`${anime.russian} / ${anime.name}`);
    } else {
      setTotalGuesses(totalGuesses + 1);
      setFrameNumber(totalGuesses + 1);
    }

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
      <Flex className={s.buttons}>
        {
          [1, 2, 3, 4, 5, 6].map((frameNum) => (
            <FrameButton
              key={frameNum}
              frameNumber={frameNum}
              isCurrent={frameNumber === frameNum}
              setFrameNumber={(number) => setFrameNumber(number)}
              isDisabled={totalGuesses < frameNum}
            />
          ))
        }
      </Flex>
      <Guess
        selected={selected}
        setSelected={setSelected}
        guess={guess}
        loadOptions={loadOptions}
      />
    </Flex>
  );
};

export default Body;
