import aStar from '../../algorithms/aStar';
import mazeGenerate from '../../algorithms/mazeGenerate';
import type ObservableNode from '../../utils/ObservableNode';
import Node from '../Node';
import { useGridData } from './hooks';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  memo,
  useEffect,
} from 'react';
import styled from 'styled-components';

interface Grid {
  findPath: () => void;
  clearPath: () => void;
  clearWall: () => void;
  genMaze: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Grid = memo(
  forwardRef((_, ref) => {
    const { gridNodes, width, height, gap, blockSize } = useGridData();

    const startNode = useRef<ObservableNode>();
    const endNode = useRef<ObservableNode>();

    useEffect(() => {
      const x = gridNodes[0].length;
      const y = gridNodes.length;

      startNode.current = gridNodes[Math.floor(y / 4)][Math.floor(x / 4)];
      startNode.current.blockType = 'start';

      endNode.current = gridNodes[Math.floor(y / 4)][Math.floor(x * (3 / 4))];
      endNode.current.blockType = 'end';
    }, [gridNodes]);

    const interactType = useRef<'wall' | 'block' | 'start' | 'end' | null>(
      null
    );

    const clearPath = useCallback(() => {
      for (const row of gridNodes) {
        for (const item of row) {
          if (['explored', 'visited', 'ans'].includes(item.blockType)) {
            item.reset();
          }
        }
      }
    }, [gridNodes]);

    const clearWall = useCallback(() => {
      for (const row of gridNodes) {
        for (const item of row) {
          if (item.blockType === 'wall') {
            item.reset();
          }
        }
      }
    }, [gridNodes]);

    const genMaze = useCallback(async () => {
      mazeGenerate(gridNodes);
      startNode.current!.blockType = 'start';
      endNode.current!.blockType = 'end';
    }, [gridNodes]);

    const findPath = useCallback(async () => {
      if (!startNode.current || !endNode.current) {
        return;
      }

      clearPath();

      await aStar(startNode.current, endNode.current);
    }, [clearPath]);

    useImperativeHandle(
      ref,
      () => ({
        findPath,
        clearPath,
        clearWall,
        genMaze,
      }),
      [findPath, clearPath, clearWall, genMaze]
    );

    const handleInteractStart = useCallback((n: ObservableNode) => {
      switch (n.blockType) {
        case 'wall': {
          interactType.current = 'block';
          n.blockType = 'block';
          break;
        }
        case 'explored':
        case 'visited':
        case 'ans':
        case 'block': {
          interactType.current = 'wall';
          n.blockType = 'wall';
          break;
        }
        case 'start':
        case 'end': {
          interactType.current = n.blockType;
          break;
        }
        default:
          break;
      }
    }, []);

    const handleNodeInteractMove = useCallback((n: ObservableNode) => {
      if (!interactType.current) return;

      if (n.blockType === 'start' || n.blockType === 'end') {
        return;
      }

      switch (interactType.current) {
        case 'block':
        case 'wall': {
          n.blockType = interactType.current;

          break;
        }
        case 'start': {
          if (n.blockType === 'wall') {
            return;
          }

          if (startNode.current) {
            startNode.current.blockType = 'block';
          }

          startNode.current = n;
          startNode.current.blockType = 'start';

          break;
        }
        case 'end': {
          if (n.blockType === 'wall') {
            return;
          }

          if (endNode.current) {
            endNode.current.blockType = 'block';
          }

          endNode.current = n;
          endNode.current.blockType = 'end';

          break;
        }
        default:
          break;
      }
    }, []);

    const handleNodeInteractEnd = useCallback(() => {
      interactType.current = null;
    }, []);

    return (
      <S.Grid gap={gap} width={width} height={height}>
        {gridNodes.map((row, y) =>
          row.map((n, x) => (
            <Node
              key={`${x}-${y}`}
              size={blockSize}
              node={n}
              onInteractedStart={handleInteractStart}
              onInteractedMove={handleNodeInteractMove}
              onInteractedEnd={handleNodeInteractEnd}
            />
          ))
        )}
      </S.Grid>
    );
  })
);

export default Grid;

const S = {
  Grid: styled.div<{
    gap: number;
    width: number;
    height: number;
  }>`
    display: grid;
    gap: ${({ gap }) => gap}px;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    background-color: #d8d8d8;
    margin: auto;
  `,
};
