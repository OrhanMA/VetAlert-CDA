"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function AnimalShow({ params }: { params: { id: string } }) {
  const vaccination_id: string = params.id;
  const router = useRouter();
  const { userId } = useAuth();
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/vaccins/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          vaccination_id: vaccination_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push("/vaccins/delete/success");
      } else {
        console.error("Failed to delete animal:", response.statusText);
        router.push(`/vaccins/delete/failure?vaccination_id=${vaccination_id}`);
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
      router.push("/vaccins/delete/failure");
    }
  };

  return (
    <main className="px-8 pt-10 flex flex-col items-center gap-6">
      <h1 className="text-3xl text-white font-bold">
        Supprimer la vaccination
      </h1>
      <div className="bg-white mt-10 rounded-md p-6 flex flex-col gap-6 text-center">
        <h2 className=" text-2xl font-bold">
          Êtes-vous sûr de vouloir supprimer cette vaccination?
        </h2>
        <p className="text-red-500">
          Cette action est irreversible. Les données ne sont pas récupérables.
        </p>
      </div>
      <div className="w-full flex items-center justify-center gap-6">
        <Button variant={"destructive"} onClick={handleDelete}>
          Oui, supprimer la vaccination
        </Button>
      </div>
    </main>
  );
}
