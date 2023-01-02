import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommentItem from "../CommentItem/CommentItem";
import { Comment } from "../../../../feature/publication/domain/entities/Comment";

export type CommentProps = {
  comments: Comment[];
};

const CommentList: React.FC<CommentProps> = ({ comments }) => {
  return (
    <View style={styles.container}>
      {comments.length === 0 && (
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 16,
          }}
        >
          Aucun commentaire
        </Text>
      )}
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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

  name_text: {
    backgroundColor: "rgba(150,150,150,0.5)",
    borderRadius: 10,
    padding: 10,
  },
});

export default CommentList;
