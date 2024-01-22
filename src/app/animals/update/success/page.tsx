import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnimalUpdateSuccess() {
  return (
    <main className="px-8 pt-10 flex justify-center items-center h-screen">
      <Card className="bg-white p-4">
        <CardTitle className="text-center">Modification réussie!</CardTitle>
        <CardDescription className="text-center">
          Redirection suite à une modification d&apos;un animal
        </CardDescription>
        <CardContent className="text-xl font-bold my-6">
          <p className="text-center">
            L&apos;animal a été mis à jour avec succès!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={"/animals"}>
            <Button variant={"link"} className="text-stone-400 text-center">
              Retourner à la page animaux
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
