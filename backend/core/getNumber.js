let target = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const swap = (a, b, target) => {
    [target[a], target[b]] = [target[b], target[a]];
}

const genTarget = (newGame=false) => {
    if (newGame) {
        let step = 100;
        while (step--) {
            swap(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), target);
        }
        console.log("The answer is", target[0], target[1], target[2], target[3]);
    }
    return target;
}

export { genTarget, swap };