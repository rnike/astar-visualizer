import * as color from '../../constance/colors';
import { Stack, Box, Typography } from '@mui/material';
import styled from 'styled-components';

export default function Legend() {
  return (
    <S.Container
      direction="row"
      borderRadius={15}
      padding={1}
      spacing={1}
      alignItems="center"
    >
      <Stack alignItems="center" width={50}>
        <S.Block bgcolor={color.start} />
        <S.Text>start</S.Text>
      </Stack>
      <Stack alignItems="center" width={50}>
        <S.Block bgcolor={color.end} />
        <S.Text>end</S.Text>
      </Stack>
      <Stack alignItems="center" width={50}>
        <S.Block bgcolor={color.wall} />
        <S.Text>wall</S.Text>
      </Stack>
      <Stack alignItems="center" width={50}>
        <S.Block bgcolor={color.explored} />
        <S.Text>explored</S.Text>
      </Stack>
      <Stack alignItems="center" width={50}>
        <S.Block bgcolor={color.visited} />
        <S.Text>visited</S.Text>
      </Stack>
      <Stack alignItems="center" width={50}>
        <S.Block bgcolor={color.ans} />
        <S.Text>path</S.Text>
      </Stack>
    </S.Container>
  );
}

const S = {
  Container: styled(Stack)`
    pointer-events: none;
    backdrop-filter: blur(3px);
    box-shadow: 0 1px 4px 0 #00000011;
    background-color: #ffffffab;
  `,
  Text: styled(Typography)`
    font-size: 11px;
  `,
  Block: styled(Box)`
    width: 20px;
    height: 20px;
    border: 1px solid #d8d8d8;
  `,
  Legend: styled(Stack)``,
};
