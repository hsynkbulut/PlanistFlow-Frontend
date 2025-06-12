import { useState, useEffect } from 'react';

/**
 * localStorage ile çalışmak için özel hook
 * @param {string} key - localStorage'da kullanılacak anahtar
 * @param {any} initialValue - Başlangıç değeri
 */
export const useLocalStorage = (key, initialValue) => {
  // State'i başlat
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // localStorage'dan değeri al
      const item = window.localStorage.getItem(key);
      // localStorage'da değer varsa parse et, yoksa başlangıç değerini kullan
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`localStorage '${key}' değeri okunurken hata:`, error);
      return initialValue;
    }
  });

  // localStorage'a değer kaydet
  const setValue = (value) => {
    try {
      // Fonksiyon veya değer olabilir
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // State'i güncelle
      setStoredValue(valueToStore);
      
      // localStorage'a kaydet
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`localStorage '${key}' değeri kaydedilirken hata:`, error);
    }
  };

  // localStorage'dan değeri sil
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.error(`localStorage '${key}' değeri silinirken hata:`, error);
    }
  };

  // Başka tarayıcı pencerelerinden localStorage değişikliklerini dinle
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          console.error(`localStorage değişikliği algılanırken hata:`, error);
        }
      }
    };

    // storage event listener ekle
    window.addEventListener('storage', handleStorageChange);
    
    // Temizlik
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage; 