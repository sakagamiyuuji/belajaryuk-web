import { fetchSubjectById } from '../api/curriculum';
import type { SubjectDetail } from '../api/types';
import { useAsyncData } from './useAsyncData';

export function useSubject(subjectId: string | undefined) {
  const { data, loading, error, reload } = useAsyncData(
    async () => {
      if (!subjectId) throw new Error('Mata pelajaran tidak ditemukan.');
      const result = await fetchSubjectById(subjectId);
      return result.subject;
    },
    [subjectId],
  );

  return {
    subject: data as SubjectDetail | null,
    loading,
    error,
    reload,
  };
}
