import { SetStateAction } from "react";
import { Dispatch } from "react";
export default function displayCard(props: {
  card: any;

  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  let { card, setIsOpen } = props;
  //   console.log(card);
  return (
    <img
      src={card.images.large}
      alt="Card Image"
      onClick={() => setIsOpen(false)}
      className="fixed top-0 z-10 w-150 mt-8"
    />
  );
}
