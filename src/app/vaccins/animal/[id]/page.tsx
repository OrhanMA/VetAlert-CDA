"use client";
import Link from "next/link";
import { fetchNextApi } from "@/api";
import { VaccinationCard } from "@/components/VaccinationCard";
import { Vaccination } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
export default function AnimalVaccins({ params }: { params: { id: string } }) {
  const animal_id: string = params.id;
  const [loading, setLoading] = useState(true);
  const [animalVaccinations, setAnimalVaccinations] = useState<
    Vaccination[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `vaccins/animal/${animal_id}`;
        const data = await fetchNextApi(endpoint, "GET");
        // J'ai quand même un array dans data donc j'y accède par l'index 0
        setAnimalVaccinations(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [animal_id]);

  if (loading) {
    return (
      <h1 className="m-8 text-xl font-bold text-white">
        Récupération des données...Veuillez patienter...
      </h1>
    );
  }

  return (
    <main className="px-8 pt-10 flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold">
        Vaccination pour l&apos;animal
      </h1>
      {animalVaccinations && (
        <>
          {animalVaccinations.length <= 0 ? (
            <div className="flex flex-col gap-4 my-8">
              <h1 className="text-xl font-bold text-white">
                Aucune vaccination enregistrée pour l&apos;animal
              </h1>
              <div>
                <Link
                  href={`/animals/${animal_id}`}
                  className="text-sky-400 hover:underline"
                >
                  <Button variant={"link"} className="text-white">
                    Retourner sur la page de l&apos;animal
                  </Button>
                </Link>
                <Link
                  href={`/vaccins/create?animal_id=${animal_id}`}
                  className="text-sky-400 hover:underline"
                >
                  <Button variant={"link"} className="text-white">
                    Ajouter une vaccination pour l&apos;animal
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div>
                <Link
                  href={`/animals/${animal_id}`}
                  className="text-sky-400 hover:underline"
                >
                  <Button variant={"link"} className="text-white">
                    Retourner sur la page de l&apos;animal
                  </Button>
                </Link>
                <Link
                  href={`/vaccins/create?animal_id=${animal_id}`}
                  className="text-sky-400 hover:underline"
                >
                  <Button variant={"link"} className="text-white">
                    Ajouter une vaccination pour l&apos;animal
                  </Button>
                </Link>
              </div>
              <ul>
                {animalVaccinations.map((vaccination) => {
                  return (
                    <VaccinationCard
                      key={vaccination.vaccination_id}
                      vaccination={vaccination}
                    />
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}
    </main>
  );
}
