const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectId(),
    text: 'First test todo',
}, {
    _id: new ObjectId(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

// runs before each test case
beforeEach((done) => {
    // clears the collection
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

// test 1
describe('POST /todos', () => {

    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    Todo.find({text}).then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }).catch(err => done(err));
                }
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    }).catch(err => done(err));
                }
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 400 if a todo not found', (done) => {
        var hexId = new ObjectId().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(400)
            .end(done);
    });

    it('should return 404 if ObjectId is invalid', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    Todo.findById(hexId).then((todo) => {
                        expect(todo).toBeFalsy();
                        done();
                    }).catch(err => done(err));
                }
            });
    });

    it('should return 400 if the todo not found', (done) => {
        var hexId = new ObjectId().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(400)
            .end(done);
    });

    it('should return 404 if ObjectId is invalid', (done) => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'testing ...';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text: text, completed: true})
            .expect(200)
            .expect((res) => {
                expect(typeof res.body.todo.completedAt).toBe('number')
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'testing ...';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text: text, completed: false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    });
});
