import { useContext, useEffect } from "react";

import styled from "@emotion/styled";

import { Box } from "@mui/material";

import { DrawerContext } from "../context/drawerContext";
import { appBarHeight } from "./AppBar";
import Section from "./Section";

import { useAppDispatch } from "../hooks/store";
import { fetchMixes } from "../store/mixes/slice";
import { useUserActions } from "../hooks/useMixesActions"


const FormatedBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    width: "100%",
    height: `calc(100% - ${appBarHeight + 25}px)`, // El resultado de la altura del appbar y el paddingTop
    overflowY: "auto",
    marginTop: appBarHeight,
    marginLeft: open ? "320px" : theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
  };
});

function Main() {
  const { open } = useContext(DrawerContext);
  const dispatch = useAppDispatch();
  const { mixes, status, error } = useUserActions()

  // const [mixes, setMixes] = useState([]);
  // const [flavours, setFlavours] = useState([]);
  // const [entries, setEntries] = useState([]);
  // const [refresh, setRefresh] = useState(false);

  // const getMixes = async () => {
  //   const response = await api.getMixes();
  //   if (!response.error) {
  //     setMixes(response.data);
  //   } else {
  //     console.log(response.message);
  //   }
  // };

  // const getFlavours = async () => {
  //   const response = await api.getFlavours();
  //   if (!response.error) {
  //     setFlavours(response.data);
  //   } else {
  //     console.log(response.message);
  //   }
  // }

  // const getEntries = async () => {
  //   const response = await api.getEntries();
  //   if (!response.error) {
  //     setEntries(response.data);
  //   } else {
  //     console.log(response.message);
  //   }
  // }

  // useEffect(() => {
  //   getMixes();
  //   getFlavours();
  //   getEntries();
  // }, []);

  useEffect(() => {
    dispatch(fetchMixes());
  }, [dispatch]);

  return (
    <FormatedBox open={open}>
      {status === "loading" && <h1>Loading...</h1>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <Section
          featuredWordTittle="Mezclas"
          tittle="destacadas"
          content="mix"
          data={mixes}
        />  
      )}
      {/* <Section
        featuredWordTittle="Sabores"
        tittle="recien traídos al mercado"
        content="flavour"
        data={flavours} />
      <Section
        featuredWordTittle="Entradas"
        tittle="destacadas de nuestro foro de debate"
        content="discussionEntry" 
        data={entries} /> */}
    </FormatedBox>
  );
}
export default Main;
