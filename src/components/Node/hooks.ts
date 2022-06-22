import type ObservableNode from '../../utils/ObservableNode';
import { useEffect, useState } from 'react';

export const useBindState = (node: ObservableNode) => {
  const [blockType, setBlockType] = useState(node.blockType);
  const [isCurrent, setIsCurrent] = useState(node.isCurrent);

  useEffect(() => {
    const unsubscribe = node.subscribe((key, val) => {
      switch (key) {
        case 'blockType': {
          setBlockType(val as 'start' | 'end' | 'block');
          break;
        }
        case 'isCurrent': {
          setIsCurrent(val as boolean);
          break;
        }
        default:
          break;
      }
    });

    setBlockType(node.blockType);
    setIsCurrent(node.isCurrent);

    return () => {
      unsubscribe();
    };
  }, [node]);

  return { blockType, isCurrent };
};
