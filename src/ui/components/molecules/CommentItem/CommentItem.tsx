import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../../../styles/global";
import { Comment } from "../../../../feature/publication/domain/entities/Comment";
import { PostContext, PostContextData } from "../../../context/PostContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CommentContext,
  CommentContextData,
} from "../../../context/CommentContex";
import { getTimeWithDuration } from "../../../../core/utils/functions";
import FeatherIcon from "react-native-vector-icons/Feather";

export type CommentItemType = {
  comment: Comment;
};

const CommentItem: React.FC<CommentItemType> = ({ comment }) => {
  const { posts, setPosts } = useContext<PostContextData>(PostContext);
  const {
    inComment,
    commentInputRef,
    setInComment,
    setCommentText,
    handleSetIsEdit,
  } = useContext<CommentContextData>(CommentContext);
  const [isTap, setIsTap] = useState<boolean>(false);

  const [, setIsDelete] = useState<boolean>(false);
  const handleDeleteComment = async () => {
    for (let i = 0; i < posts.length; i++) {
      console.log(posts[i].comments);
      const comments: Comment[] = posts[i].comments.filter(
        (c) => c.id !== comment.id,
      );
      console.log(comments);
      posts[i].comments = comments;
    }
    setIsDelete((prev) => !prev);
    setPosts(posts);
    await AsyncStorage.setItem("POST", JSON.stringify(posts));
  };

  const handleEditComment = () => {
    setInComment(true);
    commentInputRef.current?.focus();
    setIsTap((prev) => !prev);
  };

  useEffect(() => {
    if (inComment === true && isTap === true) {
      commentInputRef.current?.focus();
      setCommentText(comment.text);
      handleSetIsEdit(true, comment.id);
      setIsTap(false);
    }
  }, [inComment]);

  return (
    <View style={styles.header}>
      <View style={styles.profil_pic}>
        <FeatherIcon name="user" size={24} />
      </View>
      <View style={styles.text_header}>
        <View style={styles.name_text}>
          <Text style={globalStyles.text14Bold}>
            {comment.user.lastName + " " + comment.user.firstName}
          </Text>
          <Text style={[globalStyles.text14Lite]}> {comment.text}</Text>
        </View>
        <View style={styles.actions}>
          <Text style={{ marginRight: 10 }}>
            {" "}
            {getTimeWithDuration(comment.date)}{" "}
          </Text>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={handleDeleteComment}
          >
            <Text> supprimer </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditComment}>
            <Text> Modifier </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profil_pic: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "rgba(199,199,199,0.9)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  use_name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text_header: {
    flexDirection: "column",
    flex: 1,
  },

  name_text: {
    backgroundColor: "rgba(189,189,189,0.5)",
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    paddingVertical: 4,
  },
});

export default CommentItem;
