/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable Turbopack temporarily to isolate the issue
  turbopack: {
    resolveAlias: {
      // Add any aliases if needed
    }
  }
}

export default nextConfig