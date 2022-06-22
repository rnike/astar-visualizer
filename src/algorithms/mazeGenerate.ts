import type ObservableNode from '../utils/ObservableNode';

const recursive = (current: ObservableNode, visited: Set<ObservableNode>) => {
  if (visited.has(current)) {
    return;
  }

  visited.add(current);
  current.blockType = 'block';

  const neighbors = current
    .getNeighborsThroughWall()
    .filter((x) => !visited.has(x[0]));

  while (neighbors.length > 0) {
    const i = Math.floor(Math.random() * neighbors.length);
    const [neighbor, wallBetween] = neighbors[i];

    neighbors.splice(i, 1);

    if (visited.has(neighbor)) {
      continue;
    }

    wallBetween.blockType = 'block';

    recursive(neighbor, visited);
  }
};

export default function mazeGenerate(gridNodes: ObservableNode[][]) {
  const visited = new Set<ObservableNode>();

  gridNodes.forEach((x) => x.forEach((y) => (y.blockType = 'wall')));

  for (let y = gridNodes.length - 1; y >= 0; y -= 2) {
    for (let x = 0; x < gridNodes[y].length; x += 2) {
      recursive(gridNodes[y][x], visited);
    }
  }
}
