
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
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

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    return expirationTime < currentTime;
  } catch (error) {
    console.error('Token süre kontrolü hatası:', error);
    return true;
  }
};

export const getUsernameFromToken = (token) => {
  if (!token) return null;

  try {
    const decoded = decodeToken(token);
    return decoded?.sub || null;
  } catch (error) {
    console.error('Token kullanıcı adı alma hatası:', error);
    return null;
  }
};

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