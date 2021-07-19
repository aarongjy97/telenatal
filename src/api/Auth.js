import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function loginPatient(email, password) {
  return await axios.post(`${API_ENDPOINT}/auth/patient/login`, {
      email: email,
      password: password,
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
export async function registerPatient(name, password, email, phone, dob, address, postalCode) {
	return await axios.post(`${API_ENDPOINT}/auth/patient/register`, {
    name: name,
    password: password,
    email: email,
    phone: phone,
    dob: dob,
    address: address, 
    postalCode: postalCode
  });
}
