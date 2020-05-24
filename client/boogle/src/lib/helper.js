const getRule = (mat, idx) => {
    const rules = idx.map(id => {
        const substractor = mat + (Math.floor(idx / mat) * mat);
        if ((substractor - idx) > 1 && (substractor - idx) < mat) {
            return ({
                idx: id,
                rule: [1, mat, mat - 1, mat + 1]
            });
        } else {
            return ({
                idx: id,
                rule: [1, mat, (mat - idx === 1) ? mat - 1 : [mat + 1, mat - 1]].flat()
            });
        }
    });
    return (rules)
};

const getWords = (letters, rules, mat) => {
    const probable = rules.map(ruleItm => {
        let idx = ruleItm.idx;
        let rule = ruleItm.rule;
        const substractor = mat + (Math.floor(idx / mat) * mat);
        const words = rule.map(itms => {
            itms = parseInt(itms);
            const words = [];
            if (
                !((substractor - idx) === 1 && itms === 1) &&
                !((substractor - idx) === mat && itms === (mat - 1)) &&
                letters[idx + itms]) {
                words.push({ l: letters[idx + itms], i: idx + itms });
            }
            if (
                !((substractor - idx === mat) && itms === 1) &&
                !((substractor - idx) === 1 && itms === (mat - 1)) &&
                !((substractor - idx) === mat && itms > mat) &&
                letters[idx - itms]
            ) {
                words.push({ l: letters[idx - itms], i: idx - itms });
            }
            return words;
        })
        return ({
            id: idx,
            solution: words.flat().sort((a, b) => (a.i - b.i))
        });
    })
    return (probable)
};

const ruleValidation = (word, letterLists, matSize) => new Promise((resolve, reject) => {
    const letters = word.split('');
    let probables = [];
    const culetterLists = []
    for (let elemIdx = 0; elemIdx < letters.length; elemIdx++) {
        const elemLetter = letters[elemIdx];
        let letterIdx = [];
        letterLists.forEach((itm, idx) => {
            if (itm === elemLetter && culetterLists.indexOf(`${elemLetter}_${idx}`) < 0) letterIdx.push(idx);
        });
        const verify = verifyProbables(elemIdx, elemLetter, probables, letterIdx);
        if (!verify) { return reject('not verified!!!'); }
        else {
            letterIdx = elemIdx > 0 ? verify.map(i => i.i) : letterIdx;
            const probable = findProbables(matSize, letterIdx, letterLists)
            probables = probable;
            culetterLists.push(`${elemLetter}_${probable[0].id}`);
        }
    };
    return resolve(true);
});

const verifyProbables = (letterIdx, letter, probable, letterIdxs) => {
    if (letterIdx < 1) {
        return letterIdxs;
    }
    probable = probable.map(i => i.solution).flat();
    const sols = probable.filter(itm => letterIdxs.indexOf(itm.i) > -1);
    return (sols.length ? sols : false);
}

const findProbables = (mat, idxs, letterLists) => {
    const rules = getRule(mat, idxs);
    const words = getWords(letterLists, rules, mat);
    return words;
};

export {
    ruleValidation
};