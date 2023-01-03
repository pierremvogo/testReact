import React, { useContext, useEffect, useState } from "react";
import PostItem from "../PostItem/PostItem";
import { FlatList, RefreshControl, TextInput, View, Text } from "react-native";
import { Post } from "../../../../feature/publication/domain/entities/Post";
import PostItemSkeleton from "../PostItemSkeleton/PostItemSkeleton";
import {
  CommentContext,
  CommentContextData,
} from "../../../context/CommentContex";
import { PostContext, PostContextData } from "../../../context/PostContext";

export type PostListProps = {
  isRefreshing: boolean;
  handleRefresh: () => void;
  posts: Post[];
  commentInputRef: React.RefObject<TextInput>;
  setWantToPublish: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostList: React.FC<PostListProps> = ({
  posts,
  isRefreshing,
  handleRefresh,
  commentInputRef,
  setWantToPublish,
}) => {
  const postsForSkeleton = [1, 2, 3, 4];
  const { inComment, setInComment } =
    useContext<CommentContextData>(CommentContext);

  const { posts: postss } = useContext<PostContextData>(PostContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <FlatList
          data={postsForSkeleton}
          renderItem={({ item, index }) => <PostItemSkeleton key={index} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      ) : posts.length === 0 ? (
        <View
          style={{ height: 50, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 16,
              marginTop: 16,
              paddingLeft: 16,
              fontWeight: "500",
            }}
          >
            Aucun post n'a été trouvé
          </Text>
        </View>
      ) : (
        <FlatList
          onScroll={() => {
            setInComment(false);
            setWantToPublish(false);
          }}
          keyExtractor={(item) => item.id}
          data={posts}
          renderItem={({ item }) => (
            <PostItem commentInputRef={commentInputRef} post={item} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </>
  );
};

export default PostList;
