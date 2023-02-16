import { View, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"
import React from 'react'
import * as SQLite from 'expo-sqlite'
import Header from "../components/screenSections/Header"
import ModalPost from "../components/screenSections/ModalPost"
import PostsList from "../components/screenSections/PostsList"

const db = SQLite.openDatabase('db.TestDevMobileApp')

const Home = () => {

	db.transaction(tx => {
		tx.executeSql(
		  	'CREATE TABLE IF NOT EXISTS Posts (id INTEGER PRIMARY KEY AUTOINCREMENT, \
				description TEXT(1000), \
				image BLOB, \
				date DATE \
			)'
		)
	})
	
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