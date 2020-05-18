import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../../assets/lotties/loading.json';

interface LoadingIndicator {
  lottieJson?: object;
  style?: object;
}

const LoadingIndicator: React.FC<LoadingIndicator> = ({
  lottieJson,
  style,
}): React.ReactElement => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieJson || animationData,
  };

  return <Lottie {...style} options={defaultOptions} />;
};

export default LoadingIndicator;
