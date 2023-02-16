import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'


const Input = ({value, keyboardType, handleChange, placeholder}:{value: any, keyboardType: any, handleChange: any, placeholder: string}) => {
    
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                keyboardType={keyboardType}
				placeholder={placeholder}
                onChangeText={text => handleChange(text)}
                style={styles.input}
				numberOfLines={5}
				multiline
				editable
				maxLength={800}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 10,
    },
    input: {
        borderBottomWidth: 1,
        fontSize: 16,
        padding: 3,
        paddingLeft: 10,
		color: '#261629',
        borderBottomColor: '#ebe5eb',
        backgroundColor: 'rgba(38, 22, 41, .4)',
		borderRadius: 10
    }
})

export default Input
