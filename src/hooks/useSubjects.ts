import { fetchSubjects } from '../api/curriculum';
import type { Subject } from '../api/types';
import { useAsyncData } from './useAsyncData';

export function useSubjects() {
  const { data, loading, error, reload } = useAsyncData(
    async () => {
      const result = await fetchSubjects();
      return result.subjects;
    },
    [],
  );

  return {
    subjects: (data ?? []) as Subject[],
    loading,
    error,
    reload,
  };
}
