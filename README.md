<h1 align="center">Hire Jobs</h1>


 <a href="https://nodejs.org/">
    <img src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>

![](https://img.shields.io/badge/Code%20Style-Standard-yellow.svg)
![](https://img.shields.io/badge/Dependencies-Express-green.svg)


# Hire Jobs
This HireJobs application was built using NodeJS and ExpressJS for the backend, and postgresql for the database.


## Prerequiste
* Node.js - Download and Install [Node.js](http://nodejs.org/) - Simple bash script to manage multiple active node.js versions.
* Postgresql - Download and Install [postgresql](https://www.postgresql.org/) - Make sure it's running on the default port.

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and PostgreSQL, (Also can be done with third-party tools like XAMPP, WAMP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:4004/v1/hireaps)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
# app
SERVER_PORT=5000

# database
DB_HOST="Your_Host"
DB_USERNAME="Your_Username"
DB_PASSWORD="Your_Password"
DB_DATABASE ="Your_Table"
DB_PORT = "Your_port_DB"


# jwt
SECRET_KEY = "secret key you"

# cloudinary
CLOUDINARY_CLOUD_NAME = "cloud name"
CLOUDINARY_API_KEY = "api key "
CLOUDINARY_API_SECRET = "secret key"

# Gmail OAUTH
GMAIL_ADDRESS = "email address"
GMAIL_OAUTH_CLIENT_ID = "id cliet"
GMAIL_OAUTH_CLIENT_SECRET= "client secret"
GMAIL_OAUTH_REFRESH_TOKEN= "refsresh token oauth"
GMAIL_OAUTH_ACCESS_TOKEN= "acces token" 
GMAIL_OAUTH_TOKEN_EXPIRE= "token expire"

```


## API Reference

#### Get employee

```http
  GET /employee
```
#### Get company

```http
  GET /company
```

#### Get filter employee

```http
  GET /employee
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `search` | `string` | **Required**. Your API key |
| `limit` | `number` | **Required**. Your API key |
| `type` | `string` | **Required**. Your API key |
| `page` | `number` | **Required**. Your API key |
| `sort` | `string` | **Required**. Your API key |

#### Get detail employee

```http
  GET /employee/id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `params` | `string` | **Required**. Your API key |


<!-- RELATED PROJECT -->
## Related Project
* [`Peworld Demo`](https://hireapp-frontend.vercel.app/landingpage)
* [`Peworld Rest API`](https://hire-jobs.herokuapp.com/)
* [`Peworld Frontend`](https://github.com/muhislah/hireapp-frontend/tree/develop2)


### Link Rest Api Dokumentasion Postman
* [`Dokumentasi Postman`](https://documenter.getpostman.com/view/10953547/UyxbqpvR#e9db513a-091a-42dc-ac07-0fb218fec8ef)


<center>
  <table>
    <tr>
      <th>Frontend/PO</th>
      <th>Frontend</th>
      <th>Backend</th>
      <th>Backend</th>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/muhislah">
          <img width="250" style="background-size: contain;" src="https://avatars.githubusercontent.com/u/32208840?v=4"><br/>
          <b>Muhamad Islahuddin</b>
        </a>
      </td>
       <td align="center">
        <a href="https://github.com/Irfanjulian">
          <img width="250" src="https://avatars.githubusercontent.com/u/103256648?v=4" alt="Irfan julian Ibrahim"><br/>
          <b>Irfan julian Ibrahim</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/wahyuwww">
          <img width="250" src="https://avatars.githubusercontent.com/u/60133853?v=4" alt="Wahyu Dwi Purwanto"><br/>
          <b>Wahyu Dwi Purwanto</b>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/sendialamsyah">
          <img width="250" src="https://avatars.githubusercontent.com/u/103249655?v=4" alt="sendialamsyah"><br/>
          <b>sendialamsyah</b>
        </a>
      </td>
    </tr>
  </table>
</center>

## License
Distributed under the [MIT](/LICENSE) License.
