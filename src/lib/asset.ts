/*
 * Ruta a un archivo de /public respetando la base del despliegue.
 * Antes se usaba "/models/…" fijo, que se rompe si el sitio se publica
 * en una subcarpeta (FIGMA_PUBLIC_URL, GitHub Pages).
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
