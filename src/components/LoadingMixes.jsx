import { useContext, useEffect, useState } from "react";

import { Box, Divider, Skeleton, Stack, useMediaQuery } from "@mui/material";
import { DrawerContext } from "../context/drawerContext";

function LoadingMixes({ rowsToShow }) {
  const { open } = useContext(DrawerContext);
  const [mixesToShow, setMixesToShow] = useState(open ? 4 : 5);
  const is1600 = useMediaQuery("(max-width: 1600px)");
  const is1450 = useMediaQuery("(max-width: 1450px)");
  const is1000 = useMediaQuery("(max-width: 1000px)");
  const is700 = useMediaQuery("(max-width: 700px)");
  
  useEffect(() => {
    if (is1600 && !is1450) {
      setMixesToShow(open ? 3 : 4);
    } else if (is1450 && !is1000) {
      setMixesToShow(3);
    } else if (is1000 && !is700) {
      setMixesToShow(2);
    } else if (is700) {
      setMixesToShow(1);
    } else {
      setMixesToShow(open ? 4 : 5);
    }
  }, [is700, is1000, is1450, is1600, open]);

  return (
    <Box>
      <Skeleton variant="text" width={250} sx={{ fontSize: "20px", marginBottom: 2, backgroundColor: 'rgba(83,83,95,.30)' }} />
      {[...Array(rowsToShow)].map((_, index) => (
        <Stack key={index} spacing={8} direction={"row"} sx={{ marginBottom: 6 }} >
          {([...Array(mixesToShow)]).map((_, index) => (
            <Stack key={index} spacing={1} direction={"row"} sx={{width: "100%"}}>
              <Skeleton variant="circular" width={40} height={40} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }} />
              <Stack spacing={1}>
                <Skeleton variant="rectangular" width={"350%"} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
              </Stack>
            </Stack>
          ))}
        </Stack>
      ))}
      <Divider sx={{ borderColor: "section.divider.main", mt: 8, mb: 3 }} />
    </Box>
  );
}

export default LoadingMixes;
