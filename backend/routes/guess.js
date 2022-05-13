import express from 'express';
import { genTarget, swap } from '../core/getNumber';

const router =  express.Router();

const checkInput = (number) => {
    if (number.length > 4) return 0;
    let checkBox = [false, false, false, false, false, false, false, false, false, false];
    let isLegal = true;
    for (let i = 0; i < 4; i++) {
        checkBox[parseInt(number[i])] ? isLegal = false : checkBox[parseInt(number[i])] = true;
    }

    return isLegal ? number : 0;
};

const compare = (guessed, target) => {
    let A = 0;
    let B = 0;
    for (let i = 0; i < 4; i++) {
        let N = parseInt(guessed[i]);
        if (N === target[i]) A++;
        for (let j = 0; j < 4; j++) {
            i != j ? N === target[j] ? B++ : "" : "";
        }
    }

    return { A, B };
};

const serverGuessed = () => {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber > 97) {
        let target = genTarget();
        return target[0].toString() + target[1].toString() + target[2].toString() + target[3].toString();
    }

    let itGuessed = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let step = 100;
    while (step--) {
        swap(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), itGuessed);
    }

    return itGuessed[0] + itGuessed[1] + itGuessed[2] + itGuessed[3];
};

router.post('/start', (_, res) => {
    genTarget(true);
    res.json({ msg: 'The game has started.' });
});

router.get('/guess', (req, res) => {
    const target = genTarget();
    const myGuessed = checkInput(req.query.number);
    if (!myGuessed) {
        res.status(406).send({ msg: 'Not a legal number.' });
    } else {
        let itGuessed = serverGuessed();
        let { A, B } = compare(myGuessed, target);
        let itResult = compare(itGuessed, target);
        A === 4 ?
        res.send({ msg: 'Equal' }) : itResult.A === 4 ?
        res.send({ msg: `Server won`, target: itGuessed }) : res.send({ msg: `-player-${myGuessed}-${A}A${B}B-\n-server-${itGuessed}-${itResult.A}A${itResult.B}B-\n` });
    }
});

router.post('/restart', (_, res) => {
    genTarget(true);
    res.json({ msg: 'The game has restarted.' });
});

export default router;
