import { Button, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import geoarrow from '../../assets/geoarrow.svg';
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

// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
interface Coords {
  lat: number;
  lng: number;
}

interface LandingPageProps {
  coordsExist: boolean;
  onGetCoords: Function;
}

const LandingPage: React.FC<LandingPageProps> = ({
  coordsExist,
  onGetCoords,
}): React.ReactElement => {
  const { t } = useTranslation();
  const coords = useSelector((state: AppState) => state.user.coords);

  return (
    <StyledIntro>
      <Logo src={logo} alt="logo" />
      <StyledTitle>{t('landingpage.title')}</StyledTitle>
      <TitleWithAddon level={2}>{t('landingpage.sub_title')}</TitleWithAddon>
      {!coordsExist && (
        <>
          <Info>
            {t('landingpage.info')
              .split('\n')
              .map((item, key) => (
                <p key={key}>{item}</p>
              ))}
          </Info>

          <Button
            type="primary"
            onClick={() => onGetCoords()}
            icon={
              <img
                src={geoarrow}
                style={{ height: 16, width: 16, marginRight: 10 }}
                alt="geolocation arrow"
              />
            }
          >
            {t('landingpage.buttonDetectGeo')}
          </Button>
        </>
      )}
      {coordsExist && coords !== undefined && <p>{coords.lat}</p>}
    </StyledIntro>
  );
};

export default LandingPage;
