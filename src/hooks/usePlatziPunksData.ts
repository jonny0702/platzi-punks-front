import { useState, useEffect, useCallback } from 'react';
import { usePlatziPunks } from './usePlatziPunks';

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
    platziPunks.methods.getAccesoriesType(tokenId).call(),
    platziPunks.methods.getAccesoriesType(tokenId).call(),
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
export const usePlatziPunksData = () => {
  const [punks, setPunks] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const platziPunks = usePlatziPunks();

  const update= useCallback(async()=>{
    if(platziPunks){
      setLoading(true)

      let tokenIds;
      const totalSupply = await platziPunks.methods.totalSupply().call();
      tokenIds  = new Array(Number(totalSupply)).fill(null).map((_, index)=> index);

      const punksPromise = tokenIds.map((tokenId) => getPunkData({tokenId, platziPunks}))
      console.log(punksPromise)
      const punks = await Promise.all(punksPromise)
      setPunks(punks)
    }
  },[platziPunks])

  useEffect(()=>{
    update()
  },[update]);

  return{
    loading,
    punks,
    update
  }
};
