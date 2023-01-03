import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Post } from "../../../feature/publication/domain/entities/Post";
import { wait } from "../../../core/utils/functions";
import { CreatePostUsecase } from "../../../feature/publication/domain/usecases/CreatePostUsecase";
import { PublicationDataSourceFactory } from "../../../feature/publication/infra/source/factory/PublicationDataSourceFactory";
import { FindPostsUsecase } from "../../../feature/publication/domain/usecases/FindPostsUsecase";
import PostList from "../../components/molecules/PostList/PostList";
import { CommentContext } from "../../context/CommentContex";
import { PostContext } from "../../context/PostContext";
import { User } from "../../../feature/publication/domain/entities/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import FeatherIcon from "react-native-vector-icons/Feather";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [post, setPost] = useState<Partial<Post>>({});
  const [publishDescription, setPublishDescription] = useState<string>("");

  const [wantPublish, setWantPublish] = useState<boolean>(false);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [isInComment, setIsInComment] = useState<boolean>(false);

  const [textComment, setTextComment] = useState<string>("");

  const [publicationId, setPublicationId] = useState<string>("");

  const [isPost, setIsPost] = useState<boolean>(false);

  const [isEditComment, setIsEditComment] = useState<boolean>(false);

  const [editCommentId, setEditCommentId] = useState<string>("");

  const commentInputRef = useRef<TextInput>(null);

  const createPostUsecase: CreatePostUsecase = new CreatePostUsecase(
    PublicationDataSourceFactory.getSource(),
  );

  const findPostsUsecase: FindPostsUsecase = new FindPostsUsecase(
    PublicationDataSourceFactory.getSource(),
  );

  const handleRefresh = async () => {
    setPosts([]);
    setIsRefreshing(true);
    findPostsUsecase.execute().then(async (value) => {
      await wait(3000).then();
      setIsRefreshing(false);
      setPosts(value.reverse());
    });
  };

  const handleSubmit = async () => {
    if (publishDescription.length === 0) {
      Alert.alert(
        "Non publier",
        "Ce post doit au moins contenir une description",
        [{ text: "OK" }],
      );
    } else {
      createPostUsecase
        .execute({
          description: publishDescription,
          userId: Date.now().toString(),
          image: image,
        })
        .then((post) => {
          setPosts((prev) => [post, ...prev]);
        });
      setPublishDescription("");
      setImage("");
      setWantPublish(false);
    }
  };

  useEffect(() => {
    findPostsUsecase.execute().then(async (value) => {
      await wait(3000).then();
      setPosts(value.reverse());
    });
  }, []);

  const handleSendComment = async () => {
    if (!isEditComment) {
      posts
        .find((post) => post.id === publicationId)
        ?.comments.push({
          user: {
            id: "jsdjsddsj",
            firstName: "Junior",
            lastName: "Temgoua",
          } as User,
          text: textComment,
          id: `63832hhsdh${
            posts.find((post) => post.id === publicationId)?.comments?.length
          }`,
          date: Date.now(),
        });
      commentInputRef.current?.clear();
      setTextComment("");
      setIsInComment(false);
      setIsPost((prev) => !prev);
    } else {
      posts.map((p) =>
        p.comments.map((c) => {
          if (c.id === editCommentId) {
            c.text = textComment;
            return c;
          }
        }),
      );
      commentInputRef.current?.clear();
      commentInputRef.current?.blur();
      setPosts(posts);
      setIsEditComment(false);
      setTextComment("");
      setIsInComment(false);
      await AsyncStorage.setItem("POST", JSON.stringify(posts));
    }
  };

  useEffect(() => {
    if (posts.length !== 0) {
      (async function () {
        await AsyncStorage.setItem("POST", JSON.stringify(posts));
      })();
    }
  }, [isPost]);

  const handleSetCommentText = useCallback(
    (value: string) => {
      setTextComment(value);
    },
    [textComment],
  );
  const [image, setImage] = useState<string>("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 16],
      quality: 1,
    });
    setImage(result.uri as string);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setIsInComment(false);
          }}
        >
          <View>
            <View style={styles.app_bar}>
              <View style={styles.app_bar_content}>
                <View>
                  <Text style={styles.text_icon}>Social Media</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setWantPublish((prev) => !prev)}
                >
                  <View style={styles.add_icon}>
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                      {" "}
                      {wantPublish ? (
                        <Icon name="x" size={24} />
                      ) : (
                        <Icon name="plus" size={24} />
                      )}
                      {""}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              {wantPublish && (
                <View style={styles.post_create}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.profil_pic}>
                      <FeatherIcon name="user" size={26} />
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        marginBottom: 16,
                        marginTop: 16,
                        paddingLeft: 16,
                        fontWeight: "500",
                      }}
                    >
                      Créer une nouvelle publication
                    </Text>
                  </View>
                  <View style={styles.input_upload}>
                    <View style={styles.input}>
                      <TextInput
                        multiline
                        placeholder="Entrer la description"
                        value={publishDescription}
                        onChangeText={(value) => setPublishDescription(value)}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "aliceblue",
                          borderRadius: 46,
                          width: 46,
                          height: 46,
                        }}
                        onPress={pickImage}
                      >
                        <Icon name="camera" size={24} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: "100%",
                        maxHeight: 600,
                        aspectRatio: 16 / 16,
                        // resizeMode: "contain",
                        backgroundColor: "#000000",
                      }}
                    />
                  )}

                  <View style={styles.button}>
                    <Button onPress={handleSubmit} title="Creer" />
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.body}>
          <CommentContext.Provider
            value={{
              inComment: isInComment,
              setInComment: (value: boolean) => {
                setIsInComment(value);
              },
              getPublicationId: (value) => {
                setPublicationId(value);
              },
              commentInputRef,
              setCommentText: handleSetCommentText,
              handleSetIsEdit: (value: boolean, commentId: string) => {
                setIsEditComment(value);
                setEditCommentId(commentId);
              },
            }}
          >
            <PostContext.Provider
              value={{
                posts,
                setPosts: (value) => {
                  setPosts(value);
                },
              }}
            >
              <PostList
                commentInputRef={commentInputRef}
                setWantToPublish={setWantPublish}
                isRefreshing={isRefreshing}
                handleRefresh={handleRefresh}
                posts={posts}
              />
            </PostContext.Provider>
          </CommentContext.Provider>
        </View>

        {isInComment && (
          <View>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 16,
                marginTop: 16,
                paddingLeft: 16,
                fontWeight: "500",
              }}
            >
              {isEditComment
                ? "Modifier le commentaire"
                : "Ajouter un commentaire"}
            </Text>
            <TextInput
              ref={commentInputRef}
              value={textComment}
              multiline
              style={styles.input_comment}
              onChangeText={(value) => {
                setTextComment(value);
              }}
            />
            <TouchableOpacity
              style={styles.send_button}
              onPress={handleSendComment}
            >
              <Text>
                {isEditComment ? (
                  <Icon name="edit-3" size={24} />
                ) : (
                  <Icon name="send" size={24} />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  app_bar: {
    height: 64,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  app_bar_content: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  text_icon: {
    fontSize: 26,
    color: "green",
    fontWeight: "bold",
  },
  add_icon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    marginTop: 16,
    flex: 1,
  },
  post_create: {
    paddingHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  input: {
    flex: 3,

    padding: 16,
    borderBottomWidth: 1,
    maxHeight: 80,
  },
  input_upload: {
    flexDirection: "row",
    alignItems: "center",
  },
  input_comment: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: "rgba(208,208,208,0.5)",
    minHeight: 52,
    maxHeight: 80,
    paddingTop: 16,
    paddingStart: 16,
    paddingEnd: 70,
  },
  send_button: {
    position: "absolute",
    right: 0,
    top: 50,
    bottom: 0,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: 16,
    backgroundColor: "aliceblue",
  },
  profil_pic: {
    height: 46,
    width: 46,
    borderRadius: 100,
    backgroundColor: "rgba(199,199,199,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
