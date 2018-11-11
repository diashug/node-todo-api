const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
        return ;
    }

    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos.');
    });

    db.collection('Users').find().count().then((count) => {
        console.log(`Users count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch users.');
    });

    db.collection('Users').find().sort('name').toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users.');
    });

    client.close();
});
