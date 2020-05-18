import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FacebookIcon from 'src/assets/FacebookIcon.svg';
import InstagramIcon from 'src/assets/InstagramIcon.svg';
import LinkedinIcon from 'src/assets/LinkedinIcon.svg';
import stayAtHomeLottieJson from 'src/assets/lotties/stay-at-home.json';
import ShouldNotProceedCloud from 'src/assets/ShouldNotProceedCloud.svg';
import TwitterIcon from 'src/assets/TwitterIcon.svg';
import CenteredCard from 'src/components/CenteredCard/CenteredCard';
import GradientBackground from 'src/components/GradientBackground/GradientBackground';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const { Text } = Typography;

const SubtitleP = styled(Text)`
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
`;

const OrangeP = styled(Text)`
  color: ${COLORS.highlight};
`;

const Footer = styled.div`
  background-image: url(${ShouldNotProceedCloud});
  padding: 1em 1em;
  text-align: center;
  margin: 0 -24px -24px;
`;

const RememberInfoP = styled.div`
  margin-top: 0.5em;
`;

const SocialMediaIcon = styled.img`
  padding: 15px;
`;

const PersonalDataRoute: React.FC = () => {
  const { t } = useTranslation();

  return (
    <GradientBackground>
      <CenteredCard>
        <TitleWithAddon level={1}>{t('shouldNotProceed.title')}</TitleWithAddon>
        <SubtitleP>{t('shouldNotProceed.info')}</SubtitleP>
        <LoadingIndicator
          style={{ height: '50vh' }}
          lottieJson={stayAtHomeLottieJson}
        />
        <Footer>
          <OrangeP>{t('shouldNotProceed.remember')}</OrangeP>
          <RememberInfoP>
            <SocialMediaIcon src={LinkedinIcon} />
            <SocialMediaIcon src={FacebookIcon} />
            <SocialMediaIcon src={TwitterIcon} />
            <SocialMediaIcon src={InstagramIcon} />
          </RememberInfoP>
        </Footer>
      </CenteredCard>
    </GradientBackground>
  );
};

export default PersonalDataRoute;
