import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app has its own lockfile; pin Turbopack's root to avoid the parent
  // folder's leftover Vite lockfile being inferred as the workspace root.
  turbopack: {
    root: __dirname,
  },
  // StayVista was replaced by Cleartrip in the channel list (Oct 2026).
  async redirects() {
    return [
      {
        source: "/integrations/stayvista",
        destination: "/integrations/cleartrip",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
