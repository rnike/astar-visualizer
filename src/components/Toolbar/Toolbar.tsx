import Legend from '../Legend';
import Loading from '../Loading';
import { Button, Stack } from '@mui/material';
import styled from 'styled-components';

interface Props {
  isBusy: boolean;
  start: () => void;
  clearPath: () => void;
  clearWall: () => void;
  toggleEditor: () => void;
  genMaze: () => void;
}

export default function Toolbar(props: Props) {
  const { isBusy, start, clearPath, clearWall, toggleEditor, genMaze } = props;

  return (
    <S.Stack spacing={2} alignItems="center">
      <Loading isLoading={isBusy} />
      <Stack direction="row" spacing={2}>
        <Legend />
        <S.Toolbar
          borderRadius={15}
          direction="row"
          spacing={2}
          disabled={isBusy}
        >
          <Button disableRipple color="inherit" onClick={start}>
            start
          </Button>
          <Button disableRipple color="inherit" onClick={genMaze}>
            maze
          </Button>
          <Button disableRipple color="inherit" onClick={clearWall}>
            clear walls
          </Button>
          <Button disableRipple color="inherit" onClick={clearPath}>
            clear path
          </Button>
          <Button disableRipple color="inherit" onClick={toggleEditor}>
            heuristic
          </Button>
        </S.Toolbar>
      </Stack>
    </S.Stack>
  );
}

const S = {
  Stack: styled(Stack)`
    pointer-events: none;
    width: 100%;
    position: fixed;
    bottom: 4%;
    z-index: 9999;
    left: 50%;
    transform: translateX(-50%);
  `,
  Toolbar: styled(Stack)<{ disabled: boolean }>`
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    overflow: hidden;
    backdrop-filter: blur(3px);
    box-shadow: 0 1px 4px 0 #00000011;
    background-color: #ffffffab;
    padding: 0 8px;
  `,
};
