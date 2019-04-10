import Realm from 'realm';
import { Alert } from 'react-native';
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
            //console.log(newTodoList)
        })
    }).catch((error) => reject(error));
});

export const updateTodoList = (todoList) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updateingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id)
            updateingTodoList.name = todoList.name;
            updateingTodoList.creationDate = todoList.creationDate;
            resolve();
        })
    }).catch((error) => reject(error));
});

export const deleteTodoList = (todoListId) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
            realm.delete(deletingTodoList);
            realm.delete(deletingTodoList.todos);
            resolve();
        })
    }).catch((error) => reject(error));
});

export const deleteAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingAll = realm.objects(TODOLIST_SCHEMA);
            realm.delete(deletingAll);
            for(var i in deletingAll){
                realm.delete(deletingAll[i].todos)
            }
            resolve();
        })
    }).catch((error) => reject(error));
});

export const queryAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodoList = realm.objects(TODOLIST_SCHEMA);
        const allTodoListArray = Array.from(allTodoList);
        resolve(allTodoListArray);
    }).catch((error) => reject(error))
});

export const filterTodoList = (searchText) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let filteredTodoList = realm.objects(TODOLIST_SCHEMA).filtered(`name CONTAINS[c]  "${searchText}"`);
        const filteredTodoListArray = Array.from(filteredTodoList);
        resolve(filteredTodoListArray)
    }).catch(err => reject(err))
});

export const insertTodo2TodoList = (todoListId, newTodo) => new Promise((resolve,reject) => {
    Realm.open(databaseOptions).then(realm => {
        let todoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
        realm.write(()=>{
            for(var index in newTodo){
                todoList.todos.push(newTodo[index])
            }
            resolve(newTodo);
        }).catch(err => reject(err))
    })
})

export default new Realm(databaseOptions);