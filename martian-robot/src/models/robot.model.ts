import { Orientation } from '../types';
import { Position } from './position.model';

export class Robot {
  private lost: boolean = false;
  private instructions: string[] = [];
  private limits: Position;
  prevPosition: Position = { xPos: 0, yPos: 0 };
  orientation: Orientation;
  position: Position;

  constructor(
    xPos: number,
    yPos: number,
    o: Orientation,
    instructions: string[]
  ) {
    this.position = {
      xPos,
      yPos,
    };

    this.orientation = o;
    this.instructions = [...instructions];
  }

  updatePosition = () => {
    if (!this.limits) {
      throw new Error('Must set robot limits in order to start moving');
    }

    let instruction = this.instructions.shift();

    switch (instruction) {
      case 'L':
      case 'R':
        this.rotate(instruction);
        break;
      case 'F': {
        this.move();
        break;
      }
    }
  };

  move = () => {
    this.prevPosition = { ...this.position };
    switch (this.orientation) {
      case 'N':
        if (
          this.isMovementForbidden(this.position.xPos, this.position.yPos + 1)
        ) {
          this.lost = true;
        } else {
          this.position.yPos++;
        }
        break;
      case 'S':
        if (
          this.isMovementForbidden(this.position.xPos, this.position.yPos - 1)
        ) {
          this.lost = true;
        } else {
          this.position.yPos--;
        }
        break;
      case 'W':
        if (
          this.isMovementForbidden(this.position.xPos - 1, this.position.yPos)
        ) {
          this.lost = true;
        } else {
          this.position.xPos--;
        }
        break;
      case 'E':
        if (
          this.isMovementForbidden(this.position.xPos + 1, this.position.yPos)
        ) {
          this.lost = true;
        } else {
          this.position.xPos++;
        }
        break;
    }
  };

  rotate = (leftOrRight: string) => {
    switch (this.orientation) {
      case 'N':
        this.orientation = leftOrRight == 'L' ? 'W' : 'E';
        break;
      case 'S':
        this.orientation = leftOrRight == 'L' ? 'E' : 'W';
        break;
      case 'W':
        this.orientation = leftOrRight == 'L' ? 'S' : 'N';
        break;
      case 'E':
        this.orientation = leftOrRight == 'L' ? 'N' : 'S';
        break;
    }
  };

  isLost = () => this.lost;

  hasInstructions = (): boolean => !!this.instructions.length;

  toString = () => 'R';

  getLocation = () => {
    return `${this.position.xPos} ${this.position.yPos} ${this.orientation}${
      this.isLost() ? ' LOST' : ''
    }`;
  };

  // robot is at the edge of the grid, we must ignore the movement that makes the robot fall off the grid
  preventFall = (): void => {
    if (this.instructions[0] === 'F') {
      let { xPos, yPos } = this.position;

      switch (this.orientation) {
        case 'N':
          if (!this.isMovementForbidden(xPos, yPos + 1)) {
            this.move();
          }
          break;
        case 'S':
          if (!this.isMovementForbidden(xPos, yPos - 1)) {
            this.move();
          }
          break;
        case 'W':
          if (!this.isMovementForbidden(xPos - 1, yPos)) {
            this.move();
          }
          break;
        case 'E':
          if (!this.isMovementForbidden(xPos + 1, yPos)) {
            this.move();
          }
          break;
      }
      this.instructions.shift();
    } else {
      this.rotate(this.instructions.shift());
    }
  };

  private isMovementForbidden = (x: number, y: number): boolean => {
    return x > this.limits.xPos || y > this.limits.yPos || x < 0 || y < 0;
  };

  setLimits = (xPos: number, yPos: number) => {
    this.limits = {
      xPos,
      yPos,
    };
  };
}
