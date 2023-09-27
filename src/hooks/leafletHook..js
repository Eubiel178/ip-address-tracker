import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { getUserIp, getIpInfo } from "../services/index";

export const UseMapComponents = ({
  setMapState,
  setUserIp,
  setSearchResultState,
}) => {
  const map = useMap();
  useEffect(() => {
    (async () => {
      if (map !== null) {
        const userIp = await getUserIp();
        const response = await getIpInfo(userIp);

        map.setView([response.lat, response.lon], 15);

        //salvei nos states para poder usar eles no meu App.jsx
        setMapState(map);
        setUserIp(userIp);
        setSearchResultState(response);
      }
    })();
  }, []);
};
