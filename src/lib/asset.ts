/**
 * basePath-safe public asset URL. Mirrors next.config.mjs: assets live under
 * /aqua-safe-plumbing/ in production (GitHub Pages project site) and at root in
 * dev. NODE_ENV is statically inlined at build, so this bakes the right prefix
 * into the exported HTML.
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/aqua-safe-plumbing" : "";

export const asset = (path: string): string => `${BASE_PATH}${path}`;
