const getIncidents = "SELECT * FROM incident_reports";
const createIncident = "INSERT INTO incident_reports (client_id, incident_desc, city, country, date, weather_report) VALUES ($1, $2, $3, $4, $5, $6)";
const checkIncidentExists = "SELECT * FROM incident_reports WHERE client_id = $1 AND incident_desc = $2 AND city = $3 AND country = $4";

module.exports = {
    getIncidents,
    createIncident,
    checkIncidentExists
}