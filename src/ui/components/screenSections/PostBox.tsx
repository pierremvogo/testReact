import { View, Text, StyleSheet, Image, Dimensions, Pressable } from "react-native"
import React from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


const PostBox = ({imageUrl, name, time, text, onDelete, onEdit, onReply}: {imageUrl: string, name: string, time: string, text: string, onDelete: any, onEdit: any, onReply: any}) => {


    return (
        <View style={styles.container}>

			<Image source={require('../../../../assets/jugalux.png')} style={styles.logo} />

			<View style={styles.rightSide}>
				<View>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.time}>{time}</Text>
				</View>

				{
					text ? 
						<View style={styles.textBoxPost}>
							<Text style={styles.textPost}>{text}</Text>
						</View>
					:	
					 	null
				}
				<View>
					{
						imageUrl ? 
							<Image
								style={styles.image}
								source={{
									uri: imageUrl,
								}}
							/>
						:
						 null
					}
				</View>

				<View style={styles.actions}>
					{/* <MaterialCommunityIcons 
						name="message-reply-text" 
						size={24} 
						color="#4ADEDE" 
						style={styles.icons} 
						onPress={onReply} 
						android_ripple={{color: '#4ADEDE', borderless: false}}
					/> */}
					<FontAwesome 
						name="edit" 
						size={24} 
						color="#1AA7EC" 
						style={styles.icons} 
						onPress={onEdit} 
						android_ripple={{color: '#1AA7EC', borderless: false}}
					/>
					<MaterialCommunityIcons 
						name="trash-can" 
						size={24} 
						color="#FF6242" 
						style={styles.icons} 
						onPress={onDelete} 
						android_ripple={{color: '#FF6242', borderless: false}}
					/>
				</View>
			</View>

        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderBottomWidth: 1,
		borderBottomColor: '#333',
		marginTop: 20
	},
	text: {
		fontSize: 20,
		color: '#fff'
	},
	logo: {
		width: 50,
		height: 50,
		borderRadius: 50
	},
	rightSide: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 15,
	},
	name: {
		color: '#ebe5eb',
		fontSize: 16,
		fontWeight: 'bold'
	},
	time: {
		color: 'silver',
		fontSize: 12
	},
	textBoxPost: {
		marginVertical: 15,
	},
	textPost: {
		color: '#ebe5eb',
		fontSize: 19
	},
	image: {
		marginTop: 10,
		width: Dimensions.get('screen').width/1.3,
		resizeMode: 'contain',
		borderRadius: 10,
		height: 200
	},
	actions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
		backgroundColor: 'rgba(255, 255, 255, .1)',
		padding: 5,
		borderRadius: 5,
		marginLeft: 'auto'
	},
	icons: {
		marginLeft: 15,
		//marginHorizontal: 10
	},
})

export default PostBox