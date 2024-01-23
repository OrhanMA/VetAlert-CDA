import { Vaccination } from "@/types";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { CardItem } from "./CardItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * @param vaccination: un objet de type Vaccination (voir les types dans le ficher types.ts)
 * @role Affiche une vue simplifiée des informations concernant une vaccination
 */
export default function VaccinationPreview({
  vaccination,
}: {
  vaccination: Vaccination;
}) {
  return (
    <Card className="flex flex-col my-4 p-6 md:p-4 w-full sm:w-3/4 md:w-2/5 lg:w-1/4 xl:w-1/5">
      <CardTitle>{vaccination.vaccin_name}</CardTitle>
      <CardDescription>Résumé</CardDescription>
      <CardContent className="flex flex-col items-start my-4">
        <CardItem item_name="Nom:" value={vaccination.vaccin_name} />
        <CardItem
          item_name="Date:"
          value={format(new Date(vaccination.vaccination_date), "d MMMM yyyy", {
            locale: fr,
          })}
        />
      </CardContent>
      <CardFooter className="w-full">
        <Link
          href={`/vaccins/${vaccination.vaccination_id}`}
          className="text-stone-400 hover:underline"
        >
          Voir les détails
        </Link>
      </CardFooter>
    </Card>
  );
}
