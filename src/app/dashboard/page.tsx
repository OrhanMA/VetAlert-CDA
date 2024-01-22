"use client";
import { PreviewStat } from "@/components/PreviewStat";
import { useEffect, useState } from "react";
import { countAnimals, countVaccinations } from "@/api";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [animalEntries, setAnimalEntries] = useState(0);
  const [vaccinationsEntries, setVaccinationsEntries] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animal_result = await countAnimals();
        const vaccins_result = await countVaccinations();
        setAnimalEntries(animal_result.data);
        setVaccinationsEntries(vaccins_result.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="px-8 pt-10 backdrop-blur-xl min-h-screen text-white">
      {loading == false ? (
        <Card className="p-6">
          <h1 className="font-bold text-2xl md:text-3xl">Dashboard</h1>

          <div className="flex flex-col items-center md:flex-row md:justify-center gap-6 my-8">
            <PreviewStat
              number={animalEntries}
              card_title={"Animaux"}
              element="animaux"
              route="/animals"
              route_text="Voir les animaux enregistrés"
            />

            <PreviewStat
              number={vaccinationsEntries}
              card_title={"Vaccinations"}
              element="vaccinations"
              route="/vaccins"
              route_text="Voir les vaccinations enregistrées"
            />
          </div>
        </Card>
      ) : (
        <>
          <h1 className="font-bold text-2xl md:text-3xl">Dashboard</h1>

          <h2>
            Récupération des données en cours... Veuillez patienter un
            instant...
          </h2>
        </>
      )}
    </main>
  );
}
