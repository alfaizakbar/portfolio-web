import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Upload, 
  Link as LinkIcon, 
  Check, 
  Trash2, 
  Eye, 
  EyeOff,
  Sparkles, 
  RotateCcw, 
  Download, 
  FolderDown, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Lock,
  User,
  KeyRound,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { FourPointStar } from './FourPointStar';
import { 
  addProject, 
  deleteProject, 
  resetToDefaultProjects, 
  exportProjectsJSON, 
  importProjectsJSON 
} from '../utils/portfolioStorage';
import { checkAuth, login, logout } from '../utils/auth';

const CURRENT_YEAR = new Date().getFullYear().toString();

// Quick Category suggestions
const CATEGORY_PRESETS = [
  'WEB APPLICATION',
  'MOBILE APP',
  'FULL-STACK SYSTEM',
  'ROBOTIC PROCESS AUTOMATION',
  'AI & MACHINE LEARNING',
  'IOT & EMBEDDED SYSTEM'
];

// Quick Tag suggestions
const TAG_PRESETS = [
  'REACT + VITE & TAILWIND',
  'LARAVEL & MYSQL',
  'FLUTTER & FIREBASE',
  'UIPATH ENTERPRISE',
  'PYTHON & FASTAPI',
  'NEXT.JS & SUPABASE'
];

// Sample Image Presets for rapid testing
const IMAGE_PRESETS = [
  {
    name: 'Modern Web / UI',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Code / Dashboard',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Mobile App',
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=85'
  },
  {
    name: 'Tech / AI Network',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85'
  }
];

/* ================== LOGIN GATE SCREEN ================== */
function AdminLoginScreen({ onLoginSuccess, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = login(username, password);
    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="w-full max-w-md bg-surface-card border border-white/10 rounded-2xl p-7 sm:p-9 shadow-[0_0_80px_rgba(255,94,0,0.18)] relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-brand/20 blur-3xl pointer-events-none rounded-full" />

        {/* Back Link */}
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>KEMBALI KE BERANDA</span>
        </button>

        {/* Shield Icon Header */}
        <div className="text-center space-y-3 mb-7">
          <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/40 flex items-center justify-center text-brand mx-auto shadow-[0_0_30px_rgba(255,94,0,0.25)]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
              <FourPointStar className="w-3 h-3" />
              <span>AREA ADMINISTRATOR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-white uppercase tracking-tight mt-1">
              LOGIN ADMIN
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
              Halaman ini dilindungi. Masukkan username dan password administrator untuk mengelola portfolio.
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 flex items-center gap-2.5 text-xs animate-slide-up">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-zinc-400 mb-1.5">
              USERNAME
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-zinc-400 mb-1.5">
              PASSWORD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg pl-10 pr-10 py-2.5 text-xs text-white placeholder-zinc-600 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-xs tracking-[0.18em] uppercase py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(255,94,0,0.3)] flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
          >
            <span>{loading ? 'MEMERIKSA KREDENSIAL...' : 'MASUK KE STUDIO PORTFOLIO'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-white/5 text-center">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
            Al Faiz Akbar Thaib • Portfolio Management
          </p>
        </div>

      </div>
    </div>
  );
}

