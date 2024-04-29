import { useEffect, useState } from "react";

import { Box, Divider, Skeleton, Stack, useMediaQuery } from "@mui/material";

function LoadingEntries() {
  const [discussionEntriesToShow, setDiscussionEntriesToShow] = useState(2);
  const is1150 = useMediaQuery("(max-width: 1150px)");

  useEffect(() => {
    if (is1150) {
      setDiscussionEntriesToShow(1);
    } else {
      setDiscussionEntriesToShow(2)
    }
  }, [is1150]);
  return (
    <Box>
      <Skeleton variant="text" width={250} sx={{ fontSize: "20px", marginBottom: 2, backgroundColor: 'rgba(83,83,95,.30)' }} />
        <Stack spacing={2} direction={"row"} sx={{ marginBottom: 6 }} >
          {[...Array(discussionEntriesToShow)].map((_, index) => (
            <Stack key={index} spacing={2} direction={"row"} sx={{width: "100%"}}>
              <Skeleton variant="circular" width={40} height={40} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }} />
              <Stack spacing={1} sx={{width: "90%"}}>
                <Skeleton variant="rectangular" height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                <Skeleton variant="rectangular" height={130} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
              </Stack>
            </Stack>
          ))}
        </Stack>
      <Divider sx={{ borderColor: "section.divider.main", mt: 8, mb: 2 }} />
    </Box>
  );
}

export default LoadingEntries;