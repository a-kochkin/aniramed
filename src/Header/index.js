import React from 'react';
import {Button} from '@chakra-ui/react';
import s from './header.module.scss';


const Header = ({fetchData}) => (
  <header className={s.container}>
    <Button colorScheme={'blue'} onClick={fetchData}>
      {'Aniramed'}
    </Button>
  </header>
);

export default Header;
