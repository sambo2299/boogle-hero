const checkword = require('check-word');
const Letters = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,u,r,s,t,u,v,w,z,y,z';

const getRandomLetters = (mat) => new Promise((resolve, reject) => {
    let letterdata = Letters.split(',');
    let rndLetterLists = []
    let i = 0;
    // let mat = mat
    while (rndLetterLists.length < (mat * mat)) {
        !function (i) {
            let lt = Math.floor(Math.random() * letterdata.length);
            rndLetterLists.push(letterdata[lt]);
            /**
             * uncomment below conditions if letters need to be unique
             **/
            // if(letterdata[lt] === 'qu') {
            //     letterdata.splice(letterdata.indexOf('u'), 1);
            // }
            // letterdata.splice(lt,1);
            i = rndLetterLists.length;
        }(i)

    }
    resolve(rndLetterLists);
});
const validateword = (word, lang) => new Promise((resolve, reject) => {
    const words = checkword(lang);
    resolve({
        status: words.check(word)
    });
});
const calculateScore = (word) => new Promise((resolve, reject) => {
    let score = 0;
    if (word.length < 3) return resolve({ score, word });
    else {
        switch (word.length) {
            case 3:
            case 4:
                score = 1;
                break;
            case 5:
                score = 2;
                break;
            case 6:
                score = 3;
                break;
            case 7:
                score = 5;
                break;
            default:
                score = 8;
        }
        return resolve({
            score,
            word
        });
    }
});

module.exports = {
    getRandomLetters,
    validateword,
    calculateScore
}