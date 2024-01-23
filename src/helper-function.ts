import { format } from "date-fns";
import { fr } from "date-fns/locale";
/**
 * function de formattage de date
 * @param date - string d'une date au format ISO 8601 (format mysql pour DATE)
 * @returns string de la date dans un format lisible en français
 */
export function formatDate8601(date: string) {
  return format(new Date(date), "d MMMM yyyy", {
    locale: fr,
  });
}

/**
 * format a date to US dash format
 * @param date
 * @returns "2020-03-21"
 */
export function formatToDashFormat(date: any) {
  return format(
    date.toLocaleDateString("en").split("/").join("-"),
    "yyyy-MM-dd"
  );
}