/* ================== MAIN STUDIO PAGE ================== */
export function AddProjectPage({ projects, setProjects, onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuth());
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tag: '',
    image: '',
    description: '',
    year: CURRENT_YEAR,
    client: 'Personal Project',
    deliverables: 'Architecture Design, Responsive Interface, RESTful API Integration',
    heroTitle: '',
    heroSubtitle: '',
    heroDesc: ''
  });

  const [imageMode, setImageMode] = useState('upload'); // 'upload' | 'url'
  const [imageFileName, setImageFileName] = useState('');
  const [imageFileSize, setImageFileSize] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const jsonImportRef = useRef(null);

  // Sync auth state across events / storage
  useEffect(() => {
    const handleAuthChange = (e) => {
      if (e.detail && typeof e.detail.authenticated === 'boolean') {
        setIsAuthenticated(e.detail.authenticated);
      } else {
        setIsAuthenticated(checkAuth());
      }
    };
    window.addEventListener('portfolio_auth_changed', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('portfolio_auth_changed', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm('Yakin ingin logout dari sesi administrator?')) {
      logout();
      setIsAuthenticated(false);
    }
  };

  // If not authenticated, render login gate!
  if (!isAuthenticated) {
    return (
      <AdminLoginScreen 
        onLoginSuccess={() => setIsAuthenticated(true)}
        onCancel={() => onNavigate('/')}
      />
    );
  }

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image File Selection (Converts to Base64)
  const processImageFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('File yang dipilih harus berupa gambar (PNG, JPG, WebP, dll).');
      return;
    }

    // Check size (< 3.5MB recommended for local storage)
    if (file.size > 3.5 * 1024 * 1024) {
      setErrorMessage('Ukuran gambar terlalu besar (maksimal disarankan 3.5MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      setFormData((prev) => ({ ...prev, image: base64 }));
      setImageFileName(file.name);
      setImageFileSize((file.size / 1024).toFixed(1) + ' KB');
      setErrorMessage(null);
    };
    reader.onerror = () => {
      setErrorMessage('Gagal membaca file gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processImageFile(file);
  };

  // Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processImageFile(file);
  };

  const handleClearImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    setImageFileName('');
    setImageFileSize('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.title.trim()) {
      setErrorMessage('Judul portfolio (title) wajib diisi.');
      return;
    }
    if (!formData.category.trim()) {
      setErrorMessage('Kategori (category) wajib diisi.');
      return;
    }
    if (!formData.tag.trim()) {
      setErrorMessage('Tag teknologi wajib diisi.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Deskripsi proyek wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { updated, newProject } = addProject({
        title: formData.title,
        category: formData.category,
        tag: formData.tag,
        image: formData.image || IMAGE_PRESETS[0].url,
        description: formData.description,
        year: formData.year,
        client: formData.client,
        deliverables: formData.deliverables,
        heroTitle: formData.heroTitle,
        heroSubtitle: formData.heroSubtitle,
        heroDesc: formData.heroDesc
      });

      setProjects(updated);
      setSuccessMessage({
        title: newProject.title,
        id: newProject.id
      });

      // Reset form
      setFormData({
        title: '',
        category: '',
        tag: '',
        image: '',
        description: '',
        year: CURRENT_YEAR,
        client: 'Personal Project',
        deliverables: 'Architecture Design, Responsive Interface, RESTful API Integration',
        heroTitle: '',
        heroSubtitle: '',
        heroDesc: ''
      });
      setImageFileName('');
      setImageFileSize('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setErrorMessage('Gagal menyimpan portfolio ke memori web browser.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete project
  const handleDelete = (id, title) => {
    if (window.confirm(`Yakin ingin menghapus portfolio "${title}" (${id})?`)) {
      const updated = deleteProject(id);
      setProjects(updated);
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan data ke default asli? Semua portfolio baru yang Anda tambahkan akan direset.')) {
      const defaultData = resetToDefaultProjects();
      setProjects(defaultData);
      setSuccessMessage(null);
    }
  };

  // Import JSON
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = importProjectsJSON(event.target.result);
        setProjects(imported);
        alert('Berhasil mengimpor data portfolio!');
      } catch (err) {
        alert('Gagal mengimpor data: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Live Preview Computed Values
  const previewTitle = formData.title.trim() || 'JUDUL PROYEK ANDA';
  const previewCategory = formData.category.trim() || 'KATEGORI PROYEK';
  const previewTag = formData.tag.trim() || 'TEKNOLOGI / TAG';
  const previewImage = formData.image || IMAGE_PRESETS[1].url;
  const previewHeroTitle = formData.heroTitle.trim() || previewTitle.toUpperCase();
  const previewHeroSubtitle = formData.heroSubtitle.trim() || previewCategory.toUpperCase();
  const previewHeroDesc = formData.heroDesc.trim() || previewTag.toUpperCase();

  return (
    <div className="py-8 px-4 sm:px-8 max-w-[1240px] mx-auto space-y-10 animate-fade-in">
      
      {/* Top Breadcrumb & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <button
          onClick={() => onNavigate('/')}
          className="group flex items-center gap-2.5 text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brand group-hover:bg-brand/20 transition-all">
            <ArrowLeft className="w-4 h-4 text-zinc-300 group-hover:text-brand transition-colors" />
          </span>
          <span>KEMBALI KE PORTFOLIO</span>
        </button>

        {/* Status badges & Logout */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMIN: QWERTY</span>
          </div>

          <span className="text-[10px] tracking-[0.2em] font-mono px-2.5 py-1 rounded bg-brand/10 border border-brand/30 text-brand uppercase font-bold">
            ROUTE: /ADD
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-white text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
            title="Keluar dari sesi administrator"
          >
            <LogOut className="w-3 h-3" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* Page Title & Intro */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-brand uppercase">
          <FourPointStar className="w-3.5 h-3.5" />
          <span>PORTFOLIO MANAGER & CONTENT STUDIO</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
          TAMBAH PORTFOLIO BARU
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Masukkan informasi proyek Anda di bawah ini. Data akan langsung disimpan di web browser Anda 
          (<code className="text-brand font-mono text-xs">localStorage</code>), sehingga tidak akan hilang saat halaman direload atau ditutup.
        </p>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="p-5 rounded-xl bg-brand/10 border border-brand/40 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-brand uppercase">
                PORTFOLIO BERHASIL DISIMPAN!
              </p>
              <p className="text-sm text-zinc-200 font-semibold mt-0.5">
                Proyek <span className="text-white underline">"{successMessage.title}"</span> (ID: {successMessage.id}) sudah aktif di website.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('/')}
              className="bg-brand hover:bg-brand-dark text-white text-xs font-bold tracking-[0.15em] uppercase px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>LIHAT DI BERANDA</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSuccessMessage(null)}
              className="px-3 py-2 text-xs text-zinc-400 hover:text-white uppercase tracking-wider font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 flex items-center gap-3 text-xs tracking-wide">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2-Column Studio Grid: Left Form, Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 bg-surface-card border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h2 className="text-sm font-bold tracking-[0.18em] uppercase text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand" />
              <span>FORMULIR DATA PORTFOLIO</span>
            </h2>
            <span className="text-[10px] tracking-wider text-zinc-500 uppercase">
              SEMUA FIELD DENGAN * WAJIB
            </span>
          </div>

          {/* 1. Title */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.16em] uppercase text-zinc-300 mb-2">
              1. JUDUL PORTFOLIO / PROYEK <span className="text-brand">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: SMART AUTOMATED ATTENDANCE SYSTEM"
              className="w-full bg-surface-input border border-white/15 focus:border-brand rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
            />
          </div>

          {/* 2. Category with Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold tracking-[0.16em] uppercase text-zinc-300">
                2. KATEGORI <span className="text-brand">*</span>
              </label>
              <span className="text-[10px] text-zinc-500 uppercase">Pilih Preset atau Ketik Manual</span>
            </div>
            
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="Contoh: E-COMMERCE & UMKM PLATFORM"
              className="w-full bg-surface-input border border-white/15 focus:border-brand rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors mb-2.5"
            />

            {/* Quick Category Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_PRESETS.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                  className={`text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded transition-colors cursor-pointer border ${
                    formData.category === cat 
                      ? 'bg-brand border-brand text-white' 
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Tag (Tech Stack) with Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold tracking-[0.16em] uppercase text-zinc-300">
                3. TAG / TEKNOLOGI UTAMA <span className="text-brand">*</span>
              </label>
              <span className="text-[10px] text-zinc-500 uppercase">Label Stack</span>
            </div>

            <input
              type="text"
              name="tag"
              required
              value={formData.tag}
              onChange={handleChange}
              placeholder="Contoh: REACT + VITE & FLUTTER"
              className="w-full bg-surface-input border border-white/15 focus:border-brand rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors mb-2.5"
            />

            {/* Quick Tag Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {TAG_PRESETS.map((tagItem) => (
                <button
                  type="button"
                  key={tagItem}
                  onClick={() => setFormData((prev) => ({ ...prev, tag: tagItem }))}
                  className={`text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded transition-colors cursor-pointer border ${
                    formData.tag === tagItem 
                      ? 'bg-brand border-brand text-white' 
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {tagItem}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Gambar Portfolio (Upload File atau URL) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold tracking-[0.16em] uppercase text-zinc-300">
                4. GAMBAR PORTFOLIO <span className="text-brand">*</span>
              </label>

              {/* Mode Toggle: Upload vs URL */}
              <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                    imageMode === 'upload' ? 'bg-brand text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                    imageMode === 'url' ? 'bg-brand text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>URL Gambar</span>
                </button>
              </div>
            </div>

            {/* UPLOAD FILE TAB */}
            {imageMode === 'upload' ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-brand bg-brand/10' 
                    : formData.image 
                      ? 'border-brand/40 bg-white/[0.02]' 
                      : 'border-white/20 hover:border-brand/60 bg-white/[0.01]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {formData.image ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <img 
                      src={formData.image} 
                      alt="Preview upload" 
                      className="w-24 h-16 object-cover rounded-lg border border-white/20 shadow-md"
                    />
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white max-w-[200px] truncate">
                          {imageFileName || 'Gambar Terpilih'}
                        </span>
                        {imageFileSize && (
                          <span className="text-[10px] text-zinc-500 font-mono">({imageFileSize})</span>
                        )}
                      </div>
                      <p className="text-[10px] text-brand uppercase tracking-wider font-semibold">
                        ✓ Gambar Siap Digunakan
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearImage();
                        }}
                        className="text-[10px] text-red-400 hover:text-red-300 underline uppercase tracking-wider"
                      >
                        Ganti / Hapus Gambar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 py-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                      <Upload className="w-5 h-5 text-brand" />
                    </div>
                    <p className="text-xs font-semibold text-white">
                      Klik untuk memilih gambar atau seret file ke sini
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                      Mendukung PNG, JPG, WebP (Rekomendasi screenshot rasio 16:9 atau 16:10)
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* URL INPUT TAB */
              <div className="space-y-3">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-surface-input border border-white/15 focus:border-brand rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                />

                {/* Preset sample links */}
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1.5 font-semibold">
                    Atau gunakan contoh gambar cepat:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {IMAGE_PRESETS.map((preset) => (
                      <button
                        type="button"
                        key={preset.name}
                        onClick={() => setFormData((prev) => ({ ...prev, image: preset.url }))}
                        className={`text-[9px] font-semibold tracking-wider uppercase px-2 py-1 rounded transition-colors cursor-pointer border ${
                          formData.image === preset.url
                            ? 'bg-brand border-brand text-white'
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. Deskripsi Proyek */}
          <div>
            <label className="block text-[11px] font-bold tracking-[0.16em] uppercase text-zinc-300 mb-2">
              5. DESKRIPSI LENGKAP PROYEK <span className="text-brand">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Jelaskan gambaran umum proyek, tantangan yang diselesaikan, arsitektur teknis, dan hasil yang dicapai..."
              className="w-full bg-surface-input border border-white/15 focus:border-brand rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* 6. Detail Tambahan (Deliverables, Year, Client) */}
          <div className="pt-2 border-t border-white/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-zinc-400 mb-1.5">
                  TAHUN PENGERJAAN
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="2026 atau 2025 - 2026"
                  className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-zinc-400 mb-1.5">
                  KLIEN / INSTANSI
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Personal Project / Inisiatif Mandiri"
                  className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.16em] uppercase text-zinc-400 mb-1.5">
                DELIVERABLES / FITUR UTAMA (Pisahkan dengan tanda koma)
              </label>
              <input
                type="text"
                name="deliverables"
                value={formData.deliverables}
                onChange={handleChange}
                placeholder="Full-Stack Web, RESTful API, Database Architecture, Responsive Design"
                className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3.5 py-2.5 text-xs text-white outline-none"
              />
            </div>
          </div>

          {/* 7. Collapsible: Advanced Mockup Typography */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-between w-full text-[11px] font-bold tracking-[0.16em] uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer py-1"
            >
              <span>PENGATURAN TEKS BANNER MOCKUP (OPSIONAL)</span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-3.5 bg-black/40 p-4 rounded-xl border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  Secara default teks banner akan otomatis dibuat dari judul, kategori, dan tag. Anda dapat menyesuaikannya secara spesifik jika diinginkan.
                </p>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Banner Title (Mendukung Enter / Baris Baru)
                  </label>
                  <input
                    type="text"
                    name="heroTitle"
                    value={formData.heroTitle}
                    onChange={handleChange}
                    placeholder="Contoh: SMART\nSYSTEM"
                    className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Banner Subtitle
                  </label>
                  <input
                    type="text"
                    name="heroSubtitle"
                    value={formData.heroSubtitle}
                    onChange={handleChange}
                    placeholder="Contoh: AI-POWERED PLATFORM"
                    className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">
                    Banner Stack Tag
                  </label>
                  <input
                    type="text"
                    name="heroDesc"
                    value={formData.heroDesc}
                    onChange={handleChange}
                    placeholder="Contoh: FASTAPI + REACT"
                    className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 bg-brand hover:bg-brand-dark text-white font-bold text-xs tracking-[0.18em] uppercase py-3.5 rounded-xl transition-all shadow-[0_0_30px_rgba(255,94,0,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? 'MENYIMPAN...' : 'SIMPAN KE PORTFOLIO'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData({
                  title: '',
                  category: '',
                  tag: '',
                  image: '',
                  description: '',
                  year: CURRENT_YEAR,
                  client: 'Personal Project',
                  deliverables: 'Architecture Design, Responsive Interface, RESTful API Integration',
                  heroTitle: '',
                  heroSubtitle: '',
                  heroDesc: ''
                });
                handleClearImage();
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-white/15 text-zinc-400 hover:text-white hover:border-white/30 text-xs font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer"
            >
              RESET FORM
            </button>
          </div>

        </form>

        {/* RIGHT COLUMN: Live Interactive Mockup Card Preview */}
        <div className="lg:col-span-5 space-y-6 sticky top-6">
          
          <div className="bg-surface-card border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-brand" />
                <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-white">
                  LIVE CARD PREVIEW
                </h3>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded uppercase font-bold">
                REAL-TIME
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 leading-normal">
              Tampilan kartu ini persis seperti yang akan dilihat pengunjung di halaman utama portfolio.
            </p>

            {/* PREVIEW CARD CONTAINER */}
            <div className="group flex flex-col justify-between">
              
              {/* Mockup Frame */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border bg-surface-card border-white/15 text-white shadow-[0_15px_45px_rgba(0,0,0,0.8)] transition-all">
                
                {/* Top Mini Bar */}
                <div className="relative z-20 flex items-center justify-between px-4 py-2.5 text-[7px] tracking-[0.2em] uppercase font-bold text-zinc-400 bg-black/50 backdrop-blur-sm border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-zinc-300 truncate max-w-[130px]">{previewTag}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-75 text-[6.5px]">
                    <span>OVERVIEW</span>
                    <span>STACK</span>
                  </div>
                </div>

                {/* Card Background Image & Layout */}
                <div className="relative h-full w-full flex items-center px-5 pb-6">
                  <img 
                    src={previewImage} 
                    alt="Card Preview"
                    className="absolute right-0 top-0 w-3/5 h-full object-cover object-center opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e] via-[#0c0c0e]/85 to-transparent" />
                  
                  <div className="relative z-10 space-y-1.5 max-w-[62%]">
                    <p className="font-display text-lg sm:text-xl tracking-wide text-white leading-tight whitespace-pre-line uppercase">
                      {previewHeroTitle}
                    </p>
                    <p className="text-[8.5px] tracking-[0.22em] text-brand font-bold uppercase">
                      {previewHeroSubtitle}
                    </p>
                    <p className="text-[7.5px] tracking-[0.16em] text-zinc-400 pt-1 uppercase truncate">
                      {previewHeroDesc}
                    </p>
                  </div>
                </div>

                {/* View Case Study Pill */}
                <div className="absolute bottom-3 right-3 z-20 bg-brand text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded flex items-center gap-1 shadow-lg">
                  <span>VIEW CASE STUDY</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 pb-1 flex items-center justify-between border-b border-brand/50">
                <div className="flex items-baseline gap-3.5">
                  <span className="font-display text-2xl sm:text-3xl text-brand leading-none">
                    {String(projects.length + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.14em] text-white uppercase">
                      {previewTitle}
                    </h4>
                    <p className="text-[10px] tracking-[0.12em] text-zinc-400 uppercase mt-0.5">
                      {previewCategory}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">{formData.year || CURRENT_YEAR}</span>
              </div>

            </div>

            {/* Quick tips list */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-[11px] text-zinc-400">
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                <span>Gambar dapat diupload langsung dari file komputer Anda atau berupa tautan URL.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                <span>Saat disimpan, proyek akan muncul di Grid Halaman Utama dan Modal Arsip.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                <span>Gunakan fitur <b>Export JSON</b> di bawah untuk mencadangkan portfolio Anda ke file.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* LOWER SECTION: MANAGE EXISTING SAVED PROJECTS */}
      <div className="bg-surface-card border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-brand uppercase">
              <FourPointStar className="w-3 h-3" />
              <span>DAFTAR SEMUA PORTFOLIO ({projects.length})</span>
            </div>
            <h3 className="font-display text-2xl text-white uppercase mt-1">
              DATA PORTFOLIO AKTIF DI WEBSITE
            </h3>
          </div>

          {/* Backup, Import & Reset Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportProjectsJSON}
              className="bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download cadangan data portfolio dalam format JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => jsonImportRef.current?.click()}
              className="bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white px-3 py-2 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Pulihkan data portfolio dari file JSON"
            >
              <FolderDown className="w-3.5 h-3.5" />
              <span>Import JSON</span>
            </button>
            <input
              ref={jsonImportRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />

            <button
              onClick={handleResetToDefault}
              className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Hapus data kustom dan kembalikan ke default bawaan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* Project Table / List */}
        <div className="divide-y divide-white/10">
          {projects.map((proj) => (
            <div 
              key={proj.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] px-3 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-2xl sm:text-3xl text-brand w-9 shrink-0">
                  {proj.id}
                </span>

                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-14 h-10 object-cover rounded border border-white/10 shrink-0 hidden sm:block"
                />

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      {proj.title}
                    </h4>
                    {proj.isCustom ? (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-brand/20 border border-brand/50 text-brand uppercase tracking-wider">
                        Kustom
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-500 uppercase tracking-wider">
                        Bawaan
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                    {proj.category} • <span className="text-zinc-500">{proj.tag}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 ml-13 sm:ml-0">
                <span className="text-xs text-zinc-500 font-mono">{proj.year}</span>

                <button
                  onClick={() => handleDelete(proj.id, proj.title)}
                  className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Hapus portfolio ini"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
