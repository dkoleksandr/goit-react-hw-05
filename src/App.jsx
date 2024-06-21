import { useEffect, useState } from "react";
import "./App.css";
import { getSearchApi } from "./api/search-api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);

        const data = await getSearchApi(query, page);
        setPhotos((prev) => [...prev, ...data]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    query && fetchData();
  }, [page, query]);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (image) => {
    setSelectedPhoto(image);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      {error && <ErrorMessage/>}
      {photos.length > 0 && (
        <ImageGallery photos={photos} onClick={openModal} />
      )}
      {isLoading && <Loader />}
      {photos.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore}/>}

      <ImageModal
        isOpen={Boolean(selectedPhoto)}
        onRequestClose={closeModal}
        photoForModal={selectedPhoto}
      />
    </>
  );
};

export default App;
