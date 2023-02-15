import { View, Text, StyleSheet } from "react-native"
import React from 'react'

const Input = () => {
    return (
        <View style={styles.container}>
          	<Text style={styles.text}>Input</Text>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	text: {
		fontSize: 20,
		color: '#fff'
	}
})

export default Input