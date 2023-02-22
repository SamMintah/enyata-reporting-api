# enyata-reporting-api

This project is an incident reporting API for an insurance company. The API allows users to report incidents such as accidents, theft, and damage to property. It provides an easy-to-use interface for users to submit incident reports and for insurance companies to manage and process these reports. The API also includes features such as input validation and duplicate incident checking to ensure the accuracy and integrity of the data.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`

## Environment Variables

The following environment variables are required to run this project. 

- `OPEN_WEATHER_MAP_API_KEY` - OpenWeatherMap API Key.
- `DATABASE_URL` - URL of the database to be used. (postgres://postgres:PASSWORD @localhost:5432/DB_NAME)


## Usage

To start the application, run the following command:

```bash
npm start

``` 

## API Endpoints



| Endpoint | Description               |
| -------- | ------------------------- |
| POST /insurance/api/incidents/add | Create a new incident report |
| GET /insurance/api/incidents | Get list of all the incident reports |



## Request Body

```
{
  "client_id": 123,
  "incident_desc": "description of incident",
  "city": "city name",
  "country": "country name"
}

```

## Response

```
{
  "message": "Incident report received",
  "incident": {
    "client_id": 123,
    "incident_desc": "description of incident",
    "city": "city name",
    "country": "country name",
    "date": "2023-02-20T12:00:00.000Z",
    "weather_report": {
      "temperature": 25,
      "conditions": "sunny"
    }
  }
}

```
