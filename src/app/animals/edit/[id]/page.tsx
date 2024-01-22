"use client";
import { fetchNextApi } from "@/api";
import { Formik, Form } from "formik";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/FieldGroup";
import { Animal } from "@/types";
import { useState, useEffect } from "react";

export default function EditAnimal({ params }: { params: { id: string } }) {
  const animal_id: string = params.id;
  const [loading, setLoading] = useState(true);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `animals/${animal_id}`;
        const data = await fetchNextApi(endpoint, "GET");
        setAnimal(data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [animal_id]);

  if (loading) {
    return (
      <h1 className="m-8 text-xl font-bold text-white">
        Récupération des données...Veuillez patienter...
      </h1>
    );
  }
  return (
    <main className="px-8 pt-10 flex flex-col sm:items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Modifier les informations de l&apos;animal
      </h1>
      <Formik
        initialValues={{
          name: animal?.name ?? "",
          age: animal?.age ?? 0,
          race: animal?.race ?? "",
          owner_name: animal?.owner_name ?? "",
          owner_phone: animal?.owner_phone ?? "",
          owner_email: animal?.owner_email ?? "",
          user_id: userId,
        }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "Le nom de l'animal est requis";
          } else if (values.name.length > 50) {
            errors.name = "Le nom ne peut pas dépasser 50 caractères";
          }
          if (!values.age) {
            errors.age = "L'âge de l'animal est requis";
          } else if (values.age > 30) {
            errors.age = "L'âge de l'animal ne peut pas dépasser 3O ans";
          }
          if (!values.race) {
            errors.race = "La race de l'animal est requise";
          } else if (values.race.length > 50) {
            errors.race = "La race ne peut pas dépasser 50 caractères";
          }
          if (!values.owner_phone) {
            errors.owner_phone =
              "Le numéro de téléphone du propriétaire est requis";
          } else if (values.owner_phone.length > 15) {
            errors.owner_phone =
              "Le numéro de téléphone ne peut pas dépasser 15 caractères";
          }
          if (!values.owner_name) {
            errors.owner_name = "Le nom du propriétaire est requis";
          } else if (values.owner_name.length > 50) {
            errors.owner_name =
              "Le nom du maître ne peut pas dépasser 50 caractères";
          }
          if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.owner_email)
          ) {
            errors.owner_email = "Invalid email address";
          } else if (values.owner_email.length > 50) {
            errors.owner_email = "L'email ne peut pas dépasser 50 caractères";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch("/api/animals/update", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...values, userId, animal_id: animal_id }),
            });

            if (response.ok) {
              const data = await response.json();
              // console.log("Animal updated successfully:", data);
              router.push("/animals/update/success");
            } else {
              console.error("Failed to update animal:", response.statusText);
              router.push(`/animals/update/failure?animal_id=${animal_id}`);
            }
          } catch (error) {
            console.error("Error updating animal:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-8 my-8 rounded-md bg-white text-black flex flex-col items-center sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 gap-6">
            <FieldGroup field_name="name" label="Nom" />
            <FieldGroup field_name="age" label="Age" />
            <FieldGroup field_name="race" label="Race" />
            <FieldGroup field_name="owner_name" label="Nom du maître" />
            <FieldGroup field_name="owner_email" label="Email" />
            <FieldGroup field_name="owner_phone" label="Téléphone" />
            <Button variant={"default"} type="submit" disabled={isSubmitting}>
              Enregistrer
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
