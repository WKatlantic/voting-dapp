import * as React from 'react';
import { Box } from '@mui/material';
import { ReactElement } from 'react';

type ForwardContainerProps = {
  child: ReactElement< Record<any, unknown>, any>;
};

export default function ForwardContainer(props: ForwardContainerProps) {
  // const theme = useTheme();

  return (
    <Box 
      sx={{
        minWidth: '400px', 
        minHeight: '300px',
        boxSizing: 'border-box',
        border: '2px solid white',
        padding: '15px',
        marginTop: '100px',
      }}>
        {props.child}
    </Box>
  );
}