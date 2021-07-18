import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_ENDPOINT = process.env.API_ENDPOINT;

export async function getAppointment(appointmentId) {
  return await axios.get(`${API_ENDPOINT}/appointment`, {
    data: {
      appointmentId: appointmentId,
    },
  });
}

export async function getPatientAppointment(patientId) {
  return await axios.get(`${API_ENDPOINT}/appointment/patient`, {
    data: {
      patientId: patientId
    },
  });
}

export async function updateAppointment(appointment) {
  return await axios.put(`${API_ENDPOINT}/appointment`, appointment);
}

export async function deleteAppointment(appointmentId) {
  return await axios.delete(`${API_ENDPOINT}/appointment`, {
		data: {
			appointmentId: appointmentId,
		}
	});
}

export async function createAppointment(date, location, postalCode, patientId, professionalId) {
  return await axios.post(`${API_ENDPOINT}/appointment`, {
		data: {
			date: date,
			location: location,
			postalCode: postalCode,
			patientId: patientId,
			professionalId: professionalId
		}
	});
}