let size = 50;
let windowWidth = 600;
let nodeWidth = Math.floor(windowWidth / size);
let startNode;
let endNode;
let openList;
let closedList;
let bg = (0);
let grid;
let pathFound = false;
let finalPath;



function setup() {
    createCanvas(windowWidth, windowWidth);
    grid = [];
    startNode = null;
    endNode = null;
    openList = [];
    closedList = [];
    finalPath = [];
    for (let i = 0; i < size; i++) {
        grid.push([]);
        for (let j = 0; j < size; j++) {
            let newNode = new Node(i, j, i * nodeWidth, j * nodeWidth, windowWidth, nodeWidth);
            if (i == 0 || j == 0 || i == size - 1 || j == size - 1) {
                newNode.setBoarder();
            }
            grid[i].push(newNode);
        }
    }

}

function draw() {
    background(bg);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            grid[i][j].show();
        }
    }

    if (mouseIsPressed && !pathFound) {
        nodeFill();
    }

}

function nodeFill() {
    let row = Math.floor(mouseX / nodeWidth);
    let col = Math.floor(mouseY / nodeWidth);
    let clickedNode = grid[row][col];
    if (!clickedNode.isBoarder()) {
        if (startNode == null) {
            clickedNode.setStart();
            startNode = clickedNode;
            openList.push(clickedNode);
        } else if (endNode == null && !clickedNode.isStart()) {
            clickedNode.setEnd();
            endNode = clickedNode;
        } else {
            if (clickedNode.isStart() == clickedNode.isEnd()) {
                clickedNode.setWall();
            }
        }
    }
}

function keyPressed() {
    if (keyCode == ENTER) {
        findPath();
        pathFound = true;
        console.log("path found");
    }
}

function findPath() {
    let done = false;
    let currentNode = openList.pop();
    while (!done) {
        closedList.push(currentNode);
        let x = currentNode.getRow();
        let y = currentNode.getCol();
        done = false;
        if (grid[x][y + 1].isOpen()) {
            let child = grid[x][y + 1];
            child.h = distanceBetweenNodes(child.row, child.col, endNode.row, endNode.col);
            if (openList.length == 0) {
                openList.push(child);
            } else if (child.hScore() < openList[0].hScore()) {
                openList.pop();
                openList.push(child);
            }
            if (openList[0].isEnd()) {
                done = true;
            }
        }
        if (!done && grid[x][y - 1].isOpen()) {
            let child = grid[x][y - 1];
            child.h = distanceBetweenNodes(child.row, child.col, endNode.row, endNode.col);
            if (openList.length == 0) {
                openList.push(child);
            } else if (child.hScore() < openList[0].hScore()) {
                openList.pop();
                openList.push(child);
            }
            if (openList[0].isEnd()) {
                done = true;
            }
        }
        if (!done && grid[x - 1][y].isOpen()) {
            let child = grid[x - 1][y];
            child.h = distanceBetweenNodes(child.row, child.col, endNode.row, endNode.col);
            if (openList.length == 0) {
                openList.push(child);
            } else if (child.hScore() < openList[0].hScore()) {
                openList.pop();
                openList.push(child);
            }
            if (openList[0].isEnd()) {
                done = true;
            }
        }
        if (!done && grid[x + 1][y].isOpen()) {
            let child = grid[x + 1][y];
            child.h = distanceBetweenNodes(child.row, child.col, endNode.row, endNode.col);
            if (openList.length == 0) {
                openList.push(child);
            } else if (child.hScore() <= openList[0].hScore()) {
                openList.pop();
                openList.push(child);
            }
            if (openList[0].isEnd()) {
                done = true;
            }
        }

        if (openList.length == 0) {
            finalPath.pop();
            openList.push(finalPath[finalPath.length - 1]);
            currentNode = openList[0];
        } else if (!done) {
            openList[0].setTempPath();
            finalPath.push(openList[0]);
            currentNode = openList.pop();
        }
    }


    //finishPath();
    for (let i = 0;i < finalPath.length;i++) {
        finalPath[i].setPath();
    }

}

function finishPath() {
    let done = false;
    let currentNode = endNode;
    while (!done) {
        let children = [];
        let x = currentNode.getRow();
        let y = currentNode.getCol();
        done = false;
        if (grid[x][y + 1].isTempPath()) {
            let child = grid[x][y + 1];
            if (child.isStart()) {
                done = true;
            } else {
                child.h = distanceBetweenNodes(child.row, child.col, startNode.row, startNode.col);
                children.push(child);
            }
        }
        if (grid[x][y - 1].isTempPath()) {
            let child = grid[x][y - 1];
            if (child.isStart()) {
                done = true;
            } else {
                child.h = distanceBetweenNodes(child.row, child.col, startNode.row, startNode.col);
                children.push(child);
            }
        }
        if (grid[x + 1][y].isTempPath()) {
            let child = grid[x + 1][y];
            if (child.isStart()) {
                done = true;
            } else {
                child.h = distanceBetweenNodes(child.row, child.col, startNode.row, startNode.col);
                children.push(child);
            }
        }
        if (grid[x - 1][y].isTempPath()) {
            let child = grid[x - 1][y];
            if (child.isStart()) {
                done = true;
            } else {
                child.h = distanceBetweenNodes(child.row, child.col, startNode.row, startNode.col);
                children.push(child);
            }
        }


        let nextNode = children[0];
        if (children.length > 1) {
            for (let i = 1; i < children.length; i++) {
                if (children[i].h < nextNode.h) {
                    nextNode = children[i];
                }
            }
        }



        nextNode.setPath();
        currentNode = nextNode;

    }
}


function distanceBetweenNodes(x1, y1, x2, y2) {
    // let x2 = endNode.row;
    // let y2 = endNode.col;
    //return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
    return Math.abs((x2 - x1)) + Math.abs((y2 - y1));
}