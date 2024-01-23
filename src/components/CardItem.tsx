/**
 * Affiche un row d'informations pour pour les différents Card components (Animal, Vaccination...)
 * @param item_name: string: Le nom de l'élément à afficher comme label
 * @param value: string: Le valeur de l'élement à afficher
 */

export function CardItem({
  item_name,
  value,
}: {
  item_name: string;
  value: string;
}) {
  return (
    <div className="w-full flex flex-row items-center gap-2 md:gap-2 border-b py-2">
      <p>{item_name}</p>
      <p className="font-semibold text-black">{value}</p>
    </div>
  );
}
