import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { UseMapComponents } from "./hooks/leafletHook.";

import GlobalStyle from "./styles/globalStyle";
import { getIpInfo } from "./services";

import IconLocation from "./images/icon-location.svg";
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
  LastInfoBox,
} from "./styles/app";

const App = () => {
  const [userIp, setUserIp] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchResultState, setSearchResultState] = useState({});
  const [markerPosition, setMarkerPosition] = useState([-12.23358, -38.75105]);
  const [map, setMap] = useState(null);

  const customIcon = L.icon({
    iconUrl: IconLocation,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const handleIpInfo = async (ip) => {
    if (ip) {
      try {
        const response = await getIpInfo(ip);

        map.setView([response.loc.split(",")], 14);
        setSearchResultState(response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please enter an IP or domain!!",
      });
    }
  };

  useEffect(() => {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "When searching for an IP, use dots (example: 192.168.0.1)",
    });
  }, []);
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
              aria-label="search: ip or domain"
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

          {searchResultState.ip !== undefined && (
            <InfoContainer>
              <FirstInfoBox>
                <InfoBoxTitle>IP ADDRESS</InfoBoxTitle>
                <InfoBoxText>{searchResultState.ip}</InfoBoxText>
              </FirstInfoBox>

              <InfoBox>
                <InfoBoxTitle>LOCATION</InfoBoxTitle>
                <InfoBoxText>{searchResultState.city}</InfoBoxText>
              </InfoBox>

              <InfoBox>
                <InfoBoxTitle>TIMEZONE</InfoBoxTitle>
                <InfoBoxText>{searchResultState.timezone}</InfoBoxText>
              </InfoBox>

              <LastInfoBox>
                <InfoBoxTitle>ISP</InfoBoxTitle>
                <InfoBoxText>{searchResultState.org}</InfoBoxText>
              </LastInfoBox>
            </InfoContainer>
          )}
        </HeaderContainer>

        <Map id="map" center={markerPosition} zoom={15} minZoom={5}>
          <UseMapComponents
            setMapState={setMap}
            setUserIp={setUserIp}
            setSearchResultState={setSearchResultState}
            setMarkerPosition={setMarkerPosition}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://mt3.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
          />
          <Marker position={markerPosition} icon={customIcon}></Marker>
        </Map>
      </PageContainer>
    </>
  );
};

export default App;
