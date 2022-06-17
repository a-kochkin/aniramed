import React from 'react';
import {Button} from '@chakra-ui/react'


const Header = ({frameNumber, setFrameNumber, isCurrent, isDisabled}) => (
    <Button
      colorScheme={isCurrent ? 'linkedin' : 'blue'}
      onClick={() => setFrameNumber(frameNumber)}
      disabled={isDisabled}
    >
      {frameNumber}
    </Button>
);

export default Header;
