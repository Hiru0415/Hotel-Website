import { siteAssets } from "../config/siteAssets";

function PageBackground({ children, overlayOpacity = 0.18 }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${siteAssets.sharedPageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(255, 255, 255, ${overlayOpacity})`,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default PageBackground;