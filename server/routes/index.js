const controller = require('./../controller');

module.exports = app => {
    app.get('/', (req, res) => {
        res.render('index.html');
    });    
    app.use('/api', controller);
}