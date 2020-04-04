import React, { ReactElement } from 'react';

import CenteredCard from '../../../components/CenteredCard/CenteredCard';
import GradientBackground from '../../../components/GradientBackground/GradientBackground';
import LandingPageContainer from '../../../containers/LandingPageContainer/LandingPageContainer';

const LoginRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <LandingPageContainer />
    </CenteredCard>
  </GradientBackground>
);
export default LoginRoute;
