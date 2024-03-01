  import { useContext, useEffect, useState } from "react";

  import styled from "@emotion/styled";

  import { Box, Button, Divider, useMediaQuery } from "@mui/material";

  import { DrawerContext } from "./drawerContext";
  import Mix from "./Mix";

  const FormatedBox = styled(Box)(({ theme }) => {
    const commonStyles = {
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
        gap: "2%",
      },
      ".button-divider-section": {
        color: theme.palette.section.button.main,
        fontWeight: 600,
      },
      ".button-divider-section:hover": {
        backgroundColor: theme.palette.section.button.hover,
      },
      ".button-divider-section span": {
        textTransform: "lowercase",
      },
    };

    return {
      ...commonStyles,
      //@media (max-width: 1100px)
      [theme.breakpoints.down("1100")]: {
        ...commonStyles,
      },
      //@media (max-width: 600px)
      [theme.breakpoints.down("sm")]: {
        ...commonStyles,
      },
    };
  });

  let categories = ["Afrutada", "Dulce", "Mentolada"];

  function Section() {
    const { open } = useContext(DrawerContext);
    const [itemsToShow, setItemsToShow] = useState(open ? 8 : 10);
    const [showedItems, setShowedItems] = useState(false);
    const is1600 = useMediaQuery("(max-width: 1600px)");
    const is1350 = useMediaQuery("(max-width: 1350px)");
    const is1000 = useMediaQuery("(max-width: 1000px)");
    const is700 = useMediaQuery("(max-width: 700px)");
  
    useEffect(() => {
      if (is1600 && !is1350) {
        // Entre 1350 y 1600
        setShowedItems(false);
        setItemsToShow(open ? 6 : 8);
      } else if (is1350 && !is1000) {
        // Entre 1000 y 1350
        setShowedItems(false);
        setItemsToShow(6);
      } else if (is1000 && !is700) {
        // Entre 1000 y 700
        setShowedItems(false);
        setItemsToShow(4);
      }else if (is700) {
        // Menor o igual a 700
        setShowedItems(false);
        setItemsToShow(2);
      } else {
        setShowedItems(false);
        setItemsToShow(open ? 8 : 10);
      }
    }, [is700, is1000, is1350, is1600, open]);
    
  
    const handleShowMore = () => {
      setItemsToShow((prevItems) => prevItems + itemsToShow);
      setShowedItems(true);
    };

    return (
      <FormatedBox>
        <Box className="title-div-section">
          <h2>
            <a className="a-section" href="/mezclas">
              Mezclas
            </a>{" "}
            interesantes
          </h2>
        </Box>
        <Box className="content-div-section">
          {[...Array(itemsToShow)].map((_, index) => (
            <Mix
              key={index}
              username="migueliyo"
              description={`Mezcla afrutada y muy dulce ${index++}`}
              categories={categories}
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
