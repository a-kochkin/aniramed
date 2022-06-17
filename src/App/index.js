import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import Body from '../Body';
import s from './app.module.scss';

const App = () => (
  <ChakraProvider>
    <div className={s.container}>
      <Body />
    </div>
  </ChakraProvider>
);

export default App;
