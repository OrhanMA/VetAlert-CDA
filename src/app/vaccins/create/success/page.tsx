"use client";
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
import { useSearchParams } from "next/navigation";
export default function VaccinCreateSuccess() {
  const searchParams = useSearchParams();
  const animal_id = searchParams.get("animal_id");
  return (
    <main className="px-8 pt-10 flex justify-center items-center h-screen">
      <Card className="bg-white p-4">
        <CardTitle className="text-center">Enregistrement réussi!</CardTitle>
        <CardDescription className="text-center">
          Redirection suite à une l&apos;enregistrement d&apos;une vaccination
        </CardDescription>
        <CardContent className="text-xl font-bold my-6">
          <p className="text-center">
            La vaccination a été enregistrée avec succès!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={`/animals/${animal_id}`}>
            <Button variant={"link"} className="text-stone-400 text-center">
              Retourner à la page de l&apos;animal
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
