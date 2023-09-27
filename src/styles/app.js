import { MapContainer } from "react-leaflet";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  #mapid {
    height: 1000px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 260px;
`;

export const Banner = styled.img`
  position: absolute;
  z-index: -1;
  inset: 0;

  width: -webkit-fill-available;
  height: -webkit-fill-available;
`;

export const Title = styled.h1`
  color: #fff;
  padding: 25px;
`;

export const FormContainer = styled.form`
  display: flex;
  max-width: 550px;
  width: 100%;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 20px 17px;
  border-radius: 15px 0 0 15px;
`;

export const SearchButton = styled.button`
  padding: 20px 17px;
  //- Very Dark Gray: hsl(0, 0%, 17%)
  //- Dark Gray: hsl(0, 0%, 59%)
  border-radius: 0 15px 15px 0;
  background-color: #000000;
  transition-duration: 0.5s;

  &:hover {
    background-color: hsl(0, 0%, 17%);
  }
`;

export const InfoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, 40%);
  display: flex;
  align-items: center;
  max-width: 1150px;
  width: 90%;
  background: #fff;
  padding: 40px 0;
  border-radius: 15px;
  box-shadow: 0px 5px 10px 2px rgb(0 0 0 / 12%);

  &:first-child {
    border: none;
  }
`;

export const FirstInfoBox = styled.div`
  font-size: 16px;
  flex-grow: 1;
  height: 63px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 30px;
`;

export const InfoBox = styled(FirstInfoBox)`
  border-left: solid 1px hsl(0deg 8.66% 80.16% / 71%);
`;

export const InfoBoxTitle = styled.h2`
  font-size: 0.7em;
  letter-spacing: 3px;
  color: hsl(0, 0%, 59%);
`;

export const InfoBoxText = styled.p`
  font-size: 1.2em;
  font-weight: 500;
`;

export const Map = styled(MapContainer)`
  z-index: 1; //para ficar abaixo do infocontainer
  flex-grow: 1;
  width: -webkit-fill-available;
`;
