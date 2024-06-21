import css from "./ImageCard.module.css";

const ImageCard = ({ photo, urls, alt_description, onClick }) => {
  return (
    <div>
      <img
        className={css.image}
        src={urls.small}
        alt={alt_description}
        onClick={() => {
          onClick(photo);
        }}
      />
    </div>
  );
};

export default ImageCard;
