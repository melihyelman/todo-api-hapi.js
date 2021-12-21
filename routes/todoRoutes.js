const { getTodos, getTodo, createTodo, deleteTodo, updateTodo } = require("../controllers/todosController");

// todo routes
module.exports = [
    {
        method: 'GET',
        path: '/todos',
        options: {
            handler: getTodos,
            description: 'Get all todos',
            notes: 'Returns all todos',
            tags: ['api', 'todos']
        }
    },
    {
        method: 'GET',
        path: '/todos/{id}',
        options: {
            handler: getTodo,
            description: 'Get a todo',
            notes: 'Returns a todo',
            tags: ['api', 'todos']
        }
    },
    {
        method: 'POST',
        path: '/todos',
        options: {
            handler: createTodo,
            description: 'Create a todo',
            notes: 'Creates a todo',
            tags: ['api', 'todos']
        }
    },
    {
        method: 'DELETE',
        path: '/todos/{id}',
        options: {
            handler: deleteTodo,
            description: 'Delete a todo',
            notes: 'Deletes a todo',
            tags: ['api', 'todos']
        }
    },
    {
        method: 'PUT',
        path: '/todos/{id}',
        options: {
            handler: updateTodo,
            description: 'Update a todo',
            notes: 'Updates a todo',
            tags: ['api', 'todos']
        }
    }]