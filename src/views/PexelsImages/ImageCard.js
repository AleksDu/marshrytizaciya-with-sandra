import { useHistory, useLocation, useParams } from "react-router";
import { useState, useEffect } from "react";
import { PexelsFetchObject } from "../../services/pexels";
const x = new PexelsFetchObject();

export default function ImageCard() {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const [imageInfo, setImageInfo] = useState(null);
  //   console.log('CARD params:', params);

  useEffect(() => {
    x.getImageInfo(params.imageId)
      .then(setImageInfo)
      .catch((err) => alert(err));
  }, [params.imageId]);

  const handleClick = () =>
    history.push(location?.state?.from?.location ?? "/pexels");
  console.log(imageInfo);

  const color = imageInfo ? imageInfo.avg_color : "transparent";
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        style={{
          background: `${color}`,
          padding: "10px 20px",
          display: "block",
        }}
      >
        {location?.state?.from?.label ?? "Go back"}
      </button>
      {imageInfo ? (
        <article id={imageInfo.id}>
          <h2>{imageInfo.photographer}</h2>
          <img
            src={imageInfo.src.original}
            alt="origin size"
            style={{ objectFit: "contain", width: "100%" }}
          />
        </article>
      ) : (
        <p>No match found</p>
      )}
    </>
  );
}
