import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function getClinics() {
  return await axios.get(`${API_ENDPOINT}/clinics`);
}

export async function getClinic(clinicId) {
  return await axios.get(`${API_ENDPOINT}/clinic`, {
    params: {
      clinicId: clinicId,
    },
  });
}

export async function getProfessionalsByClinic(clinicId) {
  return await axios.get(`${API_ENDPOINT}/clinic/professionals`, {
    params: {
      clinicId: clinicId,
    },
  });
}
