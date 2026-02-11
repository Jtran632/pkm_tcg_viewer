import Link from "next/link";
import path from "path";
export default async function Home() {
  const res = await fetch(
    "https://raw.githubusercontent.com/PokemonTCG/pokemon-tcg-data/master/sets/en.json",
  );
  let data = await res.json();
  console.log(data);
  interface SetData {
    id: string;
    name: string;
    releaseDate: string;
    images: {
      logo: string;
    };
  }

  if (!data) {
    return <div>no data</div>;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-4xl font-bold bg-linear-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
          Pokemon TCG Sets
        </h1>
        <div className="grid grid-cols-6 auto-rows-fr px-40 gap-2">
          {data.reverse().map((set: SetData) => (
            <Link
              href={{
                pathname: `/set/${set.id}`,
                query: { setName: set.name },
              }}
              className="flex justify-center items-center border border-gray-800 hover:brightness-150 hover:transition duration-500 ease-in-out hover:border-white"
              key={set.id}
            >
              <div className="flex justify-between items-center px-4 gap-4 w-full capitalize text-[10px]">
                <div>
                  <div className="font-bold">{set.name}</div>
                  <div className="flex flex-col">
                    <div>{set.id}</div>
                    <div>{set.releaseDate}</div>
                  </div>
                </div>
                <img
                  src={set.images.logo}
                  alt={set.name}
                  className="h-auto w-20"
                ></img>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
