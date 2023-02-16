import { View, Text, StyleSheet, Image, Modal, Button, Pressable, Alert } from "react-native"
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as SQLite from 'expo-sqlite'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import Input from "../elements/Input"


const db = SQLite.openDatabase('db.TestDevMobileApp')

const Header = () => {

    const [isModalVisible, setModalVisible] = useState(false)
	const [image, setImage] = useState('')
    const [description, setDescription] = useState('')

	const openModal = () => {
		setModalVisible(true)
	}

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const PostData = () => {
        if (description === '' || image === null) {
            Alert.alert('Error', 'Please enter a description and add an image.');
          return
        }
    
        const now = new Date()
        const date = now.toLocaleDateString()
        const time = now.toLocaleTimeString()
    
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Posts (description, image, date) VALUES (?, ?, ?)',
                [description, image, `${date} ${time}`],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        Alert.alert('Success', 'The post has been successfully saved.');
                        setDescription('')
                        setImage('')
                        setModalVisible(false)
                    } else {
                        Alert.alert('Error', "An error occurred while saving the post.");
                    }
                }
            )
        })
    }

    return (
        <View style={styles.container}>
        
            <Pressable android_ripple={{ color: 'violet', borderless: true }}>
                <Image source={require('../../../../assets/logo.png')} style={styles.logo} />
            </Pressable>

            <Text style={styles.text}>Actualities</Text>

            <Pressable android_ripple={{ color: 'violet', borderless: true }}>
                <AntDesign name="edit" size={28} color="violet" onPress={openModal} />
            </Pressable>

            <Modal visible={isModalVisible} transparent={true} animationType='fade' presentationStyle='overFullScreen'>
				<View style={{ backgroundColor: '#fff', padding: 20, margin: 20, marginTop: 90 }}>

					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={styles.title}>CREATE NEW POST</Text>
						<Ionicons name="close" size={24} color="silver" onPress={() => setModalVisible(false)} />
					</View>

					<View>
						<Input 
							value={description} 
							placeholder='Hello, you can type here'
							keyboardType='default' 
							handleChange={(text: string) => setDescription(text)} 
						/>
                        {image && <Image source={{ uri: image }} style={styles.image} />}

						<FontAwesome5 onPress={pickImage} name="images" size={22} color="#261629" style={{ textAlign: 'right', marginRight: 5, marginBottom: 15 }} />
					</View>

					<Button title="Publish" color='#481366' onPress={PostData} />
					
				</View>
			</Modal>

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
    },
    title: {
		textAlign: 'center',
		color: '#261629',
		fontSize: 19,
		fontWeight: 'bold',
		marginBottom: 20
	},
    image: {
        width: 250,
        height: 200,
        resizeMode: 'cover',
        marginVertical: 16,
        borderRadius: 10,
        alignSelf: 'center'
    }
})

export default Header