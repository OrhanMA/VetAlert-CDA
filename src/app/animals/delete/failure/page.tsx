import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnimalDeleteFailure() {
  return (
    <main className="px-8 pt-10 flex justify-center items-center h-screen">
      <Card className="bg-white p-4">
        <CardTitle className="text-center">Échec de la suppression!</CardTitle>
        <CardDescription className="text-center">
          Redirection suite à une suppression d&apos;un animal
        </CardDescription>
        <CardContent className="text-xl font-bold my-6">
          <p className="text-center">
            L&apos;animal n&apos;a pas été supprimé à cause d&apos;une erreur
            interne.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={"/animals"}>
            <Button variant={"link"} className="text-stone-400 text-center">
              Retourner à la page de l&apos;animal
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
