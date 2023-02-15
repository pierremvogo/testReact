import { View, Text, StyleSheet, Image } from "react-native"
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const Header = () => {
    return (
        <View style={styles.container}>
        
            <Image source={require('../../../../assets/logo.png')} style={styles.logo} />

            <Text style={styles.text}>Actualities</Text>

            <FontAwesome name="bell" size={20} color="#1AA7EC" />

        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 20,
        borderBottomColor: '#333',
        borderBottomWidth: 1
	},
	text: {
		fontSize: 18,
		color: '#ebe5eb',
        fontWeight: 'bold',
        //marginTop: 'auto'
	},
    logo: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#fff'
    }
})

export default Header