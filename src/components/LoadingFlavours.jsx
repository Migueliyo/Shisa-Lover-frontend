import { Box, Divider, Skeleton, Stack } from "@mui/material";

function LoadingMixes() {
  return (
    <Box>
      <Skeleton variant="text" width={300} sx={{ fontSize: "20px", marginBottom: 2, backgroundColor: 'rgba(83,83,95,.30)' }} />
        <Stack spacing={2} direction={"row"} sx={{ marginBottom: 6 }} >
          {[...Array(8)].map((_, index) => (
            <Stack key={index} direction={"row"}>
              <Stack spacing={1}>
                <Skeleton variant="rectangular" width={180} height={180} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
                <Skeleton variant="rectangular" width={60} height={12} sx={{ backgroundColor: 'rgba(83,83,95,.30)' }}/>
              </Stack>
            </Stack>
          ))}
        </Stack>
      <Divider sx={{ borderColor: "section.divider.main", mt: 8, mb: 2 }} />
    </Box>
  );
}

export default LoadingMixes;
