import React from 'react';
import {OrderedList, ListItem} from '@chakra-ui/react';
import s from './guesses.module.scss';

const Header = ({guesses, anime}) => (
  <OrderedList className={s.container}>
    {
      guesses.map((guessItem) => {
        if (!guessItem) {
          return (
            <ListItem color={'red.500'}>
              {'Skipped'}
            </ListItem>
          );
        }

        return (
          <ListItem color={guessItem.value === anime.id ? 'green.500' : 'red.500'}>
            {guessItem.label}
          </ListItem>
        );
      })
    }
  </OrderedList>
);

export default Header;
