import { Button, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

const { Title, Text } = Typography;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

const Logo = styled.img`
  height: 125px;
  width: 125px;
`;

const StyledTitle = styled(Title)`
  margin-top: 20px;
  margin-bottom: 50px !important;
`;

const Info = styled(Text)`
  text-align: center;
  padding-top: 30px;
`;

const LandingPageNoGeo: React.FC<any> = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <StyledIntro>
      <Logo src={logo} alt="logo" />
      <StyledTitle>{t('landingpage_ng.title')}</StyledTitle>
      <TitleWithAddon level={2}>{t('landingpage_ng.sub_title')}</TitleWithAddon>
      <Info>
        {t('landingpage_ng.info')
          .split('\n')
          .map((item, key) => (
            <p key={key}>{item}</p>
          ))}
      </Info>
    </StyledIntro>
  );
};

export default LandingPageNoGeo;
