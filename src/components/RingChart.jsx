import { Box, styled } from "@mui/material";

const FormatedBox = styled(Box)(({ theme }) => {
  const commonStyles = {
    ".chart-container": {
      width: "300px",
      height: "300px",
      position: "relative",
    },

    ".chart": {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      position: "relative",
    },

    ".circle": {
      width: "50%",
      height: "50%",
      background: theme.palette.secondary.main,
      borderRadius: "50%",
      position: "absolute",
      top: "25%",
      left: "25%",
    },
  };
  return {
    ...commonStyles,
    [theme.breakpoints.down("520")]: {
      ...commonStyles,
    },
  };
});

const colors = ["#4caf50", "#ff9800", "#f44336", "#2196f3", "#9c27b0", "#673ab7", "#3f51b5", "#e91e63", "#ff5722", "#ffc107"];

const RingChart = ({ flavours }) => {
  const segments = flavours.map((flavour, index) => ({
    color: colors[index % colors.length], // Seleccionar un color de la lista basado en el índice
    value: flavour.percentage
  }));

  const conicGradient = `conic-gradient(
    ${segments
      .map(
        (segment, i) =>
          `${segment.color} ${segments
            .slice(0, i)
            .reduce((acc, seg) => acc + seg.value, 0)}% ${segments
            .slice(0, i + 1)
            .reduce((acc, seg) => acc + seg.value, 0)}%`
      )
      .join(",")}
  )`;

  return (
    <FormatedBox>
      <div className="chart-container">
        <div className="chart" style={{ background: conicGradient }}>
          <div className="circle"></div>
        </div>
      </div>
    </FormatedBox>
  );
};

export default RingChart;
