import useWindowSize from '../../hooks/useWindowSize';
import ObservableNode from '../../utils/ObservableNode';
import { useMemo } from 'react';

const BLOCK_SIZE = 20;
const GAP = 1;

export const useGridData = () => {
  const { width, height } = useWindowSize();

  const nodeCountWidth = useMemo(
    () => Math.floor(width / (BLOCK_SIZE + GAP)),
    [width]
  );

  const nodeCountHeight = useMemo(
    () => Math.floor(height / (BLOCK_SIZE + GAP)),
    [height]
  );

  const gridNodes = useMemo(() => {
    const grid: ObservableNode[][] = [];

    for (let y = 0; y < nodeCountHeight; y++) {
      const row: ObservableNode[] = [];
      for (let x = 0; x < nodeCountWidth; x++) {
        const n = new ObservableNode(x, y, grid);

        row.push(n);
      }

      grid.push(row);
    }

    return grid;
  }, [nodeCountWidth, nodeCountHeight]);

  return {
    gridNodes,
    width,
    height,
    gap: GAP,
    blockSize: BLOCK_SIZE,
  };
};
