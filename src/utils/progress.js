const PROGRESS_KEY = 'belajaryuk_progress';

function readAll() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function materialKey(subjectId, chapterId, materialId) {
  return `${subjectId}/${chapterId}/${materialId}`;
}

export function isMaterialCompleted(subjectId, chapterId, materialId) {
  const all = readAll();
  return Boolean(all[materialKey(subjectId, chapterId, materialId)]);
}

export function markMaterialCompleted(subjectId, chapterId, materialId) {
  const all = readAll();
  all[materialKey(subjectId, chapterId, materialId)] = true;
  writeAll(all);
}

export function countCompletedInSubject(subject) {
  const all = readAll();
  let count = 0;
  for (const chapter of subject.chapters) {
    for (const material of chapter.materials) {
      if (all[materialKey(subject.id, chapter.id, material.id)]) {
        count += 1;
      }
    }
  }
  return count;
}
