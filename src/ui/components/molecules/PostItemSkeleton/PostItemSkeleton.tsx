import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Box, Button, Center, HStack, Skeleton, VStack } from "native-base";

const PostItemSkeleton: React.FC = () => {
  return (
    <View style={{ marginVertical: 16 }}>
      <Center w="100%">
        <Box w="100%" maxWidth="400">
          <VStack
            maxWidth="400"
            // borderWidth="1"
            // space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            <Center w="100%">
              <HStack
                w="100%"
                maxW="400"
                space={8}
                rounded="md"
                _dark={{
                  borderColor: "coolGray.500",
                }}
                _light={{
                  borderColor: "coolGray.200",
                }}
                py="4"
                px="2"
              >
                <View style={{ flex: 0.5 }}>
                  <Skeleton size="60" rounded="full" startColor={"#D6E4E5"} />
                </View>
                <VStack flex="3.5" space="12">
                  <Skeleton.Text lines={2} startColor={"#D6E4E5"} />
                </VStack>
              </HStack>
            </Center>
            <Skeleton.Text lines={4} startColor={"#D6E4E5"} />

            <Skeleton h="250" mt={4} startColor={"#D6E4E5"}>
              <Image
                style={{ height: 40 }}
                source={{
                  uri: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
                }}
              />
            </Skeleton>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};

export default PostItemSkeleton;
