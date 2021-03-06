export function isStraightMove(startX, startY, endX, endY): boolean {
  return startX !== endX && startY === endY || startX === endX && startY !== endY;
}

export function isDiagonalMove(startX, startY, endX, endY): boolean {
  return Math.abs(endX - startX) === Math.abs(endY - startY);
}

export interface Row {
  cells: Cell[];
}

export class Cell {
  figure?: Figure;
  showValidMoveIndicator: boolean;

  constructor(figure?: Figure) {
    this.figure = figure;
  }
}

export abstract class Figure {
  white?: boolean;
  blackImg?: string;
  whiteImg?: string;

  protected constructor(white: boolean) {
    this.white = white;
  }

  abstract checkValidMove(board: Row[], startX: number, startY: number, endX: number, endY: number): boolean;
}


export class Pawn extends Figure {
  constructor(props) {
    super(props);
    super.blackImg = '♟';
    super.whiteImg = '♙';
  }

  checkValidMove(board: Row[], startX: number, startY: number, endX: number, endY: number): boolean {
    return false;
  }
}

export class Queen extends Figure {
  constructor(props) {
    super(props);
    super.blackImg = '♛';
    super.whiteImg = '♕';
  }

  checkValidMove(board: Row[], startX: number, startY: number, endX: number, endY: number): boolean {
    return isStraightMove(startX, startY, endX, endY) || isDiagonalMove(startX, startY, endX, endY);
  }
}

export class King extends Figure {
  constructor(props) {
    super(props);
    super.blackImg = '♚';
    super.whiteImg = '♔';
  }

  checkValidMove(board: Row[], startX: number, startY: number, endX: number, endY: number): boolean {
    return false;
  }
}

export class Knight extends Figure {
  constructor(props) {
    super(props);
    super.blackImg = '♞';
    super.whiteImg = '♘';
  }

  checkValidMove(board: Row[], startX: number, startY: number, endX: number, endY: number): boolean {
    return false;
  }
}

export class Bishop extends Figure {
  constructor(props) {
    super(props);
    super.blackImg = '♝';
    super.whiteImg = '♗';
  }

  checkValidMove(board: Row[], startX: number, startY: number, endX: number, endY: number): boolean {
    return isDiagonalMove(startX, startY, endX, endY);
  }
}

export class Rook extends Figure {
  constructor(props) {
    super(props);
    super.blackImg = '♜';
    super.whiteImg = '♖';
  }

  checkValidMove(board: Row[], startX: number, startY: number, endX: number, endY: number): boolean {
    return isStraightMove(startX, startY, endX, endY);
  }
}
