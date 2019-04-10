import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Dialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { insertNewTodoList, updateTodoList } from '../database/allSchemas';

export default class PopupDialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            isAddNew: true,
            visible: false
        }
    }
    showDialogComponentForAdd = () => {
        ;
        this.setState({
            dialogTitle: 'Add a new Todo List',
            name: '',
            isAddNew: true,
            visible: true
        })
    }
    render() {
        const { dialogTitle } = this.state;
        return (
            <Dialog
                dialogTitle={<DialogTitle title={dialogTitle} />}
                width={0.7} height={180} visible= {this.state.visible}
                ref = {'popupDialog'}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={{ height: 40, padding: 10, margin: 10, borderColor: 'gray', borderWidth: 1 }}
                        placeholder='Enter todo Name '
                        autoCorrect={false}
                        onChangeText={text => this.setState({ name: text })}
                        value={this.state.name}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => {
                            if (this.state.name.trim() == "") {
                                alert('Please enter your todo name');
                                return;
                            } else {
                                this.setState({visible:false});
                                if (this.state.isAddNew == true) {
                                    const newTodoList = {
                                        id: Math.floor(Date.now() / 1000),
                                        name: this.state.name,
                                        creationDate: new Date(),
                                    };
                                    insertNewTodoList(newTodoList)
                                        .then(()=>console.log(newTodoList))
                                        .catch(error => alert(`Insert fail ${error}`));
                                } else {

                                }
                            }
                        }} style={{ backgroundColor: 'steelblue', margin: 10, padding: 10 }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({visible: false}) } style={{ backgroundColor: 'steelblue', margin: 10, padding: 10 }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Dialog>
        )
    }
}