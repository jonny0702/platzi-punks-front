import { useEffect, useCallback, useState, useMemo } from "react";
import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3/index";
//Utils
import { cutAccountRegex } from "../utils/cutAcountRegex";

export const WalletData = () => {
  const [ballance, setBallance] = useState<number | string>(0);

  const { active, activate, deactivate, account, error, library } = useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const cutAddress  = useMemo(()=>{
   return account ? cutAccountRegex(account) : account
  }, [account])   

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true")
  }, [activate]);

  const handleDisconnectWallet = () =>{
    deactivate();
    localStorage.removeItem("previousConnected")
  }
  
  const getBallance = useCallback( async ()=>{
    //with library of useWeb3React is the instance of Web3 Library
    // so we can use the methods of web3 in React
    const toSetBallance = await library.eth.getBalance(account)
    setBallance((toSetBallance / 1e18).toFixed(2))
  },[library?.eth, account])

  useEffect(()=>{
   active && getBallance()
  },[active, getBallance])

  useEffect(()=> {
    if(localStorage.getItem('previousConnected') === 'true'){
      connect()
    }
  }, [connect])

  return (
    <Flex alignItems={"center"}>
      {active ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link to="/punks">{cutAddress}</Link>
          </TagLabel>
          <Badge
            // d={{
            //   base: "none",
            //   md: "block",
            // }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
          >
            ~{ballance} Ξ
          </Badge>
          <TagCloseButton 
            onClick={handleDisconnectWallet}
          />
        </Tag>
      ) : (
        <Button
          variant={"solid"}
          colorScheme={"green"}
          size={"sm"}
          leftIcon={<AddIcon />}
          onClick={connect}
          disabled={isUnsupportedChain}
        >
         {isUnsupportedChain ? "Network no Supported" : "Connect Wallet"} 
        </Button>
      )}
    </Flex>
  );
};
