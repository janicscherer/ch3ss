import {Component} from '@angular/core';
import {Bishop, Cell, Figure, King, Knight, Pawn, Queen, Rook, Row} from './model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: Row[] = [
    {
      cells: [
        new Cell(new Rook(false)),
        new Cell(new Knight(false)),
        new Cell(new Bishop(false)),
        new Cell(new King(false)),
        new Cell(new Queen(false)),
        new Cell(new Bishop(false)),
        new Cell(new Knight(false)),
        new Cell(new Rook(false))]
    },
    {
      cells: [
        new Cell(new Pawn(false)),
        new Cell(new Pawn(false)),
        new Cell(new Pawn(false)),
        new Cell(new Pawn(false)),
        new Cell(new Pawn(false)),
        new Cell(new Pawn(false)),
        new Cell(new Pawn(false)),
        new Cell(new Pawn(false))]
    },
    {cells: [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()]},
    {cells: [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()]},
    {cells: [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()]},
    {cells: [new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), new Cell()]},
    {
      cells: [
        new Cell(new Pawn(true)),
        new Cell(new Pawn(true)),
        new Cell(new Pawn(true)),
        new Cell(new Pawn(true)),
        new Cell(new Pawn(true)),
        new Cell(new Pawn(true)),
        new Cell(new Pawn(true)),
        new Cell(new Pawn(true))]
    },
    {
      cells: [
        new Cell(new Rook(true)),
        new Cell(new Knight(true)),
        new Cell(new Bishop(true)),
        new Cell(new King(true)),
        new Cell(new Queen(true)),
        new Cell(new Bishop(true)),
        new Cell(new Knight(true)),
        new Cell(new Rook(true))]
    }];

  startX = -1;
  startY = -1;
  endX = -1;
  endY = -1;

  getFigureAt = (startX, startY) => this.board[startY].cells[startX].figure;

  // validations
  isFigureAtStart = () => this.board[this.startY].cells[this.startX].figure instanceof Figure;
  isFigureAtEnd = () => this.board[this.endY].cells[this.endX].figure instanceof Figure;
  isNotSameCell = () => this.startX !== this.endX || this.startY !== this.endY;

  // selected start and end specific operations
  moveFigure = () => this.board[this.endY].cells[this.endX].figure = this.board[this.startY].cells[this.startX].figure;
  deleteFigureAtStart = () => this.board[this.startY].cells[this.startX].figure = undefined;
  deleteFigureAtEnd = () => this.board[this.endY].cells[this.endX].figure = undefined;
  getFigureAtStart = () => this.board[this.startY].cells[this.startX].figure;
  checkStartMoveValidity = () => this.checkMoveValidity(this.startX, this.startY, this.endX, this.endY);

  // generic operations
  markPossibleMovesForStart = () => {
    const doAtCell = (x, y, cell) => {
      cell.showValidMoveIndicator = this.checkMoveValidity(this.startX, this.startY, x, y) && (this.startX !== x || this.startY !== y);
      x++;
    };

    this.forEachCell(doAtCell);
  }

  unmarkPossibleMovesForStart = () => {
    this.forEachCell((x, y, cell: Cell) => cell.showValidMoveIndicator = false);
  }

  checkMoveValidity = (startX: number, startY: number, endX: number, endY: number) => this.board[startY].cells[startX].figure
    .checkValidMove(this.board, startX, startY, endX, endY);

  forEachCell = (execAtCell: (x: number, y: number, cell: Cell) => void, execAtRow?: (y: number, row?: Row) => void) => {
    for (let y = 0; y < this.board.length; y++) {
      const row = this.board[y];
      execAtRow?.apply(null, [y, row]);
      for (let x = 0; x < row.cells.length; x++) {
        execAtCell?.apply(null, [x, y, row.cells[x]]);
      }
    }
  }

  assertMove(): void {
    if (this.isFigureAtStart()) {
      if (this.isNotSameCell()) {
        if (!this.isFigureAtEnd()) {
          if (this.checkStartMoveValidity()) {
            this.moveFigure();
            this.deleteFigureAtStart();
          }
        }
      }
    }
  }

  mousedown(x: number, y: number): void {
    this.startX = x;
    this.startY = y;
    this.markPossibleMovesForStart();
  }

  mouseup(x: number, y: number): void {
    this.unmarkPossibleMovesForStart();
    this.endX = x;
    this.endY = y;
    this.assertMove();
    this.endX = -1;
    this.endY = -1;
  }
}
