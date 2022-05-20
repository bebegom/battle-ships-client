let id
const box = `<div onClick={(e) => { if (myTurn) { handleClickedOnBox(e) }}}>${id}</div>`;
const box1 = `<div id=${id} >${id}</div>`;

const myBattleBoard = [
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ],
    [box1, box1, box1, box1, box1, box1, box1, box1, box1, box1, ]
];

const opponentBattleBoard = [
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ],
    [box, box, box, box, box, box, box, box, box, box, ]
];
