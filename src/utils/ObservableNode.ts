import interval from './interval';

export default class ObservableNode {
  constructor(x: number, y: number, grid: ObservableNode[][]) {
    this.x = x;
    this.y = y;
    this._grid = grid;
  }

  // TODO: adjustable weight
  public weight = 1;

  public x: number;
  public y: number;

  public getNeighbors() {
    const arr: ObservableNode[] = [];

    const topNode = this._grid[this.y - 1]?.[this.x];

    if (topNode) {
      arr.push(topNode);
    }

    const rightNode = this._grid[this.y]?.[this.x + 1];

    if (rightNode) {
      arr.push(rightNode);
    }

    const bottomNode = this._grid[this.y + 1]?.[this.x];

    if (bottomNode) {
      arr.push(bottomNode);
    }

    const leftNode = this._grid[this.y]?.[this.x - 1];

    if (leftNode) {
      arr.push(leftNode);
    }

    return arr;
  }

  public getNeighborsThroughWall() {
    const arr: ObservableNode[][] = [];

    const top = this._grid[this.y - 2]?.[this.x];
    const topWall = this._grid[this.y - 1]?.[this.x];

    if (top && topWall) {
      arr.push([top, topWall]);
    }

    const right = this._grid[this.y]?.[this.x + 2];
    const rightWall = this._grid[this.y]?.[this.x + 1];

    if (right) {
      arr.push([right, rightWall]);
    }

    const bottom = this._grid[this.y + 2]?.[this.x];
    const bottomWall = this._grid[this.y + 1]?.[this.x];

    if (bottom && bottomWall) {
      arr.push([bottom, bottomWall]);
    }

    const left = this._grid[this.y]?.[this.x - 2];
    const leftWall = this._grid[this.y]?.[this.x - 1];

    if (left && leftWall) {
      arr.push([left, leftWall]);
    }

    return arr;
  }

  index = 1;

  public get isWall() {
    return this._blockType === 'wall';
  }

  public get hasVisited() {
    return this._blockType === 'visited';
  }

  public async setExplored() {
    if (['start', 'end', 'visited'].includes(this.blockType)) {
      return;
    }

    this.blockType = 'explored';
    await interval();
  }

  _isCurrent = false;

  public get isCurrent() {
    return this._isCurrent;
  }

  public set isCurrent(value) {
    this._isCurrent = value;
    this.observe('isCurrent', value);
  }

  public Leave() {
    this.isCurrent = false;
  }

  public async Visit() {
    this.isCurrent = true;
    await this.setVisited();
  }

  public async setVisited() {
    if (['start', 'end'].includes(this.blockType)) {
      return;
    }

    this.blockType = 'visited';
    await interval();
  }

  public async setAns() {
    if (this.blockType === 'start' || this.blockType === 'end') {
      return;
    }

    this.blockType = 'ans';
    await interval();
  }

  private _blockType:
    | 'start'
    | 'end'
    | 'wall'
    | 'ans'
    | 'explored'
    | 'visited'
    | 'block' = 'block';
  public get blockType() {
    return this._blockType;
  }
  public set blockType(value) {
    this._blockType = value;
    this.observe('blockType', value);
  }

  public reset() {
    this.blockType = 'block';
  }

  public subscribe(observer: Observer) {
    this.observers.push(observer);

    return () => {
      const index = this.observers.indexOf(observer);

      if (index >= 0) {
        this.observers.splice(index, 1);
      }
    };
  }

  private observers: Observer[] = [];
  private observe: Observer = (key, value) => {
    for (const item of this.observers) {
      item(key, value);
    }
  };

  private _grid: ObservableNode[][];
}

type Observer = (
  key: string,
  val: ObservableNode[keyof Pick<ObservableNode, 'blockType' | 'isWall'>]
) => void;
