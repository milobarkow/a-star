class Node {
    constructor(row, col, y, x, windowWidth, nodeWidth) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.windowWidth = windowWidth;
        this.size = size;
        this.nodeWidth = nodeWidth;
        this.color = 'white';
        this.path = false;
    }

    show() {
        fill(this.color);
        square(this.y, this.x, this.nodeWidth);
    }

    setBoarder() {
        this.color = 'black';
    }

    isBoarder() {
        if (this.color == 'black') {
            return true;
        } else return false;
    }

    setStart() {
        this.color = 'blue';
    }

    isStart() {
        if (this.color == 'blue') {
            return true;
        } else return false;
    }

    setEnd() {
        this.color = 'red';
    }

    isEnd() {
        if (this.color == 'red') {
            return true;
        } else return false;
    }

    setWall() {
        this.color = 'gray';
    }

    isWall() {
        if (this.color == 'gray') {
            return true;
        } else return false;
    }

    setPath() {
        this.color = 'purple';
    }

    setTempPath() {
        this.path = true;
    }

    isPath() {
        if (this.color == 'purple') {
            return true;
        } else return false;
    }

    setChild() {
        this.color = 'orange';
    }

    fScore() {
        return this.f;
    }

    gScore() {
        return this.g;
    }

    hScore() {
        return this.h;
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    isOpen() {
        if ((this.color == 'white' || this.color == 'red') && !this.path) {
            return true;
        }
        return false;
    }
}