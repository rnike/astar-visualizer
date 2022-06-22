import { heuristicStr as defaultHeuristic } from '../../algorithms/aStar';
import * as heuristic from '../../algorithms/heuristic';
import useWindowSize from '../../hooks/useWindowSize';
import ChildWindow from '../ChildWindow';
import Selection from './Selection';
import extensions from './extensions';
import { EditorView } from '@codemirror/view';
import { PlayArrow } from '@mui/icons-material';
import { Button, Stack, Box, List, ListSubheader } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  run: () => void;
  clearWall: () => void;
  clearPath: () => void;
  onMinimize: () => void;
}

export default function HeuristicEditor(props: Props) {
  const { run, onMinimize, clearWall, clearPath } = props;

  const ref = useRef<HTMLDivElement>(null);
  const editor = useRef<EditorView | null>(null);

  useEffect(() => {
    editor.current = new EditorView({
      doc: defaultHeuristic,
      extensions,
      parent: ref.current ?? undefined,
    });

    return () => {
      editor.current?.destroy();
      editor.current = null;
    };
  }, []);

  const { width, height } = useWindowSize();

  const setContent = useCallback((content: string) => {
    if (editor.current) {
      const { state, dispatch } = editor.current;

      dispatch({
        changes: {
          from: 0,
          to: state.doc.length,
          insert: content,
        },
      });
    }
  }, []);

  return (
    <ChildWindow
      onMinimize={onMinimize}
      defaultPosition={{ x: width / 3, y: height / 2 }}
      title="heuristic editor"
    >
      <Stack direction="row">
        <S.List
          subheader={<S.ListSubheader>Distance algorithms</S.ListSubheader>}
        >
          <Selection
            onClick={() => setContent(heuristic.manhattanDistance)}
            text="Manhattan"
          />
          <Selection
            onClick={() => setContent(heuristic.euclideanDistance)}
            text="Euclidean"
          />
          <Selection
            onClick={() => setContent(heuristic.chebyshevDistance)}
            text="Chebyshev"
          />
        </S.List>
        <Stack>
          <S.Toolbar direction="row">
            <Button disableRipple color="inherit" onClick={run}>
              <PlayArrow />
            </Button>
            <Box flex={1} />
            <Stack direction="row">
              <Button color="inherit" disabled>
                clear
              </Button>
              <Button disableRipple color="inherit" onClick={clearPath}>
                path
              </Button>
              <Button disableRipple color="inherit" onClick={clearWall}>
                wall
              </Button>
            </Stack>
          </S.Toolbar>
          <S.Editor ref={ref} />
        </Stack>
      </Stack>
    </ChildWindow>
  );
}

const S = {
  List: styled(List)`
    background-color: #f5f5f5;
    border: solid #c1c1c1;
    border-width: 0 1px 0 0;
  `,
  ListSubheader: styled(ListSubheader)`
    font-size: 12px;
    background-color: #f5f5f5;
    line-height: 24px;
    border: solid #c1c1c18f;
    border-width: 0 0 2px 0;
  `,
  Editor: styled.div`
    background-color: white;
    min-width: 450px;
  `,
  Toolbar: styled(Stack)`
    height: 24px;
    background-color: #f4f4f4;
    border: solid #c1c1c18f;
    border-width: 0 0 2px 0;
  `,
};
