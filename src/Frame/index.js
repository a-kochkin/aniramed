import React from 'react';
import {Flex, Image} from '@chakra-ui/react'
import s from './frame.module.scss';


const Frame = ({src}) => (
  <Flex className={s.container}>
    <Image src={src} objectFit={'contain'} className={s.frame} />
  </Flex>
);

export default Frame;
