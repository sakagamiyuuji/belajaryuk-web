import { fetchMaterialById } from '../api/curriculum';
import type { MaterialDetail } from '../api/types';
import { useAsyncData } from './useAsyncData';

export function useMaterial(materialId: string | undefined) {
  const { data, loading, error, reload } = useAsyncData(
    async () => {
      if (!materialId) throw new Error('Materi tidak ditemukan.');
      const result = await fetchMaterialById(materialId);
      return result.material;
    },
    [materialId],
  );

  return {
    material: data as MaterialDetail | null,
    loading,
    error,
    reload,
  };
}
