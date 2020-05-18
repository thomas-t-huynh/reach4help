import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EmailIcon from 'src/assets/EmailIcon.svg';
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

// not sure why this isn't working
const Title = styled(TitleWithAddon)`
  padding: 20px 0;
`;

const CloudBackground = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0.1;
  width: 100%;
  z-index: 0;
  pointer-events: none;
`;

const SubtitleP = styled(Text)`
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
`;

const OrangeP = styled(Text)`
  color: ${COLORS.highlight};
`;

const Footer = styled.div`
  padding: 1em 1em;
  text-align: center;
  margin: 0 -24px -24px;
  z-index: 1;
`;

const RememberInfoP = styled.div`
  margin-top: 0.5em;
`;

const SocialMediaIcon = styled.img`
  padding: 15px;
  opacity: 0.75;
  :hover {
    opacity: 1;
  }
`;

const PersonalDataRoute: React.FC = () => {
  const { t } = useTranslation();

  return (
    <GradientBackground>
      <CenteredCard>
        <CloudBackground src={ShouldNotProceedCloud} alt="cloud" />
        <Title level={1}>{t('shouldNotProceed.title')}</Title>
        <SubtitleP>{t('shouldNotProceed.info')}</SubtitleP>
        <LoadingIndicator
          style={{ height: '50vh' }}
          lottieJson={stayAtHomeLottieJson}
        />
        <Footer>
          <OrangeP>{t('shouldNotProceed.remember')}</OrangeP>
          <RememberInfoP>
            <a
              href="https://www.linkedin.com/company/reach4help-org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialMediaIcon src={LinkedinIcon} />
            </a>
            <a
              href="https://www.facebook.com/Reach4HelpOrg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialMediaIcon src={FacebookIcon} />
            </a>
            <a
              href="https://twitter.com/reach4helporg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialMediaIcon src={TwitterIcon} />
            </a>
            <a
              href="https://www.instagram.com/reach4help/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialMediaIcon src={InstagramIcon} />
            </a>
            <a
              href="mailto:info@reach4help.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialMediaIcon src={EmailIcon} />
            </a>
          </RememberInfoP>
        </Footer>
      </CenteredCard>
    </GradientBackground>
  );
};

export default PersonalDataRoute;
