import Grid from './components/Grid';
import HeuristicEditor from './components/HeuristicEditor';
import Me from './components/Me';
import Toolbar from './components/Toolbar';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

export default function App() {
  const gridRef = useRef<Grid>(null);
  const [isBusy, setIsBusy] = useState(false);

  const start = useCallback(async () => {
    if (isBusy) return;

    setIsBusy(true);
    try {
      await gridRef.current?.findPath();
    } catch (err) {
      alert(err);
    }
    setIsBusy(false);
  }, [isBusy]);

  const [editorShown, setEditorShown] = useState(false);

  const clearPath = useCallback(() => {
    gridRef.current?.clearPath();
  }, []);

  const clearWall = useCallback(() => {
    gridRef.current?.clearWall();
  }, []);

  const toggleEditor = useCallback(() => {
    setEditorShown((v) => !v);
  }, []);

  const genMaze = useCallback(() => {
    if (isBusy) return;

    setIsBusy(true);
    gridRef.current?.clearPath();
    gridRef.current?.clearWall();
    gridRef.current?.genMaze();
    setIsBusy(false);
  }, [isBusy]);

  return (
    <S.Container>
      <Grid ref={gridRef} />
      <Toolbar
        isBusy={isBusy}
        start={start}
        clearPath={clearPath}
        clearWall={clearWall}
        toggleEditor={toggleEditor}
        genMaze={genMaze}
      />
      <Me />
      {editorShown && (
        <HeuristicEditor
          run={start}
          clearPath={clearPath}
          clearWall={clearWall}
          onMinimize={() => {
            setEditorShown(false);
          }}
        />
      )}
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
  `,
};
