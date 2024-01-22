import { Animal } from "@/types";
import Link from "next/link";
import { CardItem } from "./CardItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnimalPreview({ animal }: { animal: Animal }) {
  return (
    <Card className="flex flex-col my-4 p-6 md:p-4 w-full sm:w-3/4 md:w-2/5 lg:w-1/4 xl:w-1/5">
      <CardHeader>
        <CardTitle>{animal.name}</CardTitle>
        <CardDescription>Résumé</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start my-4">
        <CardItem item_name="Race:" value={animal.race} />
        <CardItem item_name="Age:" value={animal.age.toString()} />
      </CardContent>
      <CardFooter className="w-full">
        <Link
          href={`/animals/${animal.animal_id}`}
          className="text-stone-400 hover:underline"
        >
          Voir les détails
        </Link>
      </CardFooter>
    </Card>
  );
}
