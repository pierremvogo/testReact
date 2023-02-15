import { View, Text, StyleSheet, TextInput } from "react-native"
import React from 'react'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


const ModalPost = () => {
    return (
        <View style={styles.container}>
			<View style={styles.flex}>
				<FontAwesome5 name="smile-wink" size={24} color="#ebe5eb" />
          		<Text style={styles.text}>What's new today ?</Text>
			</View>
			<Ionicons name="send-sharp" size={20} color="#ebe5eb" />
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(255, 255, 255, .2)',
		borderRadius: 5,
		padding: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	text: {
		fontSize: 16,
		color: '#ebe5eb',
		marginLeft: 5,
		marginTop: 3
	},
	flex: {
		display: 'flex',
		flexDirection: 'row'
	}
})

export default ModalPost