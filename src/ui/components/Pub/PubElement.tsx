import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
    Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity,
    Image,
} from 'react-native';
import tw from "tailwind-react-native-classnames";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export type PubElementProps = {
    data: {
        id: number,
        description: string
    };
};
const PubElement: React.FC<PubElementProps> = ({ data }) => {
    return (
        <View style={tw`mx-2 w-5/6 mx-auto bg-gray-200 my-1 p-2 rounded-lg shadow-md flex-col items-center justify-center `}>
            <Image style={tw`p-5 w-5/6`} source={require('./pubTest.png')} />
            <View>
                <Text style={tw`text-center `}>{data.description}</Text>
            </View>
            <View style={tw`flex-row h-5 relative w-5/6`}>
                <View style={tw` absolute left-0 `}>
                    <Text style={tw`text-center text-gray-500 text-sm `}>Pub: 12/02/2023</Text>
                </View>
                <TouchableOpacity style={tw`absolute right-0`}>
                    <View>
                        <Icon name="comment-text-outline" size={20} />
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default PubElement;