/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ["mysql"] },
};

export default nextConfig;

/**
 * Ajout dans la config Next.js de serverComponentsExternalPackages pour enlever mysql des packages back-end optimisés lors du build
 * raison: la version optimisée du package empêche l'accès la base de données
 */
