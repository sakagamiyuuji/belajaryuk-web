import { apiRequest } from './client';
import type {
  MaterialDetailData,
  SubjectDetailData,
  SubjectsListData,
} from './types';

export async function fetchSubjects(): Promise<SubjectsListData> {
  return apiRequest<SubjectsListData>('/api/subjects');
}

export async function fetchSubjectById(id: string): Promise<SubjectDetailData> {
  return apiRequest<SubjectDetailData>(`/api/subjects/${encodeURIComponent(id)}`);
}

export async function fetchMaterialById(id: string): Promise<MaterialDetailData> {
  return apiRequest<MaterialDetailData>(
    `/api/materials/${encodeURIComponent(id)}`,
  );
}
