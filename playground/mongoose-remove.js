const { ObjectId } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

// Todo.remove({}).then((res) => {
//     console.lor(res);
// });

//Todo.findOneAndRemove
//
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5be896224d1f1e28a43a23c3').then((todo) => {
    console.log(todo);
});
