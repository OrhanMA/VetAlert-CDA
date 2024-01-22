import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function formatDate8601(date: string) {
  return format(new Date(date), "d MMMM yyyy", {
    locale: fr,
  });
}
