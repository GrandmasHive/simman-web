import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app has its own lockfile; pin Turbopack's root to avoid the parent
  // folder's leftover Vite lockfile being inferred as the workspace root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
