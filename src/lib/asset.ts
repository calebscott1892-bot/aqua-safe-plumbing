/**
 * basePath-safe public asset URL.
 *
 * next.config.mjs computes the active basePath per build target and exposes it
 * as NEXT_PUBLIC_BASE_PATH (inlined into the client bundle). On Vercel / the
 * real domain it's "" (assets at root); on the legacy GitHub Pages build it's
 * "/aqua-safe-plumbing". Reading the same value keeps <img> URLs correct on
 * whichever target rendered them.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string): string => `${BASE_PATH}${path}`;
