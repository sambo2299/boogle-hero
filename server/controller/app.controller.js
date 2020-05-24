const async = require('async');

const Lib = require('./../lib');

const getLetters = (req, res) => {
    const mat = req.query.mat ? req.query.mat : 4;
    Lib.getRandomLetters(mat)
        .then(resp => {
            res.status(200).send({
                success: true,
                letters: resp,
            });
        })
        .catch(err => {
            // console.log('Unable to get Letters', err);
            res.status(500).send({
                success: false,
                message: 'Internal Server Error!!!'
            });
        });
}

const getScore = (req, res) => {
    if(!req.body || !req.body.words) 
    return res.status(500).send({
        success: false,
        message: 'No words provided!!!'
    });
    const promise = [];
    const words = req.body.words;
    const invalidList = [];
    const validList = [];
    let totalscore = 0;
    for(let i = 0; i < words.length; i++) {
        promise.push(Lib.calculateScore(words[i]));
    }
    Promise.all(promise)
        .then(resp => {
            for(let i = 0 ; i < resp.length ; i++) {
                if(resp[i].score > 0) {
                    totalscore += resp[i].score;
                    validList.push(resp[i]);                
                } else {
                    invalidList.push(resp[i]);
                }
            }
            res.status(200).send({
                success: true,
                score: {
                    totalscore,
                    validList,
                    invalidList
                }
            });
        })
        .catch(err => {
            // console.log('Unable to calculate score', err);
            res.status(500).send({
                success: false,
                message: 'Internal Server Error!!!'
            });
        });
}

const checkword = (req, res) => {
    if(!req.query || !req.query.word) 
        return res.status(500).send({
            success: false,
            message: 'No word provided!!!'
        });
    Lib.validateword(req.query.word, 'en')
    .then(resp => {
        return res.status(200).send({
            success:true,
            validation:resp.status
        });
    })
    .catch(err => {
        // console.log('Unable to validate word!!!');
        res.status(500).send({
            success: false,
            message: 'Internal Server Error!!!'
        });
    });
}

module.exports = {
    getLetters, getScore, checkword
}