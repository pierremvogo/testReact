import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import { Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import tw from "tailwind-react-native-classnames";
import Icon from 'react-native-vector-icons/Entypo';
import IconEvil from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from "expo-image-picker";
import { Provider } from 'react-redux';
import FooterMessage from "./src/ui/components/FooterMessage";
import store from "./src/ui/redux/store";
import PubElement from "./src/ui/components/Pub/PubElement";
function App() {
  const [data, setData] = useState([
    { id: 1, description: "Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice." },
    { id: 1, description: "Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice." },
    { id: 1, description: "Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice." },
    { id: 1, description: "Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice." },
    { id: 1, description: "Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice." },
    { id: 1, description: "Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice." },
    { id: 1, description: "Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice." },
    { id: 1, description: "Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice." },
  ])

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={tw` flex  h-20 items-center  justify-center bg-blue-600 shadow-lg `}>
          <Text style={tw`text-xl font-bold text-white mt-5`}>
            Publications
          </Text>
        </View>
        <ScrollView>
          <FlatList data={data} showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => <PubElement data={item} key={index} />} />

        </ScrollView>

        <FooterMessage />
      </SafeAreaView>
    </Provider>

  );
}
export default App;
