const mongoose = require('mongoose');

async function connext() {
    try {
        await mongoose.connect('mongodb://localhost:27017/natural_prod', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!!');
    } catch(error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connext }