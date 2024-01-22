import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
} from "./ui/card";
import Link from "next/link";
export function PreviewStat({
  number,
  element,
  route,
  route_text,
  card_title,
}: {
  number: number;
  element: string;
  route: string;
  route_text: string;
  card_title: string;
}) {
  return (
    <>
      {number && number <= 0 ? (
        <p className="text-lg">
          Il n&apos;y a actuellement 0 {element} enregistré(e).
        </p>
      ) : (
        <Card className="sm:w-full">
          <CardHeader>
            <CardTitle>{card_title}</CardTitle>
            <CardDescription>Animaux enregistrés</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="">
              Il y a actuellement
              <span className="text-stone-500 mx-2">{number}</span>
              {element} enregistré(e)s.
            </p>
          </CardContent>
          <CardFooter>
            <Link
              href={route}
              className="text-stone-500 hover:underline hover:underline-offset-4"
            >
              {route_text}{" "}
            </Link>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
