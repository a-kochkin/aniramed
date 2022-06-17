import React from 'react';
import {Button, Flex} from '@chakra-ui/react';
import s from './framesNumbers.module.scss'

const Header = ({framesNumbers, setFrameNumber, currentFrameNumber, totalGuesses}) => (
  <Flex className={s.container}>
    {
      framesNumbers.map((number) => (
        <Button
          key={number}
          colorScheme={currentFrameNumber === number ? 'linkedin' : 'blue'}
          onClick={() => setFrameNumber(number)}
          disabled={number > totalGuesses}
        >
          {number}
        </Button>
      ))
    }
  </Flex>
);

export default Header;
