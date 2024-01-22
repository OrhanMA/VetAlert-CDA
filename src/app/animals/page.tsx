"use client";
import { useState, useEffect } from "react";
import { fetchNextApi } from "@/api";
import { Animal } from "@/types";
import AnimalPreview from "@/components/AnimalPreview";
import Link from "next/link";

export default function Animals() {
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNextApi("animals", "GET");
        setAnimals(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-12">
      <h1 className="text-3xl text-white font-bold mb-6">Animaux</h1>
      <Link
        className="text-stone-500 bg-white px-4 py-2 rounded-md hover:bg-stone-700 hover:text-white duration-150"
        href={"/animals/create"}
      >
        Enregister un animal
      </Link>
      {loading == false ? (
        <div className="mt-10">
          {animals.length > 0 ? (
            <ul className="w-full flex flex-col md:flex-row md:flex-wrap md:justify-center items-center gap-4">
              {animals.map((animal) => (
                <AnimalPreview animal={animal} key={animal.animal_id} />
              ))}
            </ul>
          ) : (
            <p className="text-2xl text-white font-bold text-center w-full ">
              Pas d&apos;animal enregistré pour l&apos;instant
            </p>
          )}
        </div>
      ) : (
        <h2 className="text-xl my-6 font-bold text-white">
          Récupération des données... Veuillez patienter un instant...
        </h2>
      )}
    </div>
  );
}
