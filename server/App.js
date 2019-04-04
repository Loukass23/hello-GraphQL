const express = require('express');
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(cors())

mongoose
    .connect('mongodb+srv://Lucas:3Ap3UAuxZtUIN7Rx@cluster0-yuam2.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDb connected');
    })
    .catch(err => console.log(err));


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('Now listning to requests on port 4000')
})