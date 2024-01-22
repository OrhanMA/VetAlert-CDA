"use client";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FieldGroup } from "@/components/FieldGroup";
import { Button } from "@/components/ui/button";
export default function CreateAnimal() {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const { userId } = useAuth();

  return (
    <main className="px-8 pt-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-white">
        Remplissez le formulaire pour enregister un animal
      </h1>
      <Formik
        initialValues={{
          name: "Caillou",
          age: 1,
          race: "Chiwawa",
          owner_name: "John Doe",
          owner_phone: "0123456789",
          owner_email: "superemail@gmail.com",
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
            const response = await fetch("/api/animals/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...values, userId }),
            });

            if (response.ok) {
              const data = await response.json();
              // console.log("Animal created successfully:", data);
              router.push("/animals/create/success");
            } else {
              console.error("Failed to create animal:", response.statusText);
              router.push("/animals/create/failure");
            }
          } catch (error) {
            console.error("Error creating animal:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-8 my-8 rounded-md bg-white text-black flex flex-col items-center md:w-2/3 gap-6">
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
