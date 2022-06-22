import { Box, Chip, Avatar } from '@mui/material';
import styled from 'styled-components';

export default function Me() {
  return (
    <Box bottom="1%" right="1%" position="fixed" zIndex={9999}>
      <S.Chip
        avatar={<Avatar src={require('./me.jpeg')} />}
        label="rnike@github"
        component="a"
        href="https://github.com/rnike/astar-visualizer"
        variant="outlined"
        target="_blank"
        rel="noreferrer"
        clickable
      />
    </Box>
  );
}

const S = {
  Chip: styled(Chip)`
    backdrop-filter: blur(3px);
    box-shadow: 0 1px 4px 0 #00000011;
    background-color: #ffffffab;
  `,
};
