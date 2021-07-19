import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function getAppointment(appointmentId) {
  return await axios.get(`${API_ENDPOINT}/appointment`, {
    params: {
      appointmentId: appointmentId,
    },
  });
}

export async function getPatientAppointments(patientId) {
  return await axios.get(`${API_ENDPOINT}/appointments/patient`, {
    params: {
      patientId: patientId,
    },
  });
}

export async function getProfessionalAppointments(professionalId) {
  return await axios.get(`${API_ENDPOINT}/appointments/professional`, {
    params: {
      professionalId: professionalId,
    },
  });
}

export async function getPatientUpcomingAppointments(patientId) {
  return await axios.get(`${API_ENDPOINT}/appointments/patient/upcoming`, {
    params: {
      patientId: patientId,
    },
  });
}

export async function getProfessionalUpcomingAppointments(professionalId) {
  return await axios.get(`${API_ENDPOINT}/appointments/professional/upcoming`, {
    params: {
      professionalId: professionalId,
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
    },
  });
}

export async function createAppointment(
  date,
  location,
  postalCode,
  patientId,
  professionalId
) {
  return await axios.post(`${API_ENDPOINT}/appointment`, {
    date: date,
    location: location,
    postalCode: postalCode,
    patientId: patientId,
    professionalId: professionalId,
  });
}

export async function getDoctors() {
  return await axios.get(`${API_ENDPOINT}/professional/doctors`);
}

export async function getNurses() {
  return await axios.get(`${API_ENDPOINT}/professional/nurses`);
}
