import React from 'react';
import AsyncSelect from 'react-select/async';
import {Flex, Button} from '@chakra-ui/react';
import s from './guess.module.scss';


const Guess = ({loadOptions, guess, selected, setSelected}) => {
  return (
    <Flex className={s.container}>
      <AsyncSelect
        value={selected}
        onChange={setSelected}
        chacheOptions loadOptions={loadOptions}
        className={s.select}
      />
      <Button colorScheme={'green'} onClick={guess}>{'Guess'}</Button>
    </Flex>
  );
};

export default Guess;
