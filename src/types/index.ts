export interface Post {
  id: number;
  title: string;
  body: string;
  nickname: string;
  category: string;
  helpfulCount: number;
  notHelpfulCount: number;
  viewCount: number;
  commentCount: number;
  images: string | null;
  lastCommentedAt: string | null;
  createdAt: string;
}

export interface Comment {
  id: number;
  postId: number;
  nickname: string;
  body: string;
  createdAt: string;
}
