"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DisplayCard from "./displayCard";
export default function displaySet(props: { cards: any[] }) {
  const { cards } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [curCard, setCurCard] = useState<cardI>(cards[0]);
  const [types, setTypes] = useState<string[]>([]);
  const [superType, setSuperType] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<cardI[]>(cards);
  interface cardI {
    id: string;
    name: string;
    rarity: string;
    number: string;
    images: { small: string; large: string };
    supertype: string;
  }
  useEffect(() => {
    let a: string[] = [];
    cards.forEach((card: cardI) => {
      if (!a.includes(card.supertype)) {
        a.push(card.supertype);
      }
    });
    setTypes(a);
  }, []);

  useEffect(() => {
    if (superType === "") {
      setFilteredCards(cards);
    } else {
      let a = cards.filter((card: cardI) => card.supertype === superType);
      setFilteredCards(a);
    }
  }, [superType]);

  useEffect(() => {
    if (isOpen === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full `}
    >
      {isOpen && <DisplayCard card={curCard} setIsOpen={setIsOpen} />}
      <div
        className={`absolute top-0 flex flex-col justify-center items-center w-full px-40 gap-2 ${isOpen ? "transition blur-md " : ""} ease-in-out`}
      >
        <Link
          href="/"
          className="border border-gray-800 p-1 px-4 rounded font-bold hover:border-white"
        >
          Home
        </Link>
        <div className="flex w-fit justify-center items-center gap-2">
          {types.map((t: string) => (
            <button
              onClick={() => {
                if (superType === t) {
                  setSuperType("");
                } else {
                  setSuperType(t);
                }
              }}
              key={t}
              className={`flex text-[10px] font-bold border border-gray-800 rounded-md w-full px-2 py-1 ${
                superType === t ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className={`grid grid-cols-6 grid-rows-auto-fr gap-2 capitalize`}>
          {filteredCards.map((card: cardI) => (
            <div
              key={card.id}
              className="flex flex-col text-[10px] font-bold border-t-0 border rounded-xl w-full"
              onClick={
                isOpen === false
                  ? () => {
                      setIsOpen(true);
                      setCurCard(card);
                    }
                  : () => {}
              }
            >
              <img src={card.images.large} alt={card.name} className="" />
              <div className="flex justify-between px-4 border-t-0">
                <div>
                  <div>{card.name}</div>
                </div>
                <div className="flex flex-col text-right">
                  <div>
                    {card.number}/{cards.length}
                  </div>
                  {card?.rarity && (
                    <div className="text-[8px]">
                      {card.rarity.replace(/_/g, " ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
