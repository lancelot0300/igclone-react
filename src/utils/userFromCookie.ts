export const getUserFromCookie = () => {
  const cookieArray = document.cookie.split('; ');

  for (const cookie of cookieArray) {
    const [key, value] = cookie.split('=');

    if (key === 'user') {
      try {
        const userData = JSON.parse(decodeURIComponent(value));

        if (!userData) {
           document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          return null;
        }

        return userData;
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        return null;
      }
    }
  }

  return null;
};
