import { authMiddleware } from "@clerk/nextjs";

// Protection de toutes les routes de l'application (routes api inclues)
// https://clerk.com/docs/references/nextjs/auth-middleware pour plus d'infos sur la configuration du middleware.
export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
