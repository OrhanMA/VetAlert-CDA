import { Animal } from "@/types";
import Link from "next/link";
import { CardItem } from "@/components/CardItem";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Card className="p-6 my-4 sm:w-2/3 lg:w-1/2 xl:w-1/3">
      <CardHeader>
        <CardTitle>{animal.name}</CardTitle>
        <CardDescription>Profil de l&apos;animal</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col w-full">
        <CardItem item_name="Race:" value={animal.race} />
        <CardItem item_name="Age:" value={animal.age.toString()} />
        <CardItem item_name="Maître:" value={animal.owner_name} />
        <CardItem item_name="Email:" value={animal.owner_email} />
        <CardItem item_name="Téléphone:" value={animal.owner_phone} />
      </CardContent>
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <Link href={`/vaccins/create?animal_id=${animal?.animal_id}`}>
            <Button variant={"link"} className="text-green-500">
              Ajouter une vaccination
            </Button>
          </Link>
          <Link href={`/vaccins/animal/${animal?.animal_id}`}>
            <Button variant={"link"}>Voir les vaccinations</Button>
          </Link>
        </div>
        <div className="flex flew-wrap justify-center gap-4 mt-6">
          <Link href={`/animals/edit/${animal?.animal_id}`}>
            <Button variant={"default"}>Modifier</Button>
          </Link>
          <Link href={`/animals/delete/${animal?.animal_id}`}>
            <Button variant={"destructive"}>Supprimer</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
