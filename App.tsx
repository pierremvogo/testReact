import { StatusBar } from "expo-status-bar";

import { Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import Icon from 'react-native-vector-icons/Entypo';
import IconEvil from 'react-native-vector-icons/EvilIcons';
function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={tw` flex  h-20 items-center  justify-center bg-blue-600 shadow-lg `}>
        <Text style={tw`text-xl font-bold text-white mt-5`}>
          Publications
        </Text>
      </View>
      <View style={tw` absolute h-20 w-full bg-gray-300 bottom-0 flex flex-row `}>

        <View style={tw`ml-5 rounded-xl bg-white flex-row h-14 my-auto w-3/4 `}>
          <TextInput style={tw`w-4/5 border-r h-10 px-3 my-auto`} placeholder="Message .."
            multiline={true}
          />
          <TouchableOpacity>
            <View style={tw` justify-center my-auto ml-1 `}>
              <Icon name="camera" size={25} />
            </View>
          </TouchableOpacity>


        </View>
        <TouchableOpacity>
          <View style={tw`bg-blue-600 rounded-full h-12 w-12 items-center justify-center flex mx-2 my-auto `}>
            <IconEvil name="sc-telegram" size={40} color="#fff" style={tw`my-auto mx-auto`} />
          </View>
        </TouchableOpacity>


      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: '#0000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
})
export default App;
