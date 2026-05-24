export type ContentType = 'text' | 'video';

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  error: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthLoginData {
  accessToken: string;
  user: User;
}

export interface MaterialSummary {
  id: string;
  chapterId: string;
  title: string;
  contentType: ContentType;
  likesCount: number;
  orderIndex: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  orderIndex: number;
  materials: MaterialSummary[];
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  orderIndex: number;
}

export interface SubjectDetail extends Subject {
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
}

export interface MaterialDetail {
  id: string;
  chapterId: string;
  title: string;
  contentType: ContentType;
  contentBody: string | null;
  videoUrl: string | null;
  likesCount: number;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectsListData {
  subjects: Subject[];
}

export interface SubjectDetailData {
  subject: SubjectDetail;
}

export interface MaterialDetailData {
  material: MaterialDetail;
}
