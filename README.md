# Mockrm

A lightweight, customizable mock CRM service with a single endpoint for testing and development.

## Overview

This is a simple Docker-based mock CRM that returns business data from a JSON file. It's designed to be easily integrated into any project via Docker Compose for testing purposes.

## Quick Start

### Pull the Docker image

```bash
docker pull ghcr.io/bynned/mockrm:latest
```

### Create your data file

Create a `data.json` file with your business data:

```json
{
  "endpoint": "/api",
  "321321312": {
    "businessId": "321321312",
    "address": "Testikatu 12 A"
  },
  "456456456": {
    "businessId": "456456456",
    "address": "Katutesti 14 B"
  }
}
```

## Usage

### Docker CLI

```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/data.json:/app/data.json \
  ghcr.io/bynned/mockrm:latest
```

### Docker Compose

Add this to your `docker-compose.yml`:

```yaml
version: '3.8'
services:
  mock-crm:
    image: ghcr.io/bynned/mockrm:latest
    ports:
      - '3000:3000'
    volumes:
      - ./data.json:/app/data.json
```

## API

### Get Business by ID

```
GET /api/{businessId}
```

Example:

```bash
curl http://localhost:3000/api/321321312
```

Response:

```json
{
  "businessId": "321321312",
  "address": "Testikatu 12 A"
}
```

### Error Response

If business ID not found:

```json
{
  "error": "Business not found"
}
```

## Configuration

- `PORT`: Server port (default: 3000)
- `data.json`: Mount your custom business data to `/app/data.json`

## Data Structure

The `data.json` file must include:

- `endpoint`: The API endpoint path
- Business objects keyed by their business ID

Each business object can contain any fields you need. The only requirement is that the key matches the businessId you'll query.
