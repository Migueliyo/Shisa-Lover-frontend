import { useContext, useEffect, useState } from "react";

import { Box, Divider, Skeleton, Stack, useMediaQuery } from "@mui/material";

import { DrawerContext } from "../context/drawerContext";

function LoadingFlavours({ rowsToShow }) {
  const { open } = useContext(DrawerContext);
  const [flavoursToShow, setFlavoursToShow] = useState(open ? 8 : 10);
  const is1600 = useMediaQuery("(max-width: 1600px)");
  const is1450 = useMediaQuery("(max-width: 1450px)");
  const is1150 = useMediaQuery("(max-width: 1150px)");
  const is1000 = useMediaQuery("(max-width: 1000px)");
  const is850 = useMediaQuery("(max-width: 850px)");
  const is700 = useMediaQuery("(max-width: 700px)");
  const is550 = useMediaQuery("(max-width: 550px)");

  useEffect(() => {
    if (is1600 && !is1450) {
      setFlavoursToShow(open ? 7 : 9);
    } else if (is1450 && !is1150) {
      setFlavoursToShow(7);
    } else if (is1150 && !is1000) {
      setFlavoursToShow(6);
    } else if (is1000 && !is850) {
      setFlavoursToShow(5);
    } else if (is850 && !is700) {
      setFlavoursToShow(4);
    } else if (is700 && !is550) {
      setFlavoursToShow(3);
    } else if (is550) {
      setFlavoursToShow(2);
    } else {
      setFlavoursToShow(open ? 8 : 10);
    }
  }, [is550, is700, is850, is1000, is1150, is1450, is1600, open]);

  return (
    <Box>
      <Skeleton variant="text" width={250} sx={{ fontSize: "20px", marginBottom: 2, backgroundColor: 'rgba(83,83,95,.30)' }} />
        {[...Array(rowsToShow)].map((_, index) => (
          <Stack key={index} spacing={2} direction={"row"} sx={{ marginBottom: 6 }} >
            {[...Array(flavoursToShow)].map((_, index) => (
              <Stack key={index} direction={"row"} sx={{width: "100%", height: 200}}>
                <Stack spacing={1}>
                  <Skeleton variant="rectangular" sx={{ backgroundColor: 'rgba(83,83,95,.30)', width: "225%", height: "100%" }}/>
                  <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                  <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                  <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                </Stack>
              </Stack>
            ))}
          </Stack>
        ))}
      <Divider sx={{ borderColor: "section.divider.main", mt: 8, mb: 2 }} />
    </Box>
  );
}

export default LoadingFlavours;
