// 공통 API 응답 타입
export interface ApiResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// 태그 정보
export interface Tag {
  id: number;
  name: string;
}

// 좋아요 정보
export interface Like {
  id: number;
  userId: number;
  lpId: number; // 백엔드에서 이렇게 내려주는 듯
}

// 작성자 정보
export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string; // ISO 문자열이니까 string으로 둬도 됨
  updatedAt: string;
}

// 실제 데이터 부분 (하나의 글/LP?)
export interface LpDetail {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
  author: Author;
}

// 최종 응답 타입
export type LpDetailResponse = ApiResponse<LpDetail>;

export interface Author {
  id: number
  name: string
  email: string
  bio: string | null
  avatar: string | null
  createdAt: string  // ISO 날짜 문자열
  updatedAt: string  // ISO 날짜 문자열
}

export interface CommentItem {
  id: number
  content: string
  lpId: number
  authorId: number
  createdAt: string  // ISO 날짜 문자열
  updatedAt: string  // ISO 날짜 문자열
  author: Author
}

export interface CommentListData {
  data: CommentItem[]
  nextCursor: number
  hasNext: boolean
}

export interface CommentListResponse {
  status: boolean
  statusCode: number
  message: string
  data: CommentListData
}
