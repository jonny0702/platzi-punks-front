import { Grid } from "@chakra-ui/react";

import { useWeb3React } from "@web3-react/core";
import { PunkCard } from "../../Components/PunkCard";
import { Loading } from "../../Components/Loading";
import { RequestAccess } from "../../Components/RequestAccess";
import { usePlatziPunksData } from "../../hooks/usePlatziPunksData";

export const Punks = () => {
  const { active } = useWeb3React();
  const { punks, loading } = usePlatziPunksData();

  console.log(punks)

  if (!active) return <RequestAccess />;

  return loading ? (
    <Loading />
  ) : (
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1f))" gap={6}>
      {/* {
        punks.map(({name, image, tokenId}))
      } */}
      hola
    </Grid>
  );
};
