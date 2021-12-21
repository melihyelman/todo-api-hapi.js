const getTodos = async (req, h) => {
    try {
        const todos = await req.mongo.db.collection("todo").find({}).toArray()
        return h.response(todos)
            .code(200)
    } catch (err) {
        return h.response(err)
            .code(500)
    }
}

const getTodo = async (req, h) => {
    const { id } = req.params;
    const ObjectID = req.mongo.ObjectID;

    try {
        const todo = await req.mongo.db.collection("todo").findOne({ _id: new ObjectID(id) });
        if (!todo || todo === null)
            throw { message: "todo not found" };

        return h.response(todo)
            .code(200);
    } catch (err) {
        return h.response(err)
            .code(500);
    }
}

const createTodo = async (req, h) => {
    const { title } = req.payload;
    if (!title || title.trim().length == 0) return h.response({ error: 'todo not found' }).code(400);

    try {
        const todo = await req.mongo.db.collection("todo").insertOne({ title, completed: false });

        return h.response({ message: "todo created successfully" }).code(201);

    } catch (err) {
        return h.response({ error: err.message }).code(400);
    }

}

const deleteTodo = async (req, h) => {
    const { id } = req.params;
    const ObjectID = req.mongo.ObjectID;

    try {
        const todo = await req.mongo.db.collection('todo').deleteOne({ _id: ObjectID(id) });
        if (todo.deletedCount === 0)
            throw { message: "todo not found" };
        return h.response({ message: "todo deleted successfully" }).code(200);

    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
}

const updateTodo = async (req, h) => {
    const { id } = req.params;
    const { completed, title } = req.payload;
    const ObjectID = req.mongo.ObjectID;
    try {
        const todo = await req.mongo.db.collection('todo').updateOne({ _id: ObjectID(id) }, { $set: { completed, title } });

        return h.response({ message: "todo updated successfully" }).code(200);

    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}