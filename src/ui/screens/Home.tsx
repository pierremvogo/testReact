import { View, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"
import React from 'react'
import Header from "../components/screenSections/Header"
import ModalPost from "../components/screenSections/ModalPost"
import PostsList from "../components/screenSections/PostsList"


const Home = () => {
	
    return (
        <View style={styles.container}>
			<StatusBar style="auto" />
          	
			<Header />		
			<ModalPost />
			<PostsList />

        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default Home