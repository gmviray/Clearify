<div id="top"></div>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <a href="https://github.com/CMSC100-UV4L/project-kennethtegrado">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h3 align="center">Clearify</h3>

<p align="center">
    A full stack application for a clearance approval system for the Institute of Computer Science Systems
    <br />
    <a href="https://github.com/CMSC100-UV4L/project-kennethtegrado"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CMSC100-UV4L/project-kennethtegrado">View Demo</a>
    ·
    <a href="https://github.com/CMSC100-UV4L/project-kennethtegrado/issues">Report Bug</a>
    ·
    <a href="https://github.com/CMSC100-UV4L/project-kennethtegrado/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [React][React-url]
-   [Express][Express-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/CMSC100-UV4L/project-kennethtegrado.git
    ```
2. Install NPM packages
    ```sh
    npm run install:dev
    ```
3. Set up the environment variables by creating a `.env` file and copy the properties inside the `.env.example` file. Ask `Renz Tegrado` for the values for each environment variable.
    ```bash
    PORT = 3001
    ```
4. Start the system on your machine
    ```bash
    npm run dev
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Endpoints

```json
{
	"info": {
		"_postman_id": "97af4a58-de6c-4129-845c-37fa87c42eab",
		"name": "CMSC 100 Project",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "27737747"
	},
	"item": [
		{
			"name": "Admin",
			"item": [
				{
					"name": "Pending Student Accounts",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/students/pending",
						"description": "Use this endpoint to fetch the list of all pending student applications."
					},
					"response": [
						{
							"name": "No pending accounts to verify",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": "{{base_url}}/students/pending"
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "x-powered-by",
									"value": "Express"
								},
								{
									"key": "content-type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "content-length",
									"value": "96"
								},
								{
									"key": "etag",
									"value": "W/\"60-d0OXH1D1Zvew/3BOjapNFc3OOp8\""
								},
								{
									"key": "date",
									"value": "Fri, 02 Jun 2023 13:00:23 GMT"
								},
								{
									"key": "connection",
									"value": "close"
								}
							],
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"data\": [],\n    \"message\": \"Successfully fetched unverified students\",\n    \"statusCode\": 200\n}"
						},
						{
							"name": "Request with an unauthorized role",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": "{{base_url}}/students/pending"
							},
							"status": "Forbidden",
							"code": 403,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "x-powered-by",
									"value": "Express"
								},
								{
									"key": "content-type",
									"value": "application/json; charset=utf-8"
								},
								{
									"key": "content-length",
									"value": "121"
								},
								{
									"key": "etag",
									"value": "W/\"79-5VpGM3VL9x51eToGFN+TBrw2g18\""
								},
								{
									"key": "date",
									"value": "Fri, 02 Jun 2023 13:02:31 GMT"
								},
								{
									"key": "connection",
									"value": "close"
								}
							],
							"cookie": [],
							"body": "{\n    \"success\": false,\n    \"errors\": \"Request is not allowed to access this resource.\",\n    \"message\": \"Request failed.\",\n    \"statusCode\": 403\n}"
						}
					]
				},
				{
					"name": "Verify Student",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{ \"studentNumber\" : \"202109799\"}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/student/verify"
					},
					"response": []
				},
				{
					"name": "Reject Account",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\"studentNumber\": \"202109799\"}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/student/reject"
					},
					"response": []
				},
				{
					"name": "Student Accounts",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/students"
					},
					"response": []
				},
				{
					"name": "Search Student Name",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "{{base_url}}/students?name=Re",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"students"
							],
							"query": [
								{
									"key": "name",
									"value": "Re"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "Approver Accounts",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/approvers"
					},
					"response": []
				},
				{
					"name": "Assign Adviser",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"studentNumber\": \"202109799\",\n    \"username\": \"radviser\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/student/assign-adviser"
					},
					"response": []
				},
				{
					"name": "Adviser Names",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/adviser-names"
					},
					"response": []
				},
				{
					"name": "Create Approver Account",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"firstName\": \"Renz\",\n    \"lastName\": \"Adviser\",\n    \"username\": \"radviser\",\n    \"email\": \"radviser@up.edu.ph\",\n    \"password\": \"Secret123\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/sign-up/approver",
						"description": "Use this endpoint to create an approver account. Ensure that you are logged in as an admin or requests sent to this endpoint will be rejected.\n\n#### **Schema**\n\n``` json\n{\n    \"schema\": {\n        \"type\": \"object\",\n        \"properties\": {\n            \"firstName\": {\n                \"type\": \"string\"\n            },\n            \"lastName\": {\n                \"type\": \"string\"\n            },\n            \"middleName\": { \"type\": \"string\" },\n            \"email\": {\n                \"type\": \"string\",\n                \"format\": \"email\"\n            },\n            \"username\": { \"type\": \"string\" },\n            \"password\": { \"type\": \"string\" },\n            \"clearanceOfficer\": { \"type\": \"boolean\" }\n        },\n        \"required\": [\"firstName\", \"lastName\", \"username\", \"email\", \"password\"]\n    },\n    \"examples\": [\n        {\n            \"firstName\": \"Renz\",\n            \"lastName\": \"Adviser\",\n            \"username\": \"radviser\",\n            \"email\": \"radviser@up.edu.ph\",\n            \"password\": \"Secret123\"\n        },\n        {\n            \"firstName\": \"Renz\",\n            \"lastName\": \"Officer\",\n            \"username\": \"rofficer\",\n            \"email\": \"rofficer@up.edu.ph\",\n            \"password\": \"Secret123\",\n            \"clearanceOfficer\": true\n        }\n    ]\n}\n\n\n```"
					},
					"response": []
				},
				{
					"name": "Delete Approver Account",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": "{{base_url}}/approver/radviser"
					},
					"response": []
				},
				{
					"name": "Editing Approver Account",
					"request": {
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"email\": \"radviser@up.edu.ph\",\n    \"password\": \"Secret123\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/approver/radviser"
					},
					"response": []
				}
			],
			"description": "These are the collection of endpoints for the admin user of the application"
		},
		{
			"name": "Authentication",
			"item": [
				{
					"name": "Create Student Account",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\"firstName\":\"Caresa\",\"lastName\":\"Hearmon\",\"studentNumber\":\"291960266\",\"email\":\"chearmon@up.edu.ph\",\"password\":\"Secret123\"}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/sign-up",
						"description": "This endpoint lets the client create a student-account.\n\n## Sample Request Body\n\n``` json\n{\n    \"firstName\": \"Renz\",\n    \"lastName\": \"Tegrado\",\n    \"email\": \"hotdog@up.edu.ph\",\n    \"password\": \"akoAyCute23\",\n    \"studentNumber\": \"202109799\"\n}\n\n```\n\n## Sample Response Message\n\n``` json\n{\n    \"success\": true,\n    \"data\": {\n        \"firstName\": \"Renz\",\n        \"lastName\": \"Tegrado\",\n        \"studentNumber\": \"202109799\",\n        \"email\": \"hotdog@up.edu.ph\",\n        \"userType\": \"student\",\n        \"adviser\": null,\n        \"application\": null\n    },\n    \"message\": \"Successfully created a new student account!\",\n    \"statusCode\": 201\n}\n\n```"
					},
					"response": []
				},
				{
					"name": "Login Account",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"email\": \"radviser@up.edu.ph\",\n    \"password\": \"Secret123\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/sign-in"
					},
					"response": []
				}
			]
		},
		{
			"name": "Approver",
			"item": [
				{
					"name": "Pending Adviser Approval",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/adviser/pending"
					},
					"response": []
				},
				{
					"name": "Adviser Approve Application",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id\": \"647bfb1898d770a3e15068c8\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/application/approve"
					},
					"response": []
				},
				{
					"name": "Pending Officer Approval",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/officer/pending"
					},
					"response": []
				},
				{
					"name": "Reject Application",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id\": \"647bfb1898d770a3e15068c8\",\n    \"username\": \"rapprover\",\n    \"remark\": \"I just want to reject you xd.\"\n}   ",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/application/reject"
					},
					"response": []
				},
				{
					"name": "Fetch Application",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/application/647bfb1898d770a3e15068c8"
					},
					"response": []
				}
			]
		},
		{
			"name": "Student",
			"item": [
				{
					"name": "Student Account",
					"request": {
						"method": "GET",
						"header": [],
						"url": "{{base_url}}/student"
					},
					"response": []
				},
				{
					"name": "Create an application",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"link\": \"https://github.com/CMSC100-UV4L/project-kennethtegrado\", \n    \"studentNumber\": \"202109799\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/application"
					},
					"response": []
				},
				{
					"name": "Resubmit Application",
					"request": {
						"method": "PATCH",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\"link\": \"nice one my boy\"}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "{{base_url}}/application"
					},
					"response": []
				},
				{
					"name": "Close application",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": "{{base_url}}/application"
					},
					"response": []
				}
			]
		},
		{
			"name": "Test connection with API",
			"request": {
				"method": "GET",
				"header": [],
				"url": "{{base_url}}/"
			},
			"response": []
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "base_url",
			"value": "http://localhost:3000/api",
			"type": "string"
		},
		{
			"key": "token_id",
			"value": "token-id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzhkNjdkMDJlMjJlZTU1MjkzOWExOCIsImlhdCI6MTY4NTY0MDgyOSwiZXhwIjoxNjg1NjQxMjYxfQ.3gs3FnzvMtazVK-SHl-YqbR3bxaFWDjqkUprtKDJ72E; Max-Age=432; Path=/; Expires=Thu, 01 Jun 2023 17:41:01 GMT; HttpOnly; Secure; SameSite=Strict",
			"type": "string"
		}
	]
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

-   [ ] Sign Up
-   [ ] Log In

See the [open issues](https://github.com/CMSC100-UV4L/project-kennethtegrado/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

<!-- LICENSE -->

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=61DAFB
[Express-url]: https://expressjs.com/
