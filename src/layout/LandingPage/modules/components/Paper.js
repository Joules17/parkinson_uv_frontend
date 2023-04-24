import * as React from 'react';
import MuiPaper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const PaperRoot = styled(MuiPaper, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding',
})(({ theme, background, padding }) => ({
  backgroundColor: background,
  ...(padding && {
    padding: theme.spacing(1),
  }),
}));

function Paper(props) {
  // eslint-disable-next-line
  const { background, classes, className, padding = false, ...other } = props;

  return (
    <PaperRoot
      square
      elevation={0}
      background={background}
      padding={padding}
      className={className}
      {...other}
    />
  );
}


export default Paper;
