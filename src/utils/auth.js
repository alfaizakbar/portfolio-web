const AUTH_STORAGE_KEY = 'alfaiz_portfolio_auth_session_v1';

// Administrator Credentials
const ADMIN_CREDENTIALS = {
  username: 'qwerty',
  password: 'qwerty12345!@'
};

/**
 * Check if current user is logged in as administrator.
 */
export function checkAuth() {
  if (typeof window === 'undefined') return false;
  try {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!session) return false;
    const data = JSON.parse(session);
    return data && data.username === ADMIN_CREDENTIALS.username && data.authenticated === true;
  } catch (err) {
    console.error('Error verifying auth session:', err);
    return false;
  }
}

/**
 * Attempt login with username and password.
 */
export function login(username, password) {
  const cleanUsername = username?.trim();
  
  if (cleanUsername === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const sessionData = {
      username: ADMIN_CREDENTIALS.username,
      authenticated: true,
      loggedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      window.dispatchEvent(new CustomEvent('portfolio_auth_changed', { detail: { authenticated: true } }));
      return { success: true };
    } catch (err) {
      console.error('Failed to save auth session:', err);
      return { success: false, message: 'Gagal menyimpan sesi login pada peramban Anda.' };
    }
  }

  return { 
    success: false, 
    message: 'Username atau password salah! Pastikan kredensial yang Anda masukkan sesuai.' 
  };
}

/**
 * Log out and clear administrator session.
 */
export function logout() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('portfolio_auth_changed', { detail: { authenticated: false } }));
    return true;
  } catch (err) {
    console.error('Failed to clear auth session:', err);
    return false;
  }
}

/**
 * Get current session user info.
 */
export function getCurrentUser() {
  if (!checkAuth()) return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

