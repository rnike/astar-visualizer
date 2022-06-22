import Node from '../utils/ObservableNode';
import Heap from 'heap-js';
import vm from 'vm';

/**
 * aStar.pseudo implementation
 */
async function aStar(start: Node, goal: Node) {
  const h = vm.runInNewContext(`(()=>${heuristicStr})()`);
  const heuristic = (current) => h(current, goal);

  function weightBetween(_nodeA: Node, nodeB: Node) {
    return nodeB.weight;
  }

  const gScore = new Map([[start, 0]]);
  const fScore = new Map([[start, heuristic(start)]]);
  const openSet = new Heap<Node>((a, b) => {
    const aValue = fScore.get(a) ?? Infinity;
    const bValue = fScore.get(b) ?? Infinity;

    switch (true) {
      case aValue > bValue:
        return 1;
      case aValue < bValue:
        return -1;
      default:
        return 0;
    }
  });
  const cameFrom = new Map();

  openSet.add(start);

  while (openSet.length > 0) {
    const current = openSet.pop()!;

    if (current === goal) {
      const path = [current];

      let cur = cameFrom.get(current);

      while (cur) {
        path.unshift(cur);

        cur = cameFrom.get(cur);
      }

      for (const p of path) {
        await p.setAns();
      }

      return path;
    }

    await current.Visit();

    const currentGScore = gScore.get(current) ?? Infinity;

    const neighbors = current.getNeighbors();

    for (const neighbor of neighbors) {
      if (neighbor.isWall) {
        continue;
      }

      await neighbor.setExplored();

      const tentativeGScore = currentGScore + weightBetween(current, neighbor);
      const neighborGScore = gScore.get(neighbor) ?? Infinity;

      if (tentativeGScore < neighborGScore) {
        openSet.remove(neighbor);
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + heuristic(neighbor));
        openSet.add(neighbor);
      }
    }

    current.Leave();
  }
}

export let heuristicStr = `/**
 * current: { x: number; y: number; index: number }
 * goal: { x: number; y: number; index: number }
 *
 * return number
 */
function heuristic(current, goal) {
  const dx = Math.abs(current.x - goal.x);
  const dy = Math.abs(current.y - goal.y);

  return (dx + dy) * 2;
}
`;

export const setHeuristicStr = (str: string) => {
  heuristicStr = str;
};

export default aStar;
