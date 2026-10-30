import { PORTFOLIO_DATA } from '../data.js';

const STORAGE_KEY = 'alfaiz_portfolio_projects_v1';

/**
 * Get stored projects from localStorage.
 * If none exists, initializes with default projects from PORTFOLIO_DATA.
 */
export function getStoredProjects() {
  if (typeof window === 'undefined') return PORTFOLIO_DATA.projects;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PORTFOLIO_DATA.projects));
      return PORTFOLIO_DATA.projects;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Gagal membaca data portfolio dari localStorage:', err);
  }
  return PORTFOLIO_DATA.projects;
}

/**
 * Save projects array to localStorage and dispatch update event.
 */
export function saveProjects(projects) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent('portfolio_projects_changed', { detail: projects }));
  } catch (err) {
    console.error('Gagal menyimpan portfolio ke localStorage:', err);
    throw err;
  }
}

/**
 * Add a new project to the stored list.
 */
export function addProject(projectInput) {
  const current = getStoredProjects();

  // Generate sequential 2-digit ID e.g. "05", "06"
  const numericIds = current
    .map(p => parseInt(p.id, 10))
    .filter(n => !isNaN(n));
  const nextNum = numericIds.length > 0 ? Math.max(...numericIds) + 1 : current.length + 1;
  const formattedId = String(nextNum).padStart(2, '0');

  // Format deliverables array
  let cleanDeliverables = [];
  if (Array.isArray(projectInput.deliverables)) {
    cleanDeliverables = projectInput.deliverables;
  } else if (typeof projectInput.deliverables === 'string') {
    cleanDeliverables = projectInput.deliverables
      .split(',')
      .map(d => d.trim())
      .filter(Boolean);
  }
  if (cleanDeliverables.length === 0) {
    cleanDeliverables = ['Full-Stack Implementation', 'Responsive UI Architecture', 'System Integration'];
  }

  const rawTitle = projectInput.title?.trim() || 'UNTITLED PROJECT';
  const rawCategory = projectInput.category?.trim() || 'WEB APPLICATION';
  const rawTag = projectInput.tag?.trim() || 'FULL-STACK';

  const newProject = {
    id: projectInput.id ? String(projectInput.id).padStart(2, '0') : formattedId,
    title: rawTitle.toUpperCase(),
    category: rawCategory.toUpperCase(),
    tag: rawTag.toUpperCase(),
    heroTitle: projectInput.heroTitle?.trim() 
      ? projectInput.heroTitle.trim().toUpperCase() 
      : rawTitle.toUpperCase().replace(/\s+/g, '\n'),
    heroSubtitle: projectInput.heroSubtitle?.trim() 
      ? projectInput.heroSubtitle.trim().toUpperCase() 
      : rawCategory.toUpperCase(),
    heroDesc: projectInput.heroDesc?.trim() 
      ? projectInput.heroDesc.trim().toUpperCase() 
      : rawTag.toUpperCase(),
    theme: projectInput.theme || 'dark-custom',
    image: projectInput.image?.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=85',
    description: projectInput.description?.trim() || 'Deskripsi proyek belum ditambahkan.',
    deliverables: cleanDeliverables,
    year: projectInput.year?.trim() || String(new Date().getFullYear()),
    client: projectInput.client?.trim() || 'Personal Project',
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  // Add new project to the list (appended to maintain ID ordering)
  const updated = [...current, newProject];
  saveProjects(updated);
  return { updated, newProject };
}

/**
 * Delete a project by ID.
 */
export function deleteProject(projectId) {
  const current = getStoredProjects();
  const updated = current.filter(p => p.id !== projectId);
  saveProjects(updated);
  return updated;
}

/**
 * Reset to default initial projects.
 */
export function resetToDefaultProjects() {
  saveProjects(PORTFOLIO_DATA.projects);
  return PORTFOLIO_DATA.projects;
}

/**
 * Export projects as a downloadable JSON file.
 */
export function exportProjectsJSON() {
  const projects = getStoredProjects();
  const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-projects-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import projects from a JSON string or parsed array.
 */
export function importProjectsJSON(jsonContent) {
  try {
    const parsed = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
    if (Array.isArray(parsed) && parsed.length > 0) {
      saveProjects(parsed);
      return parsed;
    }
    throw new Error('Format JSON tidak valid atau bukan array proyek.');
  } catch (err) {
    console.error('Gagal import file JSON:', err);
    throw err;
  }
}
