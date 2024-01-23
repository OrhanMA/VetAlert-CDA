"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FieldGroup } from "@/components/FieldGroup";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { formatToDashFormat } from "@/helper-function";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fr } from "date-fns/locale/fr";

export default function VaccinCreate() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [date, setDate] = useState<any>(new Date());
  const { userId } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const animal_id: string = searchParams.get("animal_id") || "";
  if (animal_id === undefined || animal_id === null || animal_id === "") {
    return (
      <div className="px-8 pt-10 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-white">
          L&apos;enregistrement est impossible sans connaître l&apos;identifiant
          de l&apos;animal
        </h1>
        <Link
          href={"/animals"}
          className="text-sky-400 text-lg hover:underline"
        >
          Retourner sur la page animal
        </Link>
      </div>
    );
  }

  return (
    <main className="px-8 pt-10 flex flex-col items-center">
      <h1 className="text-white text-3xl font-bold">Ajouter un vaccin</h1>
      <Formik
        initialValues={{
          vaccin_name: "Rage",
          animal_id: Number(animal_id),
          user_id: userId,
          // Transforme la date en format YYYY-MM-DD pour MySQL
          vaccination_date: formatToDashFormat(date),
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.vaccin_name) {
            errors.vaccin_name = "Le nom du vaccin est requis";
          } else if (values.vaccin_name.length > 50) {
            errors.vaccin_name = "Le nom ne peut pas dépasser 50 caractères";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          values.vaccination_date = formatToDashFormat(date);
          try {
            const response = await fetch("/api/vaccins/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...values, userId }),
            });

            if (response.ok) {
              const data = await response.json();
              router.push(`/vaccins/create/success?animal_id=${animal_id}`);
            } else {
              console.error("Failed to create vaccin:", response.statusText);
              router.push(`/vaccins/create/failure?animal_id=${animal_id}`);
            }
          } catch (error) {
            console.error("Error creating vaccin:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-8 my-8 rounded-md bg-white text-black flex flex-col items-center md:w-2/3 gap-6">
            <div className="md:w-1/2">
              <FieldGroup field_name="vaccin_name" label="Nom du vaccin" />
            </div>
            <div className="flex flex-col gap-2">
              <p>Date de réalisation*:</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left border-black rounded-none font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP", { locale: fr })
                    ) : (
                      <span>Sélectionner la date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={fr}
                    required
                    toDate={new Date()}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button variant={"default"} type="submit" disabled={isSubmitting}>
              Enregistrer
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
