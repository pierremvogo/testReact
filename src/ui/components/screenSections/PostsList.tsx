import { ScrollView, StyleSheet } from "react-native"
import React from 'react'
import PostBox from "./PostBox"


const PostsList = () => {


    return (
        <ScrollView style={styles.container}>

          	<PostBox 
				name='Gaëlle Tamho'
				time='Today, 12h30'
				text="Hello i'm new in mobile dev... Who can help me please?"
				imageUrl='https://www.businessofapps.com/wp-content/uploads/2019/11/zymr_react_native_app_dev_cover.jpg'
				onReply={() => {alert('Reply this post !!')}}
				onEdit={() => {alert('Edit this post !!')}}
				onDelete={() => {alert('Delete post !!')}}
			/>

			<PostBox 
				name='Gaëlle Tamho'
				time='Today, 12h30'
				text="Hello i'm new in mobile dev... Who can help me please?"
				imageUrl='https://dotmind.io/wp-content/uploads/2021/10/illustration-react-native-application.png'
				onReply={() => {alert('Reply this post !!')}}
				onEdit={() => {alert('Edit this post !!')}}
				onDelete={() => {alert('Delete post !!')}}
			/>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 20
	},
})

export default PostsList