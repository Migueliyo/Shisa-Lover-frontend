import { useContext, useEffect, useState } from "react";

import styled from "@emotion/styled";

import { Box, Button, Divider, useMediaQuery } from "@mui/material";

import { DrawerContext } from "../context/drawerContext";
import Mix from "./Mix";
import Flavour from "./Flavour";
import DiscussionEntry from "./DiscussionEntry";

const FormatedBox = styled(Box)(({ theme }) => {
  return {
    color: theme.palette.primary.main,
    width: "100%",
    ".title-div-section": {
      border: 0,
      paddingBottom: 10,
      font: "inherit",
      margin: 0,
      verticalAlign: "baseline",
    },
    ".title-div-section h2": {
      fontFamily: '"Roobert", "Inter", Helvetica, Arial, sans-serif',
      border: 0,
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      verticalAlign: "baseline",
      fontWeight: 600,
      fontSize: 20,
      lineHeight: 1.2,
    },
    ".a-section": {
      color: theme.palette.section.a.main,
      textDecoration: "none",
    },
    ".a-section:hover": {
      color: theme.palette.section.a.hover,
      textDecoration: "underline",
    },
    ".content-div-section": {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: 10,
    },
    ".button-divider-section": {
      color: theme.palette.section.button.main,
      fontWeight: 600,
    },
    ".button-divider-section:hover": {
      backgroundColor: theme.palette.section.button.hover,
      color: theme.palette.primary.main,
    },
    ".button-divider-section span": {
      textTransform: "lowercase",
    },
  };
});

function Section({ featuredWordTittle, tittle, content, data }) {
  const { open } = useContext(DrawerContext);
  const [mixesToShow, setMixesToShow] = useState(open ? 8 : 10);
  const [tobaccosToShow, setTobaccosToShow] = useState(open ? 8 : 10);
  const [discussionEntriesToShow, setDiscussionEntriesToShow] = useState(2);
  const [showedItems, setShowedItems] = useState(false);
  const is1600 = useMediaQuery("(max-width: 1600px)");
  const is1350 = useMediaQuery("(max-width: 1350px)");
  const is1150 = useMediaQuery("(max-width: 1150px)");
  const is1000 = useMediaQuery("(max-width: 1000px)");
  const is850 = useMediaQuery("(max-width: 850px)");
  const is700 = useMediaQuery("(max-width: 700px)");
  const is550 = useMediaQuery("(max-width: 550px)");

  useEffect(() => {
    if (is1600 && !is1350) {
      setShowedItems(false);
      setMixesToShow(open ? 6 : 8);
      setTobaccosToShow(open ? 7 : 9);
      setDiscussionEntriesToShow(2);
    } else if (is1350 && !is1150) {
      setShowedItems(false);
      setMixesToShow(6);
      setTobaccosToShow(7);
      setDiscussionEntriesToShow(2);
    } else if (is1150 && !is1000) {
      setShowedItems(false);
      setMixesToShow(6);
      setTobaccosToShow(6);
      setDiscussionEntriesToShow(1);
    } else if (is1000 && !is850) {
      setShowedItems(false);
      setMixesToShow(4);
      setTobaccosToShow(5);
      setDiscussionEntriesToShow(1);
    } else if (is850 && !is700) {
      setShowedItems(false);
      setMixesToShow(2);
      setTobaccosToShow(4);
      setDiscussionEntriesToShow(1);
    } else if (is700 && !is550) {
      setShowedItems(false);
      setMixesToShow(2);
      setTobaccosToShow(3);
      setDiscussionEntriesToShow(1);
    } else if (is550) {
      setShowedItems(false);
      setMixesToShow(2);
      setTobaccosToShow(2);
      setDiscussionEntriesToShow(1);
    } else {
      setShowedItems(false);
      setMixesToShow(open ? 8 : 10);
      setTobaccosToShow(open ? 8 : 10);
      setDiscussionEntriesToShow(2);
    }
  }, [is550, is700, is850, is1000, is1150, is1350, is1600, open]);

  const handleShowMore = () => {
    setMixesToShow((prevItems) => prevItems + mixesToShow);
    setTobaccosToShow((prevItems) => prevItems + tobaccosToShow);
    setDiscussionEntriesToShow(
      (prevItems) => prevItems + discussionEntriesToShow
    );
    setShowedItems(true);
  };

  return (
    <FormatedBox>
      <Box className="title-div-section">
        <h2>
          <a className="a-section" href={featuredWordTittle.toLowerCase()}>
            {featuredWordTittle}
          </a>{" "}
          {tittle}
        </h2>
      </Box>
      <Box
        className="content-div-section"
        style={{
          gap:
            content === "mix"
              ? "2%"
              : is700
              ? "3%"
              : content === "discussionEntry"
              ? "2%"
              : "1%",
        }}
      >
        {content === "mix" &&
          data.slice(0, mixesToShow).map((mix) => (
            <Mix
              key={mix.id}
              username={mix.username}
              name={mix.mix_name}
              categories={mix.categories}
            />
          ))}
        {content === "flavour" &&
          data.slice(0, tobaccosToShow).map((flavour) => (
            <Flavour
              key={flavour.id}
              name={flavour.flavour_name}
              brand={flavour.brand_name}
              categories={flavour.categories}
            />
          ))}
        {content === "discussionEntry" &&
          data.slice(0, discussionEntriesToShow).map((entry) => (
            <DiscussionEntry
              key={entry.id}
              username={entry.username}
              title={entry.entry_title}
              description={entry.description}
              categories={entry.categories}
            />
          ))}
      </Box>
      {!showedItems ? (
        <Divider
          sx={{
            "&::before, &::after": {
              borderColor: "section.divider.main",
            },
          }}
        >
          <Button className="button-divider-section" onClick={handleShowMore}>
            M<span>ostrar más</span>
          </Button>
        </Divider>
      ) : (
        <Divider sx={{ borderColor: "section.divider.main" }} />
      )}
    </FormatedBox>
  );
}
export default Section;
