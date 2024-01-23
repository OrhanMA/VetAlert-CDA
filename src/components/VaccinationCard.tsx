import { Vaccination } from "@/types";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CardItem } from "./CardItem";
import { formatDate8601 } from "@/helper-function";

/**
 * @param vaccination: un objet de type Vaccination (voir les types dans le ficher types.ts)
 * @role Affiche le détails des informations concernant une vaccination
 */
export function VaccinationCard({ vaccination }: { vaccination: Vaccination }) {
  return (
    <div className="flex flex-col items-center">
      <Informations vaccination={vaccination} />
    </div>
  );
}

function Informations({ vaccination }: { vaccination: Vaccination }) {
  return (
    <Card className="flex flex-col my-6 p-6 bg-white w-full">
      <CardHeader>
        <CardTitle>Vaccin</CardTitle>
        <CardDescription>détails sur le vaccin</CardDescription>
      </CardHeader>
      <CardContent>
        <CardItem item_name="Nom:" value={vaccination.vaccin_name} />
        <CardItem
          item_name="Date:"
          value={formatDate8601(vaccination.vaccination_date)}
        />
      </CardContent>
      <CardFooter>
        <Link href={`/vaccins/delete/${vaccination.vaccination_id}`}>
          <Button variant={"destructive"}>Supprimer</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
