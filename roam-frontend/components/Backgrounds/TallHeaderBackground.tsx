import React from 'react';

interface TallHeaderBackgroundProps {
  backgroundImage?: boolean;
  headerSize?: string;
}

const TallHeaderBackground: React.FC<TallHeaderBackgroundProps> = ({ backgroundImage, headerSize, ...props }) => (
  <div
    style={{
      position: "relative",
      width: "100%",
      height: headerSize === "tall" ? "300px" : "150px",
      overflow: "hidden",
      background: backgroundImage ? 'url("images/tall-header-background.png")' : 'none',
    }}
    {...props}
  >
    <img
      src="images/tall-header-background.png"
      alt="Header Background"
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "auto",
        minHeight: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export default TallHeaderBackground;
