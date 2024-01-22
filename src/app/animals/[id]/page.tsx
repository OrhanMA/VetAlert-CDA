"use client";
import { fetchNextApi } from "@/api";
import { AnimalCard } from "@/components/AnimalCard";
import { Animal } from "@/types";
import { useState, useEffect } from "react";
export default function AnimalShow({ params }: { params: { id: string } }) {
  const animal_id: string = params.id;
  const [loading, setLoading] = useState<Boolean>(true);
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint: string = `animals/${animal_id}`;
        const data = await fetchNextApi(endpoint, "GET");
        // J'ai quand même un array dans data donc j'y accède par l'index 0
        setAnimal(data.data[0]);
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
      <h1 className="text-3xl text-white font-bold">Détails animal</h1>
      {animal && <AnimalCard animal={animal} />}
    </main>
  );
}
