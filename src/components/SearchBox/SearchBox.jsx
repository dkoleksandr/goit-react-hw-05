const SearchBox = ({ searchValue, handleChange }) => {
  return (
    <>
      <span>Find contacts by name</span>
      <br />
      <input value={searchValue} onChange={handleChange}></input>
    </>
  );
};

export default SearchBox;
