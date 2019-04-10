import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import {SORT_ASCENDING, SORT_DESCENDING} from './sort'
const HeaderComponent = props => {
    const { title, showAddTodoList, hasAddButton, hasSortButton, sort, sortState, hasDeleteAllButton, deleteAll } = props;
    var sortIcon = sortState == true ?
        {uri: 'https://img.icons8.com/ios/50/000000/sort-up.png'} :
        {uri: 'https://img.icons8.com/ios/50/000000/sort-down.png'} ;

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'pink', height: 80 }}>
            {hasAddButton &&
                <TouchableOpacity style={{ zIndex: 2, marginRight: 10, marginTop: 30, justifyContent: 'center', alignItems: 'center' }} onPress={showAddTodoList}>
                    <Image style={{ width: 40, height: 40, tintColor: 'blue' }} source={{ uri: 'https://img.icons8.com/ios/50/000000/plus.png' }} />
                </TouchableOpacity> 
            }
            {hasSortButton &&
                <TouchableOpacity style={{ zIndex: 2, marginRight: 10, marginTop: 30, justifyContent: 'center', alignItems: 'center' }} onPress={sort}>
                    <Image style={{ width: 40, height: 40, tintColor: 'yellow' }} source={sortIcon} />
                </TouchableOpacity> 
            }
            {hasDeleteAllButton &&
                <TouchableOpacity style={{ zIndex: 2, marginRight: 10, marginTop: 30, justifyContent: 'center', alignItems: 'center' }} onPress={deleteAll}>
                    <Image style={{ width: 40, height: 40, tintColor: 'green' }} source={{ uri: 'https://img.icons8.com/ios/50/000000/trash.png' }} />
                </TouchableOpacity> 
            }
        </View>
    )
}

export default HeaderComponent;