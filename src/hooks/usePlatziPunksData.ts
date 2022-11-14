import { useWeb3React } from "@web3-react/core";
import { useState, useEffect, useCallback } from "react";
import { usePlatziPunks } from "./usePlatziPunks";

/**
 *
 * @param {platziPunks, tokenId}
 * @returns {tokenURIm DNA, owner}
 */
const getPunkData = async ({ platziPunks, tokenId }: any) => {
  const [
    tokenURI,
    DNA,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    platziPunks.methods.tokenURI(tokenId).call(),
    platziPunks.methods.tokenDNA(tokenId).call(),
    platziPunks.methods.ownerOf(tokenId).call(),
    platziPunks.methods.getAccessoriesType(tokenId).call(),
    platziPunks.methods.getAccessoriesType(tokenId).call(),
    platziPunks.methods.getClotheColor(tokenId).call(),
    platziPunks.methods.getClotheType(tokenId).call(),
    platziPunks.methods.getEyeType(tokenId).call(),
    platziPunks.methods.getEyeBrowType(tokenId).call(),
    platziPunks.methods.getFacialHairColor(tokenId).call(),
    platziPunks.methods.getFacialHairType(tokenId).call(),
    platziPunks.methods.getHairColor(tokenId).call(),
    platziPunks.methods.getHatColor(tokenId).call(),
    platziPunks.methods.getGraphicType(tokenId).call(),
    platziPunks.methods.getMouthType(tokenId).call(),
    platziPunks.methods.getSkinColor(tokenId).call(),
    platziPunks.methods.getTopType(tokenId).call(),
  ]);
  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    DNA,
    owner,
    ...metadata,
  };
};

// Plural get All punks created
export const usePlatziPunksData = ({ owner = null } = {}) => {
  const [punks, setPunks] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { library } = useWeb3React();

  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks) {
      setLoading(true);

      let tokenIds: number[];

      if(!library.utils.isAddress(owner)){
        const totalSupply = await platziPunks.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply))
          .fill(null)
          .map((_, index) => index);
      }else{
        const balanceOf = await platziPunks.methods.balanceOf(owner).call();

        const tokenIdOfOwner  = new Array(balanceOf).fill(null).map((_, index) =>(
          platziPunks.methods.tokenOfOwnerByIndex(owner, index).call()
        ))
        tokenIds = await Promise.all(tokenIdOfOwner)
      }

      const punksPromise = tokenIds.map((tokenId: number) =>
        getPunkData({ tokenId, platziPunks })
      );

      const punks = await Promise.all(punksPromise);
      setPunks(punks);
      setLoading(false);
    }
  }, [platziPunks, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};

// get a specific Platzi Punk
type tokenID = string | null;

export const usePlatziPunkData = (tokenId: tokenID = null) => {
  const [punk, setPunk] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks && tokenId != null) {
      setLoading(true);

      const toSetPunk = await getPunkData({ tokenId, platziPunks });
      setPunk(toSetPunk);

      setLoading(false);
    }
  }, [platziPunks, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punk,
    update,
  };
};
