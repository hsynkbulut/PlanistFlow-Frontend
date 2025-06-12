/**
 * JWT token'dan bilgi almak için yardımcı fonksiyonlar
 */

/**
 * JWT token'ı decode eder
 * @param {string} token - JWT token
 * @returns {object|null} - Token içeriği veya null
 */
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    // JWT yapısı: header.payload.signature
    const base64Url = token.split('.')[1]; // payload kısmını al
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Base64 decode
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token decode hatası:', error);
    return null;
  }
};

/**
 * Token'ın sona erme süresini kontrol eder
 * @param {string} token - JWT token
 * @returns {boolean} - Token geçerli mi?
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    // Token süresi saniye cinsinden, şu anki zaman milisaniye
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    return expirationTime < currentTime;
  } catch (error) {
    console.error('Token süre kontrolü hatası:', error);
    return true;
  }
};

/**
 * Token'dan kullanıcı adını alır
 * @param {string} token - JWT token
 * @returns {string|null} - Kullanıcı adı veya null
 */
export const getUsernameFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = decodeToken(token);
    // Spring Security varsayılan olarak 'sub' alanında username'i saklar
    return decoded?.sub || null;
  } catch (error) {
    console.error('Token kullanıcı adı alma hatası:', error);
    return null;
  }
};

/**
 * Token'dan kalan süreyi alır (milisaniye cinsinden)
 * @param {string} token - JWT token
 * @returns {number} - Kalan süre (milisaniye) veya 0
 */
export const getRemainingTime = (token) => {
  if (!token) return 0;

  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return 0;

    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    
    return expirationTime > currentTime ? expirationTime - currentTime : 0;
  } catch (error) {
    console.error('Token kalan süre hesaplama hatası:', error);
    return 0;
  }
}; 