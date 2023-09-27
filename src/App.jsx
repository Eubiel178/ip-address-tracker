import { useEffect, useState } from "react";
import { getIpInfo } from "./services";

import IconLocation from "./images/icon-location.svg";

import GlobalStyle from "./styles/globalStyle";

import patternDesktop from "./images/pattern-bg-desktop.png";
import patternMobile from "./images/pattern-bg-mobile.png";

import {
  PageContainer,
  HeaderContainer,
  Banner,
  Title,
  SearchBar,
  FormContainer,
  SearchButton,
  Map,
  InfoContainer,
  InfoBox,
  InfoBoxTitle,
  InfoBoxText,
  FirstInfoBox,
} from "./styles/app";

import { TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UseMapComponents } from "./hooks/leafletHook.";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [userIp, setUserIp] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchResultState, setSearchResultState] = useState({});
  const [map, setMap] = useState(null);

  const handleIpInfo = async (ip) => {
    const response = await getIpInfo(ip);

    map.setView([response.lat, response.lon], 14);
    setSearchResultState(response);
  };
  return (
    <>
      <GlobalStyle />

      <PageContainer>
        <HeaderContainer>
          <picture>
            <source
              media="(min-width: 375px)"
              srcset={patternDesktop}
              alt="banner"
            />

            <Banner src={patternMobile} alt="banner" />
          </picture>

          <Title>IP Address Tracker</Title>

          <FormContainer>
            <SearchBar
              type="text"
              placeholder=" Search for any IP address or domain"
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />

            <SearchButton
              type="button"
              onClick={() => handleIpInfo(inputValue)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
                <path
                  fill="none"
                  stroke="#FFF"
                  stroke-width="3"
                  d="M2 1l6 6-6 6"
                />
              </svg>
            </SearchButton>
          </FormContainer>

          <InfoContainer>
            <FirstInfoBox>
              <InfoBoxTitle>IP ADDRESS</InfoBoxTitle>
              <InfoBoxText>{searchResultState.query}</InfoBoxText>
            </FirstInfoBox>

            <InfoBox>
              <InfoBoxTitle>LOCATION</InfoBoxTitle>
              <InfoBoxText>{searchResultState.city}</InfoBoxText>
            </InfoBox>

            <InfoBox>
              <InfoBoxTitle>TIMEZONE</InfoBoxTitle>
              <InfoBoxText>{searchResultState.timezone}</InfoBoxText>
            </InfoBox>

            <InfoBox>
              <InfoBoxTitle>ISP</InfoBoxTitle>
              <InfoBoxText>{searchResultState.isp}</InfoBoxText>
            </InfoBox>
          </InfoContainer>
        </HeaderContainer>

        <Map id="map" center={[51.505, -0.09]} zoom={15} minZoom={5}>
          <UseMapComponents
            setMapState={setMap}
            setUserIp={setUserIp}
            setSearchResultState={setSearchResultState}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://mt3.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
          >
            <Marker
              position={[51.505, -0.09]}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
                  <path
                    fill-rule="evenodd"
                    d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"
                  />
                </svg>
              }
            >
              <Popup>
                Marcador em {[51.505, -0.09][0]}, {[51.505, -0.09][1]}
              </Popup>
            </Marker>
          </TileLayer>
        </Map>
      </PageContainer>
    </>
  );
};

export default App;
