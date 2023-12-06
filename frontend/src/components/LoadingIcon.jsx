import React from "react";
import Lottie from "lottie-react";
import controllerLoadingAnimation from "../assets/controllerLoadingAnimation.json";

const LoadingIcon = () => {
  return (
    <div className="loadingIcon">
      <Lottie animationData={controllerLoadingAnimation} />
    </div>
  );
};

export default LoadingIcon;
