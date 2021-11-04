import { useState, useEffect } from "react";
import { PexelsFetchObject } from "../../services/pexels";
import { useLS } from "../../Hooks/useLS";
const base_url = `https://api.pexels.com/v1/`;
const api_key = `563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2`;
// const zhenya_key = `563492ad6f917000010000018ad09ac3acee45ebbb46a78f456e8ffa`;
const newPexelsFetchObject = new PexelsFetchObject(base_url, api_key);
// console.log(newPexelsFetchObject);

export function ImagesList({ searchValue, perPage }) {
  const [searchResults, setSearchResults] = useLS("pexelImages", []);
  const [status, setStatus] = useState("init");
  // =================
  useEffect(() => {
    if (!searchValue.trim()) return;
    setStatus("pending");
    newPexelsFetchObject.resetPage();
    newPexelsFetchObject.searchQuery = searchValue;
    newPexelsFetchObject.perPage = perPage;
    newPexelsFetchObject
      .searchPhotos()
      .then((searchResults) => {
        // console.log(searchResults);
        setStatus("success");
        setSearchResults(searchResults);
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
        // setStatus(() => (err ? 'error' : 'Opps'));
      });

    // return () => alert(`UNMOUNT`);
  }, [searchValue, perPage, setSearchResults]);
  // =================
  const handleClick = () => {
    newPexelsFetchObject.page = 1;
    newPexelsFetchObject
      .searchPhotos()
      .then((searchResults) => {
        setSearchResults((prev) => [...prev, ...searchResults]);
        // setSearchResults(searchResults);
        console.log("setSearchResults", searchResults);
        setStatus("success");
      })
      .catch((err) => {
        // console.log(err);
        setStatus("error");
      });
  };
  if (status === "init") {
    return <h1>Hello! Search something</h1>;
  }
  if (status === "pending") {
    return <h1>Wait please!</h1>;
  }
  if (status === "success") {
    console.log("success", searchResults);
    return (
      <>
        <ul style={{ display: "flex", flexFlow: "row wrap" }}>
          {searchResults.length > 0 &&
            searchResults.map((el) => (
              <li key={el.id}>
                <img src={el.src.tiny} alt={el.photographer} />
              </li>
            ))}
        </ul>
        <button type="button" onClick={handleClick}>
          load more
        </button>
      </>
    );
  }
  if (status === "error") {
    return <h1>ALARMA!!!</h1>;
  }
}
