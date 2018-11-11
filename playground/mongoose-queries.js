const { ObjectId } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

var id = '5bd4b7fe9f3aba38b5de0030';

if (!ObjectId.isValid(id)) {
    console.log('Id not valid');
    return;
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        console.log('Id not found');
    } else {
        console.log('Todo by Id', todo);
    }
}).catch(err => console.log(err));
