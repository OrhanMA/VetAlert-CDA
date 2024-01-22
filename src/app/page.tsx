import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <main className="flex justify-center flex-col sm:flex-row items-center  gap-12 md:gap-8 lg:gap-12 xl:gap-24 p-12 md:p-24 text-white">
      <Card>
        <CardHeader>
          <CardTitle>Bonjour {user && user.firstName}!</CardTitle>
          <CardDescription>
            Vous êtes bien connecté à votre espace VetAlert.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {" "}
          <Link href={"/dashboard"} className="text-stone-500 hover:underline">
            Rejoindre mon espace de gestion
          </Link>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      <div className="w-[200px] sm:w-2/3 lg:w-1/3 max-w-[300px] xl:w-1/4">
        <Image
          src={"/rahbar-unsplash.webp"}
          width={1920}
          height={2880}
          className="aspect-auto object-cover"
          alt="A dog sleeping under clothes. source: Sdf Rahbar sur Unsplash"
        />
        <a
          href={
            "https://unsplash.com/fr/photos/chien-brun-et-blanc-recouvert-dune-couverture-verte-et-blanche-XMla4ZtB-BU"
          }
          className="text-sm text-white"
        >
          source: Sdf Rahbar sur Unsplash
        </a>
      </div>
    </main>
  );
}
