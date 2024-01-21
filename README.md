# Microservice: Stat-API

## Overview

The Stat-API microservice manages statistical data for the GameStats Tracker application. It provides endpoints for creating, retrieving, updating, and deleting statistical information stored in a MongoDB database. Additionally, it exposes metrics for monitoring using Prometheus.

## Setup and Configuration

1. Clone the repository.
2. Run the commands in the root project readme.

Note the environment variables:

- `STATDB_USER`: Username for MongoDB connection.
- `STATDB_PASSWORD`: Password for MongoDB connection.

these are set through Kubernetes. See the file `stat-api-deployment.yaml` in the root/kubernetes folder of the project.

## MongoDB Connection

The Stat-API connects to a MongoDB database using the following connection string:
`mongodb://${username}:${password}@statdb-service:5150/admin?authSource=admin&authMechanism=SCRAM-SHA-256`

Access the Stat-API service at http://localhost:5100

## Prometheus Metrics

The Stat-API provides metrics for monitoring using Prometheus. Access metrics at http://localhost:5100/metrics

## Endpoints

### Hello World Endpoint:

- **Endpoint:** /
- **Description:** Returns a simple "Hello world from stat api" message.
- **Example:** http://localhost:5100/

### Create Stat Endpoint:

- **Endpoint:** /createstat
- **Description:** Creates a new statistical entry in the MongoDB database.
- **Method:** POST
- **Example:** http://localhost:5100/createstat

### Get All Stats Endpoint:

- **Endpoint:** /getallstats
- **Description:** Retrieves a list of all statistical entries from the MongoDB database.
- **Method:** GET
- **Example:** http://localhost:5100/getallstats

### Get Stat by ID Endpoint:

- **Endpoint:** /getstatbyid/:id
- **Description:** Retrieves a specific statistical entry by its ID from the MongoDB database.
- **Method:** GET
- **Example:** http://localhost:5100/getstatbyid/123456789

### Update Stat Endpoint:

- **Endpoint:** /updatestat/:id
- **Description:** Updates an existing statistical entry in the MongoDB database.
- **Method:** PUT
- **Example:** http://localhost:5100/updatestat/123456789

### Delete Stat Endpoint:

- **Endpoint:** /deletestat/:id
- **Description:** Deletes a statistical entry by its ID from the MongoDB database.
- **Method:** DELETE
- **Example:** http://localhost:5100/deletestat/123456789

## Contact Information

For any inquiries or assistance related to the Stat-API microservice, please contact:

Bart Hagoort: </br>
Email: barthagoort2000@outlook.com </br>
Phone: +31 6 57113787 </br>
