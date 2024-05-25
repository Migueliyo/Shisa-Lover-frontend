import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import FlavourCard from "../components/FlavourCard";

function Flavour() {
  const { id } = useParams();
  const [flavour, setFlavour] = useState(undefined);

  const getFlavour = async (id) => {
    const response = await api.getFlavourById(id);
    if (!response.error) {
      setFlavour(response.data);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    getFlavour(id);
  }, [id]);

  return (
    <Box>
      {flavour && (
        <FlavourCard
          key={flavour.id}
          id={flavour.id}
          name={flavour.flavour_name}
          brand={flavour.brand_name}
          categories={flavour.categories}
        />
      )}
    </Box>
  );
}

export default Flavour;
