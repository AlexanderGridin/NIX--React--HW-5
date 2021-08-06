import styles from "./ResponsiveImage.module.css";

const ResponsiveImage = ({ src, alt, width, height }) => {
  const responsiveImageStyle = {
    backgroundImage: `url(${src})`,
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div className={styles.ResponsiveImageWrapper}>
      <div
        className={styles.ResponsiveImage}
        style={responsiveImageStyle}
      ></div>
      <img className={styles.AtuallyImage} src={src} alt={alt} />
    </div>
  );
};

export default ResponsiveImage;
