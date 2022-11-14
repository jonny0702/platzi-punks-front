import { ChangeEvent, FormEvent, useState } from "react";
import {
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { usePlatziPunksData } from "../../hooks/usePlatziPunksData";
import { PunkCard } from "../../Components/PunkCard";
import { Loading } from "../../Components/Loading";
import { RequestAccess } from "../../Components/RequestAccess";

export const Punks = () => {
  const { search } = useLocation();

  const [address, setAddress] = useState<string | null>(
    new URLSearchParams(search).get("address")
  );
  const [submitted, setSubmitted] = useState<boolean>(true);
  const [validAddress, setValidAddress] = useState<boolean>(true);

  const navigate = useNavigate();
  const { active, library } = useWeb3React();
  const { punks, loading } = usePlatziPunksData({
    owner: submitted && validAddress ? address : null,
  } as any);

  const handleAddressChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address) {
      navigate("/punks");
    }

    const isValid = library.utils.isAddress(address);

    setValidAddress(isValid);
    setSubmitted(true);
    isValid && navigate(`/punks?address=${address}`);
  };

  if (!active) return <RequestAccess />;

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents={"none"}
              children={<SearchIcon color={"gray.200"} />}
            />
            <Input
              isInvalid={!validAddress && submitted}
              value={address ?? ""}
              onChange={(e) => handleAddressChange(e)}
              placeholder="Search By Address"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size={"sm"}>
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText>Direction Invalid</FormHelperText>
          )}
        </FormControl>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1f))" gap={6}>
          {punks.map(({ name, image, tokenId }: any) => (
            <Link key={tokenId} to={`/punks/${tokenId}`}>
              <PunkCard name={name} image={image} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};
