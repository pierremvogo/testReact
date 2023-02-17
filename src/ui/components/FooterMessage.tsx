import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity,
  Image,
} from 'react-native';
import tw from "tailwind-react-native-classnames";
import Icon from 'react-native-vector-icons/Entypo';
import IconEvil from 'react-native-vector-icons/EvilIcons';
import IconAnt from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from "expo-image-picker";

const FooterMessage = () => {
  const [publication, setPublication] = useState({ image: "", description: "" });
  const [image, setImage] = useState<string>("");

  const chargerImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 16],
      quality: 1,
    });
    if (!result.canceled) {
      setPublication({ ...publication, ["image"]: result.assets[0].uri });
    }
  }
  return (
    <View style={tw` absolute  py-2 w-full bg-gray-300 bottom-0 `}>
      {(publication['image'] != "") &&
        <View style={tw`flex items-center justify-center py-2 relative`}>
          <TouchableOpacity
            onPress={() => { setPublication({ ...publication, ["image"]: "" }) }}
            style={tw`absolute right-0 top-0 px-2`}>
            <View style={tw` `}>
              <IconAnt name="close" size={30} />
            </View>
          </TouchableOpacity>
          <Image source={{ uri: publication.image }} style={{ width: 200, height: 200 }} />
        </View>
      }

      <View style={tw`  w-full bg-gray-300  flex-row `}>
        <View style={tw`ml-5 rounded-xl bg-white flex-row h-14 my-auto w-3/4 `}>
          <TextInput onChangeText={newText => setPublication({ ...publication, ["description"]: newText })} style={tw`w-4/5 border-r h-10 px-3 my-auto`} placeholder="Description .."
            multiline={true}
          />
          <TouchableOpacity
            onPress={chargerImage}
          >
            <View style={tw` justify-center my-auto ml-1 `}>
              <Icon name="camera" size={25} />
            </View>
          </TouchableOpacity>


        </View>

        <TouchableOpacity
        // onPress={publier}
        >
          <View style={tw`bg-blue-600 rounded-full h-12 w-12 items-center justify-center flex mx-2 my-auto `}>
            <IconEvil name="sc-telegram" size={40} color="#fff" style={tw`my-auto mx-auto`} />
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}


export default FooterMessage;