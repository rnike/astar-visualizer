import * as colors from '../../constance/colors';
import type ObservableNode from '../../utils/ObservableNode';
import { useBindState } from './hooks';
import { useCallback, useMemo, memo } from 'react';
import styled from 'styled-components';

interface Props {
  node: ObservableNode;
  size: number;
  onInteractedStart: (node: ObservableNode) => void;
  onInteractedMove: (node: ObservableNode) => void;
  onInteractedEnd: () => void;
}

export default memo((props: Props) => {
  const { node, size, onInteractedStart, onInteractedMove, onInteractedEnd } =
    props;

  const handleInteractedMove = useCallback(() => {
    if (node.blockType === 'start' || node.blockType === 'end') {
      return;
    }

    onInteractedMove(node);
  }, [onInteractedMove, node]);

  const handleWindowMouseUp = useCallback(() => {
    onInteractedEnd();
    window.removeEventListener('mouseup', handleWindowMouseUp);
  }, [onInteractedEnd]);

  const handleInteractedStart = useCallback(() => {
    onInteractedStart(node);
    window.addEventListener('mouseup', handleWindowMouseUp);
  }, [onInteractedStart, node, handleWindowMouseUp]);

  const { blockType, isCurrent } = useBindState(node);

  const color = useMemo(() => {
    return colors[blockType] || colors.block;
  }, [blockType]);

  return (
    <S.Node
      x={node.x}
      y={node.y}
      size={size}
      color={color}
      isCurrent={isCurrent}
      onMouseUp={onInteractedEnd}
      onMouseEnter={handleInteractedMove}
      onMouseDown={handleInteractedStart}
    />
  );
});

const S = {
  Node: styled.div.attrs(({ color, size, x, y, isCurrent }) => ({
    style: {
      border: `solid 1px ${isCurrent ? 'yellow' : color}`,
      backgroundColor: isCurrent ? 'yellow' : color,
      width: size - 2,
      height: size - 2,
      gridColumn: x + 1,
      gridRow: y + 1,
    },
  }))`
    transition: background-color 100ms linear;
    position: relative;
  `,
};
