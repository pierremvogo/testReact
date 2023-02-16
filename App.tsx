import { View, StyleSheet } from "react-native"
import Home from "./src/ui/screens/Home"

export default function App() {
	return (
		<View style={styles.container}>
			<Home />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		paddingHorizontal: 10,
		//backgroundColor: '#261629'
		backgroundColor: '#000'
	},
})