function SectionCard({
  image,
  title,
  buttonText = "View",
  light = false,
  reverse = false,
  smallText = false,
  onButtonClick,
}) {
  return (
    <section className={`section-card ${light ? "light" : "dark"} ${reverse ? "reverse" : ""}`}>
      <div className="section-image-wrapper">
        <img src={image} alt={title} className="section-image" />
        {!light && <div className="section-overlay" />}
      </div>

      <div className={`section-content ${smallText ? "small-text" : ""}`}>
        <h2>{title}</h2>
        <button type="button" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default SectionCard;