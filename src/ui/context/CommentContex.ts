import { createContext } from "react";

export type CommentContextData = {
  inComment: boolean;
  setInComment: (value: boolean) => void;
  getPublicationId: (value: string) => void;
  commentInputRef: any;
  setCommentText: (value: string) => void;
  handleSetIsEdit: (isEdit: boolean, commentId: string) => void;
};

export const CommentContext = createContext<CommentContextData>({
  inComment: false,
  setInComment: (value) => {
    console.log(value);
  },

  getPublicationId: (value) => {
    console.log(value);
  },
  commentInputRef: null,
  setCommentText: (value) => {
    console.log(value);
  },
  handleSetIsEdit: (isEdit: boolean, commentId) => {
    console.log(isEdit);
  },
});
