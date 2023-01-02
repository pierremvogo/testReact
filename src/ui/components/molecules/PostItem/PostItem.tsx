import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../../../styles/global";
import { Post } from "../../../../feature/publication/domain/entities/Post";
import { AspectRatio } from "native-base";
import CommentList from "../CommentList/CommentList";
import {
  CommentContext,
  CommentContextData,
} from "../../../context/CommentContex";
import { getTimeWithDuration } from "../../../../core/utils/functions";

export type PostProps = {
  post: Post;
  commentInputRef: React.RefObject<TextInput>;
};

const PostItem: React.FC<PostProps> = ({ post, commentInputRef }) => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const [isTap, setIsTap] = useState<boolean>(false);
  const { inComment, setInComment, getPublicationId } =
    useContext<CommentContextData>(CommentContext);
  const handleComment = () => {
    setInComment(true);
    setIsTap(true);
    getPublicationId(post.id);
  };

  useEffect(() => {
    if (inComment === true && isTap === true) {
      commentInputRef.current?.focus();
      setIsTap(false);
    }
  }, [inComment]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profil_pic}></View>
        <View style={styles.text_header}>
          <Text style={globalStyles.text16Bold}>
            {post.user.lastName + " " + post.user.firstName}
          </Text>
          <Text style={globalStyles.text12Lite}>
            {getTimeWithDuration(post.date)}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.description}>
          <Text style={globalStyles.text16}>{post.description}</Text>
        </View>
        <View>
          <Image
            source={{ uri: post.image }}
            style={{
              width: "100%",
              maxHeight: 600,
              aspectRatio: 16 / 9,
              // resizeMode: "contain",
              backgroundColor: "#000000",
            }}
          />
        </View>
        {isDisplay && <CommentList comments={post.comments} />}

        <View style={styles.footer}>
          <TouchableOpacity>
            <View>
              <Text>J'aime {post.like.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComment}>
            <View>
              <Text>Commenter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsDisplay((prev) => !prev)}>
            <View>
              <Text>{isDisplay ? "Cacher" : "Voir commentaire"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  profil_pic: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "red",
    marginRight: 8,
  },
  use_name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text_header: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  body: {
    flexDirection: "column",
  },
  description: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  footer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});

export default PostItem;
