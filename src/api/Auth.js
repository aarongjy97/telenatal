import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_ENDPOINT = process.env.API_ENDPOINT;

export async function loginPatient(email, password) {
  return await axios.get(`${API_ENDPOINT}/auth/patient/login`, {
    data: {
      email: email,
      password: password,
    },
  });
}

/**
 * {
 * 	name: string,
 *  password: string,
 *  email: string,
 *  phone: string,
 *  dob: Date,
 *  address : string,
 *  postalCode: Number
 * }
 */
export async function registerPatient(patient) {
  return await axios.post(`${API_ENDPOINT}/auth/patient/register`, patient);
}
