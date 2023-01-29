<p align="center">
	<img src="https://github.com/jarvisar/senior-design/blob/master/src/assets/icon.png" width="200px"/>
</p>

# NASA Exoplanet Archive Search

The main objective of this project is to develop and build a web application capable of querying data from [NASA's Exoplanetary Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars) using user input. After entering a valid query, the web app builds an API URL using the user's input and calls NASA's archive to return the requested data. 

After returning the data, the web app then formats the data into a readable form and displays the data in a responsive table. A download button gives the user the option to export the exoplanet data to the local disk. This web application is built using Angular and utilizes HTTP requests and Table Access Protocol [(TAP)](https://www.ivoa.net/documents/TAP/) to call and return data from the exoplanet archive. 

Currently, the source code can be found in the [master branch](https://github.com/jarvisar/senior-design/tree/master) of the repository. To access the latest deployment, visit the [GitHub Pages](http://jarvisar.github.io/senior-design) site. This project is built using [Angular 14](https://angular.io/) and is a Progressive Web App (PWA) that can also be installed on your device like a regular app. To install, visit the website on a device with a modern browser and look for the "install" button in your browser's menu.

This project is also utilizing my CORS-Proxy, which can be found [here](https://github.com/jarvisar/cors-proxy).

## Table of Contents
1. [Team Members](./project-description.md) & [Project Abstract](./project-description.md#abstract)
2. [Project Description](./project-description.md)
3. [User Stories](./User_Stories.md) & [Design Diagrams](./design-diagrams)
4. [Project Tasks](./Tasklist.md) & [Timeline](./Timeline.md)
5. [Project Constraints](./Project_Constraints.md)
6. [Fall Presentation](./essays/Presentation.pptx)
7. Self-Assessment Essays for [Adam Jarvis](./essays/JarvisIndividualAssessment.docx)
8. Professional Biographies for [Adam Jarvis](./essays/JarvisProfessionalBiography.md)
9. [Budget](./essays/budget.md)
10. [Appendix](./appendix.md)
