import { ScrollView, StyleSheet, Alert, View, Text, Modal, Image, Button, RefreshControl } from "react-native"
import React, { useEffect, useState, useRef, useCallback } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as SQLite from 'expo-sqlite'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import PostBox from "./PostBox"
import Input from "../elements/Input"


const db = SQLite.openDatabase('db.TestDevMobileApp')

//Refresh control
const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}



const PostsList = () => {

	const [posts, setPosts] = useState([])
	const [isModalVisible, setModalVisible] = useState(false)
	const [newImage, setNewImage] = useState('')
    const [newDescription, setNewDescription] = useState('')
	const [postId, setPostId] = useState(0)
	const [refreshing, setRefreshing] = useState(false)
    const [key, setKey] = useState(0)
    const mounted = useRef<any>()


	const openModalUpdate = (id: number, data: any) => {
		setPostId(id)
		setNewDescription(data.description)
		setNewImage(data.image)
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
            setNewImage(result.assets[0].uri)
        }
    }

	useEffect(() => {
		// get post List and set it to posts state
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Posts',
                [],
                (tx, results) => {
                    let temp: any = []
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setPosts(temp)
                }
            )
        })

	}, [])

	const updatePost = (postId: number) => {

		if (newDescription === '' || newImage === null) {
            Alert.alert('Error', 'Please enter a description and add an image.');
          	return
        }
    
        const now = new Date()
        const newDate = now.toLocaleDateString()
        const newTime = now.toLocaleTimeString()

		db.transaction(tx => {
			tx.executeSql(
				'UPDATE Posts SET description=?, image=? WHERE id=?',
				[newDescription, newImage, postId],
				(tx, results) => {
					if (results.rowsAffected > 0) {
						Alert.alert('Success', 'The post has been successfully updated.')
						setModalVisible(false)
					} else {
						Alert.alert('Error', "An error occurred while updating the post.")
					}
				}
			)
		})
	}

	const deletePost = (postId: number) => {
		db.transaction(tx => {
			tx.executeSql(
				'DELETE FROM Posts WHERE id=?',
				[postId],
				(tx, results) => {
					if (results.rowsAffected > 0) {
					Alert.alert('Success', 'The post has been successfully deleted.');
					} else {
					Alert.alert('Erreur', "An error occurred while deleting the post.");
					}
				}
			)
		})
	}

	//Refresh control
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setKey((prevKey) => prevKey + 1)
        wait(2000).then(() => setRefreshing(false))
    }, [])


    return (
        <ScrollView 
			style={styles.container}
			key={key}
                refreshControl={
                    <RefreshControl
						colors={['#261629']}
						refreshing={refreshing}
						onRefresh={onRefresh}
                    />
            }

		>

			{
				posts !== [] ?
						posts.map(({id, description, date, image}) => {
							return(
								<PostBox 
									key={id}
									name='Gaëlle Tamho'
									time={date}
									text={description}
									imageUrl={image}
									onReply={() => {alert('Reply this post !!')}}
									onEdit={() => openModalUpdate(id, {'id': id, 'description': description, 'date': date, 'image': image })}
									onDelete={() => deletePost(id)}
								/>
							)
						})
					:
						
						<Text style={{ textAlign: 'center', marginTop: 50, color: '#aaa', fontWeight: 'bold', fontSize: 17 }}>No item to display !</Text>
			}

			<Modal visible={isModalVisible} transparent={true} animationType='fade' presentationStyle='overFullScreen'>
				<View style={{ backgroundColor: '#fff', padding: 20, margin: 20, marginTop: 90 }}>

					<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={styles.title}>EDIT POST</Text>
						<Ionicons name="close" size={24} color="silver" onPress={() => setModalVisible(false)} />
					</View>

					<View>
						<Input 
							value={newDescription} 
							placeholder='Hello, you can type here'
							keyboardType='default' 
							handleChange={(text: string) => setNewDescription(text)} 
						/>
                        {newImage && <Image source={{ uri: newImage }} style={styles.image} />}

						<FontAwesome5 onPress={pickImage} name="images" size={22} color="#261629" style={{ textAlign: 'right', marginRight: 5, marginBottom: 15 }} />
					</View>

					<Button title="Publish" color='#481366' onPress={() => updatePost(postId)} />
					
				</View>
			</Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 20
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

export default PostsList