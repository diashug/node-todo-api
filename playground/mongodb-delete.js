const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
        return ;
    }

    console.log('Connected to MongoDB server.');

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text: 'Change diapers'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Hugo Dias'});

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b7161f44e2a0c0b52fac7a1')}).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });

    client.close();
});
