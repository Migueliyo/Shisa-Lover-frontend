import { Box, Card, Typography } from "@mui/material";

import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

function ErrorCard({ text }) {
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <Card
        sx={{
          backgroundColor: "#26262C",
          border: "1px solid #d32f2f",
          borderLeft: "5px solid #d32f2f",
          display: "flex",
          flexWrap: "column",
          justifyContent: "stretch",
          padding: "10px",
        }}
      >
        <Box>
          <DoDisturbOnIcon
            sx={{ mr: 1, height: 30, width: 30 }}
            color="error"
          />
        </Box>
        <Typography
          sx={{ display: "flex", alignItems: "center", fontWeight: 600 }}
          variant="overline"
          color="primary"
        >
          {text}
        </Typography>
      </Card>
    </Box>
  );
}

export default ErrorCard;
