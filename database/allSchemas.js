import Realm from 'realm';

export const TODOLIST_SCHEMA = "TodoList";
export const TODO_SCHEMA = "Todo";

export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        done: { type: 'bool', default: false },
    }
};

export const TodoListSchema = {
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        creationDate: 'date',
        todos: { type: 'list', objectType: TODO_SCHEMA },
    }
};

const databaseOptions = {
    path: 'TodoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0
};
//function for TodoList

export const insertNewTodoList = (newTodoList) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODOLIST_SCHEMA, newTodoList);
            resolve(newTodoList)
            console.log(newTodoList)
        })
    }).catch((error) => reject(error));
});

export const updateTodoList = (todoList) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updateingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id)
            updateingTodoList.name = todoList.name;
            resolve();
        })
    }).catch((error) => reject(error));
});

export const deleteTodoList = (todoListId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId.id);
            realm.delete(deletingTodoList);
            resolve();
        })
    }).catch((error) => reject(error));
});

export const deleteAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingAll = realm.objects(TODOLIST_SCHEMA);
            realm.delete(deletingAll);
            resolve();
        })
    }).catch((error) => reject(error));
});

export const queryAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        //realm.write(() => {
            console.log(realm);
            let allTodoList = realm.objects(TODOLIST_SCHEMA);
            resolve(allTodoList);
            console.log(allTodoList)
        //})
    }).catch((error) => reject(error))
})

export default new Realm(databaseOptions);