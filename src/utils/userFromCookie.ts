export const getUserFromCookie = () => {
    const cookieArray = document.cookie.split('; ');
  
    for (const cookie of cookieArray) {
      const [key, value] = cookie.split('=');
  
      if (key === 'user') {

        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (error) {
          console.error('Error parsing user cookie:', error);
          return null;
        }
      }
    }
    return null;
};
