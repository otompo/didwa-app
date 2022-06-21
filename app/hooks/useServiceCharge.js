import { useState, useEffect } from "react";
import axios from "axios";

const useServiceCharge = () => {
  // state
  const [serviceCharge, setServiceCharge] = useState("");

  useEffect(() => {
    loadServiceCharge();
  }, []);

  const loadServiceCharge = async () => {
    try {
      const { data } = await axios.get("/settings/servicecharge");
      //   console.log(data);
      setServiceCharge(data.serviceCharge);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    serviceCharge,
    setServiceCharge,
  };
};

export default useServiceCharge;
