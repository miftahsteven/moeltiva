export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  // Strip /api from the end of the base URL to get the server root for static files
  const serverRoot = API_URL.replace(/\/api$/, "");
  
  if (path.startsWith('/uploads')) {
    return `${serverRoot}${path}`;
  }
  
  // Default for images in public folder
  return path;
};
