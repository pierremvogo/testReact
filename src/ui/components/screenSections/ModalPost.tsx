import { View, Image, StyleSheet, Text, ScrollView } from "react-native"
import React from 'react'


const ModalPost = () => {	
	  
    return (
		<View>
			<Text style={{ color: '#eee', fontSize: 17, marginTop: 10, fontWeight: 'bold' }}>Stories</Text>
			<ScrollView horizontal style={styles.container}>
				<Image source={require('../../../media/react.jpg')} style={styles.img} />
				<Image source={require('../../../media/react.jpeg')} style={styles.img} />
				<Image source={require('../../../media/react.png')} style={styles.img} />
				<Image source={require('../../../media/react.jpg')} style={styles.img} />
				<Image source={require('../../../media/react.jpeg')} style={styles.img} />
				<Image source={require('../../../media/react.png')} style={styles.img} />
			</ScrollView>
		</View>
    )
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingVertical: 20,
		borderBottomColor: '#333',
		borderBottomWidth: 1
	},
	img: {
		borderRadius: 50,
		width: 50,
		height: 50,
		resizeMode: 'contain',
		backgroundColor: '#111',
		marginHorizontal: 15,
		borderWidth: 1,
		borderColor: 'violet'
	}
})

export default ModalPost