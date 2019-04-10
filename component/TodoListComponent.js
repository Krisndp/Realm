import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { insertTodo2TodoList, updateTodoList, deleteTodoList, queryAllTodoList, deleteAllTodoList, filterTodoList } from '../database/allSchemas';
import realm from '../database/allSchemas';
import Swipeout from 'react-native-swipeout';
import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';
import { SORT_ASCENDING, SORT_DESCENDING } from './sort';

const FlatListItem = props => {
    const { item, popupDialogComponent, onPressItem } = props;
    showEditModal = () => {
        popupDialogComponent.showDialogComponentForUpdate({
            id: item.item.id,
            name: item.item.name,
        })

    };
    showDeleteConfirmation = () => {
        Alert.alert(
            'Delete',
            'Delete a todoList',
            [
                { text: 'No', onPress: () => { }, style: 'cancel' },
                { text: 'Yes', onPress: () => { deleteTodoList(item.item.id).then().catch(err => alert(`Delete fail ${err}`)) } }
            ]
        )
    };

    return (
        <Swipeout right={[
            {
                text: 'Edit',
                backgroundColor: 'blue',
                onPress: showEditModal,
            },
            {
                text: 'Delete',
                backgroundColor: 'red',
                onPress: showDeleteConfirmation,
            }
        ]} autoClose={true}>
            <TouchableOpacity onPress={onPressItem}>
                <View style={{ backgroundColor: item.index % 2 == 0 ? 'green' : 'skyblue' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10, color: 'red' }}>{item.item.name}</Text>
                    <Text style={{ fontSize: 18, margin: 10, color: 'red' }} numberOfLines={2}>{item.item.creationDate.toLocaleString()}</Text>
                </View>
            </TouchableOpacity>

        </Swipeout>
    )
}

export default class TodoListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            sortState: true,
            abc: 'abc',
            search: '',
        },
            this.reloadData();
        //Khi csdl thay doi
        realm.addListener('change', () => {
            this.reloadData();
        })
    }

    reloadData = () => {
        queryAllTodoList().then(todoList => {
            this.setState({ todoList: todoList.sort(function (a, b) { return b.creationDate - a.creationDate }) });
            //this.setState({ todoList })
            console.log(JSON.stringify(todoList))
        }).catch(error => {
            this.setState({ todoList: [] })
        });
        console.log('reloadData')
    }

    sort = () => {
        const todoList = this.state.todoList;
        var todoListSort = this.state.sortState == true ?
            todoList.sort(function (a, b) { return b.creationDate - a.creationDate }) :
            todoList.sort(function (a, b) { return a.creationDate - b.creationDate });
        this.setState({ sortState: !this.state.sortState, todoList: todoListSort })
    }

    deleteAll = () => {
        Alert.alert(
            'Delete',
            'Delete All todoList',
            [
                { text: 'No', onPress: () => { }, style: 'cancel' },
                { text: 'Yes', onPress: () => { deleteAllTodoList().then().catch(err => alert(`Delete all fail ${err}`)) } }
            ]
        )
    }

    filter(text) {
        console.log('as');
        filterTodoList(text)
            .then(filteredTodoList => { console.log(filteredTodoList), this.setState({ todoList: filteredTodoList }) })
            .catch(err => { this.setState({ todoList: [] }), console.log('haha') })
    }

    insert(id) {
        insertTodo2TodoList(id, [
            {
                id: 1,
                name: 'argular',
                done: false,
            },
            {
                id: 2,
                name: 'argular1',
                done: false,
            },
            {
                id: 3,
                name: 'argular2',
                done: true,
            }
        ])
            .then(inserted => { console.log('a'), alert(`Insert ${JSON.stringify(inserted)}`) })
            .catch(err => alert(`Err ${err}`), console.log('b'))
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <HeaderComponent hasSortButton={true} sort={() => this.sort()} sortState={this.state.sortState} deleteAll={() => this.deleteAll()} title={'TodoList'} hasDeleteAllButton={true} hasAddButton={true} showAddTodoList={() => this.refs.popupDialogComponent.showDialogComponentForAdd()} />
                <TextInput placeholder='Search' autoCorrect={false}
                    onChangeText={text => { this.setState({ search: text }), this.filter(text) }}
                    style={{ height: 40, width: 200, backgroundColor: 'white', color: 'black', fontSize: 18, padding: 10 }} value={this.state.search} />
                <FlatList
                    style={{ flex: 1, flexDirection: 'column' }}
                    data={this.state.todoList}
                    renderItem={(item, index) => <FlatListItem
                        item={item}
                        popupDialogComponent={this.refs.popupDialogComponent}
                        onPressItem={() => alert(JSON.stringify(item.item.todos))}

                    />}
                    keyExtractor={item => item.id}
                />
                <PopupDialogComponent ref={'popupDialogComponent'} />
            </View>
        )
    }
}