const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
        return ;
    }

    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b71572628155b09d27ebaea')
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b7161dd35b9b80b4023262d')
    }, {
        $set: {
            name: 'Miguel Dias'
        },
        $inc: {
            age: 1 // increments the age by 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    client.close();
});
