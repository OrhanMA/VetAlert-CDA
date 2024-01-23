"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { UserButton } from "@clerk/nextjs";


/**
 * Barre de navigation pour l'entièreté du site
 * Utilise le UserButton de Clerk pour le gestion de profil de l'utilisateur et le lien de logout.
 */
export function Header() {
  return (
    <div className="w-full bg-white flex items-center justify-between p-2 sticky top-0 z-10">
      <NavBar />
      <div className="p-2">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-stone-600">
            Catégories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-full grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3 hover:bg-neutral-200 rounded-md">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-stone-500">
                      Vet&apos;Alert
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Espace de gestion de vaccinations pour vétérinaires
                      désorganisés
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dashboard" title="Tableau de bord">
                Accéder à l&apos;espace de gestion
              </ListItem>
              <ListItem href="/animals" title="Animaux">
                Voir tous les animaux enregistrés
              </ListItem>
              <ListItem href="/vaccins" title="Vaccinations">
                Voir toutes les vaccinations effectuées
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-200  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-stone-500">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
