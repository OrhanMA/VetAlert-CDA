"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function VaccinCreateFailure() {
  const searchParams = useSearchParams();
  const animal_id = searchParams.get("animal_id");
  return (
    <main className="px-8 pt-10 flex justify-center items-center h-screen">
      <Card className="bg-white p-4">
        <CardTitle className="text-center">
          Échec de l&apos;enregistrement!
        </CardTitle>
        <CardDescription className="text-center">
          Redirection suite à l&apos;enregistrement d&apos;une vaccination
        </CardDescription>
        <CardContent className="text-xl font-bold my-6">
          <p className="text-center">
            La vaccination n&apos;a pas été enregistrée à cause d&apos;une
            erreur interne.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={`/animal/${animal_id}`}>
            <Button variant={"link"} className="text-stone-400 text-center">
              Retourner à la page de l&apos;animal
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
