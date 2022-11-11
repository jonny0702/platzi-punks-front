import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { PlatziPunksArtifact } from "../config/artifacts/PlatziPunks";

const { address, abi } = PlatziPunksArtifact;

export const usePlatziPunks = () => {
  const { active, library, chainId } = useWeb3React();
  const platziPunks = useMemo(() => {
    if (active && chainId) return new library.eth.Contract(abi, address[5]);
  }, [active, chainId, library?.eth?.Contract]);

  return platziPunks;
};
