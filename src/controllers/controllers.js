const pool = require("../../db");
const { getIncidents, createIncident ,checkIncidentExists } = require("../queries/queries");
const axios = require("axios");



//A GET contoller that lists all the incidents.
const getAllIncidents = async (req, res) => {
  try {
    // code to fetch all incidents from the database
    const results = await pool.query(getIncidents);

    // If it resolves, we return the results as JSON
    res.status(200).json(results.rows);
  } catch (err) {
    // If it rejects,we log the error to the console and return a 500 status code along with an error message
    console.error(err);
    res.status(500).json({ message: "Error getting incidents" });
  }
};



//post controller to create new incident 
const addIncident = async (req, res) => {
  try {
    const { client_id, incident_desc, city, country } = req.body;

    // Check that all required fields are present in the request body
    if (!client_id || !incident_desc || !city || !country) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate that client_id is a valid integer and not negative
    if (!Number.isInteger(client_id) || client_id < 0) {
      return res.status(400).json({ message: "Invalid client ID" });
    }

    // Validate that incident_desc, city, and country contain valid characters and are not empty strings
    if (!/^[a-zA-Z0-9\s]+$/.test(incident_desc) || incident_desc.trim() === "" ||
        !/^[a-zA-Z\s]+$/.test(city) || city.trim() === "" ||
        !/^[a-zA-Z\s]+$/.test(country) || country.trim() === "") {
      return res.status(400).json({ message: "Invalid fields" });
    }

    // Check if the incident already exists in the database before inserting a new record
    const incidentExists = await pool.query(checkIncidentExists, [
      client_id,
      incident_desc,
      city,
      country,
    ]);
    if (incidentExists.rowCount > 0) {
      return res.status(409).json({ message: "Incident already exists" });
    }

    // Fetch weather report from OpenWeatherMap API
    const getWeatherReport = async (city, country) => {
      const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
      );
      const weatherReport = {
        temperature: response.data.main.temp,
        conditions: response.data.weather[0].description,
      };
      return weatherReport;
    };
    const weatherResponse = await getWeatherReport(city, country);
    if (!weatherResponse) {
      throw new Error("Unable to fetch weather data");
    }

    // Store incident report in database
    const date = new Date().toISOString();
    const incidentReport = {
      client_id,
      incident_desc,
      city,
      country,
      date,
      weather_report: weatherResponse,
    };
    const result = await pool.query(createIncident, [
      client_id,
      incident_desc,
      city,
      country,
      date,
      JSON.stringify(weatherResponse),
    ]);
    if (result.rowCount !== 1) {
      throw new Error("Failed to insert incident report into database");
    }

    // Return success response
    res.status(201).json({
      message: "Incident report received",
      incident: incidentReport,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  getAllIncidents,
  addIncident,
};
