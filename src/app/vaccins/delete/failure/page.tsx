import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VaccinDeleteFailure() {
  return (
    <main className="px-8 pt-10 flex justify-center items-center h-screen">
      <Card className="bg-white p-4">
        <CardTitle className="text-center">Échec de la suppression!</CardTitle>
        <CardDescription className="text-center">
          Redirection suite à une suppression d&apos;une vaccination
        </CardDescription>
        <CardContent className="text-xl font-bold my-6">
          <p className="text-center">
            La vaccination n&apos;a pas été supprimée à cause d&apos;une erreur
            interne.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={"/animals"}>
            <Button variant={"link"} className="text-stone-400 text-center">
              Retourner à la page des animaux
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
