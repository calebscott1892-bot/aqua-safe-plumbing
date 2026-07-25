/** @type {import('next').NextConfig} */
/*
  Dual-target build.

  • Vercel (production host) — a full Next app served at the ROOT domain
    (aquasafeplumbing.com.au). No basePath, no static export, so the /api
    routes (the enquiry form → Resend) run as serverless functions.
  • GitHub Pages (legacy) — a static export served under /aqua-safe-plumbing/.
    Retained only so a manual export still resolves its asset paths; the
    Pages auto-deploy workflow is retired now that Vercel is the host. NOTE:
    once an /api route exists the export build can't include it, so Pages is
    frozen at its last deploy — that's intended during the migration.

  Vercel sets process.env.VERCEL at build time; that's how the targets are told
  apart. asset() reads NEXT_PUBLIC_BASE_PATH (set below) so client-rendered
  <img> URLs match whichever target built them.
*/
const repo = "aqua-safe-plumbing";
const isProd = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

// Only the GitHub Pages project build needs the sub-path prefix.
const isGitHubPages = isProd && !isVercel;
const basePath = isGitHubPages ? `/${repo}` : "";

const nextConfig = {
  reactStrictMode: true,
  // Static export only for the GitHub Pages build. On Vercel we need the server
  // runtime so the enquiry API route works.
  ...(isGitHubPages ? { output: "export" } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // Inlined into the client bundle so asset() builds correct URLs on both targets.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
