import { useHistory, useLocation } from "react-router-dom";

export default function ImageCard() {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    history.push(location?.state?.from?.location ?? "/pexels");
  };
  return (
    <>
      <button type="button" onClick={handleClick}>
        Back
      </button>

      <h2>CARD</h2>
    </>
  );
}
