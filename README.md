<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Education Pathways Project</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/ECE444-2021Fall/project1-education-pathways-group-11-sigmalab/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ECE444-2021Fall/project1-education-pathways-group-11-sigmalab/">View Demo</a>
    ·
    <a href="https://github.com/ECE444-2021Fall/project1-education-pathways-group-11-sigmalab/issues">Report Bug</a>
    ·
    <a href="https://github.com/ECE444-2021Fall/project1-education-pathways-group-11-sigmalab/issues">Request Feature</a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email`, `email_client`, `project_title`, `project_description`

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Flask](https://palletsprojects.com/p/flask/)
* [Docker](https://www.docker.com)
* [React.js](https://reactjs.org/)
* [PosgreSQL](https://www.postgresql.org/)
* [Adminer](https://www.adminer.org/)
* [Notion](https://www.notion.so/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

To run the project, you will need Docker, please refer to this documentation on [how to install Docker](https://docs.docker.com/get-docker/)

* WINDOWS USERS: You need to install [WSL2 Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install)

* Check if Docker and Docker-Compose exist in your system
  ```sh
  docker version
  docker-compose --version
  ```
* You also need to download VS Code to run the dev environment, you also need the following VSC extensions:
  * [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
  * [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
  * [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
  * FOR WINDOWS: [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)


### Installation

The project is fully dockerized, meaning you won't need to install any prerequisite languages or frameworks.

1. Clone the repo
   ```sh
   git clone git@github.com:ECE444-2021Fall/project1-education-pathways-group-11-sigmalab.git
   ```
2. Navigate to the project's folder and run
   ```sh
   cd project1-education-pathways-group-11-sigmalab
   docker-compose up --build
   ```
3. Open `frontend` or `education_pathways` folders in VS Code:
   ```sh
   code {folder_name}
   ```
4. VS Code will notify you to re-open the folder in a dev container; if it doesn't, do the following:
   * Open the Command Pallete `Cntl+Shift+P`
   * Run `Remote-Containers: Reopen In Container`

* To shutdown the app, run the following in the project's folder
   ```sh
   docker-compose down
   ```
### Tools and Ports

* React Frontend: `http://localhost:3000/`
  * React should auto-reload the page whenever you save a file
* PostgreSQL: `http://localhost:4000/`
* Adminer: `http://localhost:4500/`
  * Adminer is used to view the database tables and records
  * System: PostgreSQL
  * Server: database
  * Username: postgres
  * Password: postgres
* Flask Backend: `http://localhost:5000/`
  * Whenever you want to rebuild, run `docker-compose restart edu_pathways`

### Useful Script
* To run a single service: `docker-compose run --service-ports {service_name; ex: frontend} {command; ex: npm start}`
* To restart a service: `docker-compose restart {service_name; ex: edu_pathways}`
* To get into the container `docker exec -it frontend bash`

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [] Feature 1
- [] Feature 2
- [] Feature 3
    - [] Nested Feature

See the [open issues](https://github.com/ECE444-2021Fall/project1-education-pathways-group-11-sigmalab/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Adel Aswad - adel.aswad@mail.utoronto.ca

Sam Weninger - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Alex Senn - alex.senn@mail.utoronto.ca

Youssef Chmait - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Jay Bihola - [@twitter_handle](https://twitter.com/twitter_handle) - jaybih@outlook.com


Project Link: [https://github.com/ECE444-2021Fall/project1-education-pathways-group-11-sigmalab](https://github.com/ECE444-2021Fall/project1-education-pathways-group-11-sigmalab)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
