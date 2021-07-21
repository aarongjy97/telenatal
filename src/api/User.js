import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function getPatient(patientId) {
  return await axios.get(`${API_ENDPOINT}/user/patient`, {
    params: {
      patientId: patientId,
    },
  });
}

export async function getProfessional(professionalId) {
  return await axios.get(`${API_ENDPOINT}/user/professional`, {
    params: {
      professionalId: professionalId,
    },
  });
}
