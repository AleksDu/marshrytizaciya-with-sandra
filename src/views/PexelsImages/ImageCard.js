import { useHistory, useLocation } from "react-router";

export default function ImageCard() {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  //   console.log("card:", history);
  const handleClick = () => {
    history.push("/pexels");
  };
  return (
    <>
      <button type="button" onClick={handleClick}>
        back
      </button>

      <h2>CARD</h2>
    </>
  );
}
