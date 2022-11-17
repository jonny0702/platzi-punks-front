import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";
import {
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Tag,
  FormControl,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useToast } from "@chakra-ui/react";
import { RequestAccess } from "../../Components/RequestAccess";
import { PunkCard } from "../../Components/PunkCard";
import { Loading } from "../../Components/Loading";
import { usePlatziPunkData } from "../../hooks/usePlatziPunksData";
import { usePlatziPunks } from "../../hooks/usePlatziPunks";
import { ModalTransfer } from "../../Components/ModalTransfer";

export const Punk: React.FC = () => {
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>("");
  const [isValidAddress, setIsAddress] = useState<boolean>(true)

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { active, account, library } = useWeb3React();
  const { tokenId } = useParams();
  const { loading, punk, update } = usePlatziPunkData(tokenId);
  const platziPunks = usePlatziPunks();
  const toast = useToast();

  const handleGetAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleTransfer = () => {
    setIsTransferring(true);
    const isAddress = library.utils.isAddress(address);
    setIsAddress(isAddress)
    if (!isAddress) {
      toast({
        title: "invalid Direction",
        description: "Your direction is not ethereum direction",
        status: "error",
      });
      setIsTransferring(false);
    }
    //EIP724 method
    platziPunks.methods
      .safeTransferFrom(punk.owner, address, punk.tokenId)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash: string) => {
        toast({
          title: "Transaction Sent",
          description: txHash,
          status: "info",
        });
      })
      .on("receipt", () => {
        setIsTransferring(false);
        onClose();
        toast({
          title: "Transaction Confirmed",
          description: `The Punk now belongs to ${address}`,
          status: "success",
        });
        update();
      })
      .on("error", () => {
        setIsTransferring(false);
      });
  };

  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  console.log(address);

  return (
    <>
      <ModalTransfer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <FormControl>
          <InputGroup>
            <Input
              isInvalid={!isValidAddress}
              value={address ?? ""}
              onChange={(e) => handleGetAddress(e)}
              placeholder="your address here"
            />
            <InputRightElement width="5.5rem">
              <Button disabled={!isValidAddress} onClick={handleTransfer} h="2rem" w="5rem" size={"sm"}>
                Transfer
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </ModalTransfer>
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack>
          <PunkCard
            mx={{
              base: "auto",
              md: 0,
            }}
            name={punk.name}
            image={punk.image}
          />
          <Button
            disabled={account !== punk.owner}
            colorScheme="green"
            onClick={onOpen}
            isLoading={isTransferring}
          >
            {account !== punk.owner ? "You are not the owner" : "Transfer NFT"}
          </Button>
        </Stack>
        <Stack width="100%" spacing={5}>
          <Heading>{punk.name}</Heading>
          <Text fontSize="xl">{punk.description}</Text>
          <Text fontWeight={600}>
            DNA:
            <Tag ml={2} colorScheme="green">
              {punk.DNA}
            </Tag>
          </Text>
          <Text fontWeight={600}>
            Owner:
            <Tag ml={2} colorScheme="green">
              {punk.owner}
            </Tag>
          </Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Attribute</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(punk.attributes).map(([key, value]) => (
                <Tr key={key}>
                  <Td>{key}</Td>
                  <Td>
                    <Tag>{value as string}</Tag>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Stack>
    </>
  );
};
