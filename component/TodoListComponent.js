import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { updateTodoList, deleteTodoList, queryAllTodoList } from '../database/allSchemas';
import realm from '../database/allSchemas';
import Swipeout from 'react-native-swipeout';
import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';

const FlatListItem = props => {
    const { itemIndex, id, name, creationDate, popupDialogComponent, onPressItem } = props;
    showEditModal = () => {

    };
    showDeleteConfirmation = () => {
        Alert.alert(
            'Delete',
            'Delete a todoList',
            [
                { text: 'No', onPress: () => { }, style: 'cancel' },
                { text: 'Yes', onPress: () => { } }
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
        <TouchableOpacity onPress = {onPressItem}>
        <View style = {{backgroundColor: itemIndex % 2 == 0 ? 'green' : 'skyblue'}}>
            <Text style = {{fontSize:18, fontWeight:'bold', margin: 10, color: 'red'}}>{name}</Text>
            <Text style = {{fontSize:18,margin: 10, color:'red'}} numberOfLines={2}>{creationDate}</Text>
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
        },
        this.reloadData();
        //Khi csdl thay doi
        realm.addListener('change', () => {
            this.reloadData();
        })
    }

    reloadData = () => {
        queryAllTodoList().then(todoList => {
            this.setState({ todoList })
            console.log(todoList)
        }).catch(error => {
            this.setState({ todoList: [] })
        });
        console.log('reloadData')
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <HeaderComponent title={'TodoList'} hasAddButton={true} showAddTodoList={() => this.refs.popupDialogComponent.showDialogComponentForAdd() } />

                <FlatList
                    style={{ flex: 1, flexDirection: 'column' }}
                    data={this.state.todoList}
                    renderItem={(item, index) => <FlatListItem
                        {...item} itemIndex={index}
                        popupDialogComponent={this.refs.popupDialogComponent}
                        onPressItem={() => { alert('You press item') }}
                    />}
                    keyExtractor={item => item.id}
                />
                <PopupDialogComponent ref={'popupDialogComponent'} />
            </View>
        )
    }
}