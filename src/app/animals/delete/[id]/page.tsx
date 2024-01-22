"use client";
import { Button } from "@/components/ui/button";
import { fetchNextApi } from "@/api";
import { AnimalCard } from "@/components/AnimalCard";
import { Animal } from "@/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CardItem } from "@/components/CardItem";
import { MouseEventHandler } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnimalDelete({ params }: { params: { id: string } }) {
  const animal_id: string = params.id;
  const [loading, setLoading] = useState(true);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `animals/${animal_id}`;
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

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/animals/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: animal?.user_id, animal_id: animal_id }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Animal deleted successfully:", data);
        router.push("/animals/delete/success");
      } else {
        console.error("Failed to delete animal:", response.statusText);
        router.push(`/animals/delete/failure?animal_id=${animal_id}`);
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
      router.push("/animals/delete/failure");
    }
  };

  if (loading) {
    return (
      <h1 className="m-8 text-xl font-bold text-white">
        Récupération des données...Veuillez patienter...
      </h1>
    );
  }
  return (
    <main className="px-8 pt-10 flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold">Supprimer l&apos;animal</h1>
      <Card
        className="
      p-6 m-8 flex flex-col gap-6 items-center"
      >
        <CardTitle className="text-center">
          Êtes-vous sûr de vouloir supprimer l&apos;animal?
        </CardTitle>
        <CardDescription className="text-center text-red-500">
          Cette action est irreversible. Les données ne sont pas récupérables.
        </CardDescription>
        <CardFooter>
          <Button variant={"destructive"} onClick={handleDelete}>
            Oui, supprimer l&apos;animal
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
