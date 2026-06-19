import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — there are other lockfiles in the
  // parent directory that Turbopack would otherwise mistake for the root.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
