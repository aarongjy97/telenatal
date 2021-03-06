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

export async function updateAppointmentDate(appointmentId, date) {
  return await axios.put(`${API_ENDPOINT}/appointment`, {
    appointmentId: appointmentId,
    date: date,
  });
}

export async function updateAppointment(data) {
  return await axios.put(`${API_ENDPOINT}/appointment`, data);
}

export async function deleteAppointment(appointmentId) {
  return await axios.delete(`${API_ENDPOINT}/appointment`, {
    data: {
      appointmentId: appointmentId,
    },
  });
}

export async function createAppointment(
  purpose,
  date,
  location,
  postalCode,
  patientId,
  professionalId,
  remarks
) {
  var meetingId;

  return await axios.post(`${API_ENDPOINT}/appointment`, {
    purpose: purpose,
    date: date,
    location: location,
    postalCode: postalCode,
    patientId: patientId,
    professionalId: professionalId,
    remarks: remarks,
    meetingId: meetingId,
  });
}

export async function getDoctors() {
  return await axios.get(`${API_ENDPOINT}/professional/doctors`);
}

export async function getNurses() {
  return await axios.get(`${API_ENDPOINT}/professional/nurses`);
}

export async function getProfessionalAvailability(professionalId, date) {
  return await axios.get(`${API_ENDPOINT}/professional/availability`, {
    params: {
      date: date,
      professionalId: professionalId,
    },
  });
}

export async function getPatients() {
  return await axios.get(`${API_ENDPOINT}/user/patients`);
}
