import { useState, useEffect } from "react";
import { PexelsFetchObject } from "../../services/pexels";
import { useLS } from "../../Hooks/useLS";
import { Loader } from "../../Components/Loader/Loader";
import { LoadMoreBtn } from "../../Components/Button/Button";
import s from "./ImagesList.module.css";

// == импорты для перехода на страницу карточки
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";

const newPexelsFetchObject = new PexelsFetchObject();

export function ImagesList({ searchValue, perPage }) {
  const [searchResults, setSearchResults] = useLS("pexelImages", []);
  const [searchValueLS, setSearchValueLS] = useLS("searchValue", "");
  const [searchPageLS, setSearchPageLS] = useLS("searchPage", "");
  const [status, setStatus] = useState("init");
  const location = useLocation();
  console.log("LIST location:", location);
  useEffect(() => {
    if (!searchValue.trim()) return;
    setSearchValueLS(searchValue);
    setSearchPageLS(1);
    setStatus("pending");
    newPexelsFetchObject.resetPage();
    newPexelsFetchObject.searchQuery = searchValue;
    newPexelsFetchObject.perPage = perPage;
    newPexelsFetchObject
      .searchPhotos()
      .then((searchResults) => {
        setStatus("success");
        setSearchResults(searchResults);
      })
      .catch((err) => setStatus("error"));
  }, [
    searchValue,
    perPage,
    setSearchResults,
    setSearchPageLS,
    setSearchValueLS,
  ]);

  const handleClick = () => {
    if (!searchValue && searchValueLS) {
      newPexelsFetchObject.searchQuery = searchValueLS;
      setSearchPageLS(searchPageLS + 1);
      newPexelsFetchObject.page = searchPageLS + 1;
      newPexelsFetchObject
        .searchPhotos()
        .then((searchResults) => {
          setSearchResults((prev) => [...prev, ...searchResults]);
          setStatus("success");
        })
        .catch((err) => {
          alert(err);
          setStatus("error");
        });
    } else {
      newPexelsFetchObject.page = 1;
      newPexelsFetchObject
        .searchPhotos()
        .then((searchResults) => {
          setSearchResults((prev) => [...prev, ...searchResults]);
          setStatus("success");
        })
        .catch((err) => {
          alert(err);
          setStatus("error");
        });
    }
  };

  if (status === "init" && searchResults.length === 0) {
    return (
      <>
        <h1>Hello! Search something</h1>
        <Loader />
      </>
    );
  }

  if (status === "pending") {
    return <h1>Wait please!</h1>;
  }
  if (status === "success" || (status === "init" && searchResults.length > 0)) {
    return (
      <>
        <ul className={s.imagesList}>
          {searchResults.length > 0 &&
            searchResults.map((el) => (
              <li key={el.id}>
                {/* Обернем картинку в Link для перехода на страницу карточки */}
                <Link
                  // to={`/pexels/${el.id}`}

                  to={{
                    pathname: `/pexels/${el.id}`,
                    state: {
                      from: { location, label: `back to pexels` },
                    },
                  }}
                >
                  <img src={el.src.tiny} alt={el.photographer} />
                </Link>
              </li>
            ))}
        </ul>
        <LoadMoreBtn btnType="button" handleClick={handleClick} />
      </>
    );
  }
  if (status === "error") {
    return <h1>ALARMA!!!</h1>;
  }
}
