"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Vaccination } from "@/types";
import { fetchNextApi } from "@/api";
import { format } from "date-fns";
import { formatDate8601 } from "@/helper-function";
import { fr } from "date-fns/locale";
import { CardItem } from "@/components/CardItem";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VaccinDetails({ params }: { params: { id: string } }) {
  const vaccination_id: string = params.id;
  const [loading, setLoading] = useState(true);
  const [vaccination, setVaccination] = useState<Vaccination | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `vaccins/details/${vaccination_id}`;
        const response = await fetchNextApi(endpoint, "GET");
        setVaccination(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [vaccination_id]);

  if (loading) {
    return (
      <h1 className="m-8 text-xl font-bold text-white">
        Récupération des données...Veuillez patienter...
      </h1>
    );
  }

  return (
    <main className="px-8 pt-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-white">
        Détail vaccin n°{vaccination_id}
      </h1>
      {vaccination && (
        <Card className="flex flex-col my-6 p-6 bg-white w-full sm:w-1/2 xl:w-1/3">
          <CardTitle>Vaccin ID n°{vaccination.vaccination_id}</CardTitle>
          <CardDescription>Résumé</CardDescription>
          <CardContent className="flex flex-col items-start my-4">
            <CardItem item_name="Nom:" value={vaccination.vaccin_name} />
            <CardItem
              item_name="Date:"
              value={formatDate8601(vaccination.vaccination_date)}
            />
            <Link className="w-full" href={`/animals/${vaccination.animal_id}`}>
              <CardItem
                item_name="Animal"
                value={"n°" + vaccination.animal_id.toString()}
              />
            </Link>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-6">
            <Link href={`/vaccins/delete/${vaccination.vaccination_id}`}>
              <Button variant={"destructive"}>
                Supprimer cette vaccination
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
