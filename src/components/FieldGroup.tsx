import { Field, ErrorMessage } from "formik";

/**
 * Composant Regroupant les éléments d'un champ pour les formulaires Formik dans les pages create et update
 * @param field_name: string: le nom du champ
 * @param label: string: le label du champ
 */
export function FieldGroup({
  field_name,
  label,
}: {
  field_name: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm text-stone-500" htmlFor={field_name}>
        {label}*:
      </label>
      <Field
        required
        type={field_name}
        name={field_name}
        className="border text-sm focus:outline-stone-400 border-stone-400 rounded-md p-2  duration-150"
      />
      <ErrorMessage
        name={field_name}
        component="div"
        className="text-red-500"
      />
    </div>
  );
}
