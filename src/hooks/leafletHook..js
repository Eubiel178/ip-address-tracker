import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { getUserIp, getIpInfo } from "../services/index";

export const UseMapComponents = ({
  setMapState,
  setUserIp,
  setSearchResultState,
  setMarkerPosition,
}) => {
  const map = useMap();
  useEffect(() => {
    (async () => {
      if (map !== null) {
        const userIp = await getUserIp();
        const response = await getIpInfo(userIp);
        const location = response.loc.split(",");

        map.setView(location, 15);
        //salvei nos states para poder usar eles no meu App.jsx

        setMarkerPosition(location);
        setMapState(map);
        setUserIp(userIp);
        setSearchResultState(response);
      }
    })();
  }, []);
};
