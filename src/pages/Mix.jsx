import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import MixCard from "../components/MixCard";

function Mix() {
  const { id } = useParams();
  const [mix, setMix] = useState([]);

  const getMix = async (id) => {
    const response = await api.getMixById(id);
    if (!response.error) {
      setMix(response.data);
    } else {
      console.error(response.message);
    }
  };

  useEffect(() => {
    getMix(id);
  }, [id]);

  return (
    <Box>
      {mix[0] && (
        <MixCard
          key={mix[0].id}
          id={mix[0].id}
          username={mix[0].username}
          name={mix[0].mix_name}
          categories={mix[0].categories}
        />
      )}
      {console.log(mix[0])}
    </Box>
  );
}

export default Mix;
