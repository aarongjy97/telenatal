import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

/**
 * {
 * 	name: string,
 *  password: string
 * }
 */
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
 *  postalCode: Number,
 *  drugAllergies: list,
 *  healthConditions: list,
 *  babyName: string,
 *  babyGender: string,
 *  dueDate: Date
 * }
 */
export async function registerPatient(
  name,
  password,
  email,
  phone,
  dob,
  address,
  postalCode,
  drugAllergies,
  healthConditions,
  babyName,
  babyGender,
  dueDate
) {
  return await axios.post(`${API_ENDPOINT}/auth/patient/register`, {
    name: name,
    password: password,
    email: email,
    phone: phone,
    dob: dob,
    address: address,
    postalCode: postalCode,
    drugAllergies: drugAllergies,
    healthConditions: healthConditions,
    babyName: babyName,
    babyGender: babyGender,
    dueDate: dueDate
  });
}

/**
 * {
 * 	name: string,
 *  password: string
 * }
 */
export async function loginProfessional(email, password) {
  return await axios.post(`${API_ENDPOINT}/auth/professional/login`, {
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
 *  type: "doctor" | "nurse",
 *  education: string,
 *  medicalLicenseNo: string,
 *  clinicId: string
 * }
 */
export async function registerProfessional(
  name,
  password,
  email,
  phone,
  type,
  education,
  medicalLicenseNo,
  clinicId
) {
  return await axios.post(`${API_ENDPOINT}/auth/professional/register`, {
    name: name,
    password: password,
    email: email,
    phone: phone,
    type: type,
    education: education,
    medicalLicenseNo: medicalLicenseNo,
    clinicId: clinicId,
  });
}
