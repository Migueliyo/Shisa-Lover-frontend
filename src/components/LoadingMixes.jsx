import { Box, Divider, Skeleton, Stack } from "@mui/material";

function LoadingMixes() {
  return (
    <Box>
      <Skeleton variant="text" width={300} sx={{ fontSize: "20px", marginBottom: 2, backgroundColor: 'rgba(83,83,95,.30)' }} />
      {[...Array(2)].map((_, index) => (
        <Stack key={index} spacing={8} direction={"row"} sx={{ marginBottom: 6 }} >
          {[...Array(4)].map((_, index) => (
            <Stack key={index} spacing={1} direction={"row"} >
              <Skeleton variant="circular" width={40} height={40} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }} />
              <Stack spacing={1}>
                <Skeleton variant="rectangular" width={280} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
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
