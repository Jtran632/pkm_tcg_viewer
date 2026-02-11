import DisplaySet from "@/app/components/displaySet";
export default async function Set({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data = await fetch(
    `https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master/cards/en/${id}.json`,
  );
  let cards = await data.json();
  return <DisplaySet cards={cards} />;
}

export const dynamic = "force-dynamic";
