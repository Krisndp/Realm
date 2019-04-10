import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';

const HeaderComponent = props => {
    const { title, showAddTodoList, hasAddButton, hasSortButton, sort, sortState, hasDeleteAllButton } = props;

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'pink', height: 80 }}>
            {hasAddButton &&
                <TouchableOpacity style={{ zIndex: 2, marginRight: 10, marginTop: 30 }} onPress = {showAddTodoList}>
                    <Image style={{ width: 40, height: 40, tintColor: 'blue' }} source={{ uri: 'https://img.icons8.com/ios/50/000000/plus.png' }} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default HeaderComponent;