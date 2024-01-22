"use client";
import { useState, useEffect } from "react";
import { fetchNextApi } from "@/api";
import { Vaccination } from "@/types";
import VaccinationPreview from "@/components/VaccinationPreview";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
export default function Animals() {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNextApi(`vaccins/${userId}`, "GET");

        setVaccinations(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="p-12 md:p-24">
      <h1 className="text-3xl text-white font-bold mb-6">Vaccins</h1>
      {loading == false ? (
        <>
          {vaccinations.length > 0 ? (
            <ul className="w-full flex flex-col md:flex-row md:flex-wrap md:justify-center items-center gap-4">
              {vaccinations.map((vaccination) => (
                <VaccinationPreview
                  vaccination={vaccination}
                  key={vaccination.vaccination_id}
                />
              ))}
            </ul>
          ) : (
            <p className="text-2xl font-bold text-center w-full ">
              Pas de vaccination enregistrée pour l&apos;instant
            </p>
          )}
        </>
      ) : (
        <h2 className="text-xl my-6 font-bold text-white">
          Récupération des données... Veuillez patienter un instant...
        </h2>
      )}
    </div>
  );
}
