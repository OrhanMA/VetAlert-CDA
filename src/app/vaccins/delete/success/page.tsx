import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VaccinDeleteSuccess() {
  return (
    <main className="px-8 flex justify-center items-center h-screen">
      <Card className="bg-white p-4">
        <CardTitle className="text-center">Suppression réussie!</CardTitle>
        <CardDescription className="text-center">
          Redirection suite à la suppression d&apos;une vaccination
        </CardDescription>
        <CardContent className="text-xl font-bold my-6">
          <p className="text-center">
            La vaccination a été supprimée avec succès.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={"/vaccins"}>
            <Button variant={"link"} className="text-stone-400 text-center">
              Retourner à la page des vaccins
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
