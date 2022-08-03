# E-Commerce Back End

## Description
Internet retail like Amazon, Walmart, etc function off expansive databases detailing stock and how to present exactly what the user wants. These backend CRUD functions shapes the database needed to achieve that.

<details>
<summary>Click to view table of contents</summary>

## Table of Contents
* [Installation](#installation)
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Contributors](#contributors)
* [Questions](#questions)
</details>

## Installation
Download the zip file from GitHub and extract the files. To install with the necessary dependencies, run the following command:

 ```bash
npm i
```

## Dependencies
- mysql2,
- express,
- sequelize,
- dotenv

**YOU WILL ALSO NEED TO [DOWNLOAD MYSQL](https://www.mysql.com/downloads/).**

## Usage
There are several steps necessary to set up your server:

First, you must establish the connection to the database by renaming .env.EXAMPLE to .env and correctly enter your information in it.

Create the database by opening your MySQL shell with your login info, and SOURCE-ing the schema.sql file:

```MySQL
SOURCE /db/schema.sql
```

Close the MySQL shell and seed the database by running the seed script:

```bash
npm run seed
```

Then start the server with the following command:

```bash
npm run start
```

[Video detailing setting up the backend and its functionality can be found here](https://watch.screencastify.com/v/SpMk6Njn4RhpOGmqj849).

## Contributors
- Axel

## Questions
If you have any questions, open an issue or contact directly at [axeljkern@yahoo.com](mailto:axeljkern@yahoo.com). You can find more of my work on [GitHub](https://www.github.com/Axeljk).