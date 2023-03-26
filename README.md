<p align="center">
	<img src="https://github.com/jarvisar/senior-design/blob/master/src/assets/reflection_card.png"/>
</p>

The main objective of this project is to develop and build a web application capable of querying data from [NASA's Exoplanetary Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars) using user input. After entering a valid query, the web app builds an API URL using the user's input and calls NASA's archive to return the requested data. 

After returning the data, the web app then displays the data in a responsive table. A download button gives the user the option to export the exoplanet data to the local disk. This web application utilizes Table Access Protocol [(TAP)](https://www.ivoa.net/documents/TAP/) to call and return data from the exoplanet archive. 

Currently, the source code can be found in the [master branch](https://github.com/jarvisar/senior-design/tree/master) of the repository. To access the latest deployment, visit the [GitHub Pages](http://jarvisar.github.io/senior-design) site. 

This project is built using [Angular 14](https://angular.io/) and is a Progressive Web App (PWA) that can be installed on your device like a regular app. To install, visit the website on a device with a modern browser and look for the "install" button in your browser's menu or address bar.

This project also uses my CORS-Proxy, which can be found [here](https://github.com/jarvisar/cors-proxy).

Graphics were created using Adobe Photoshop, Inkscape, and other online tools.

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
10. [User Docs](./User_Docs.md)
11. [Appendix](./appendix.md)
12. [Poster](./Poster.pptx)

<p align="center">
	<img src="https://github.com/jarvisar/senior-design/blob/main/poster/Poster.png"/>
</p>

## Tools Used During Development
<br>

<p align="center">
  <a target="_blank" href="https://angular.io/"><img src="https://angular.io/assets/images/logos/angular/angular.png" alt="Angular" width="100" /></a>
  <a target="_blank" href="https://www.typescriptlang.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="TypeScript" width="100" /></a>
  <a target="_blank" href="https://exoplanetarchive.ipac.caltech.edu/"><img src="https://www.ipac.caltech.edu/system/activities/logos/24/small/nea_logo.png" alt="NASA Exoplanet Archive" width="150" /></a>
  <a target="_blank" href="https://www.postman.com/"><img src="https://res.cloudinary.com/postman/image/upload/t_team_logo/v1629869194/team/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8" alt="Postman" width="100" /></a>
  <a target="_blank" href="https://inkscape.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Inkscape_Logo.svg/2048px-Inkscape_Logo.svg.png" alt="Inkscape" width="100" /></a>
  <a target="_blank" href="https://m3.material.io/"><img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/material-design/material-design.png" alt="Material Design" width="100" /></a>
  <a target="_blank" href="https://aladin.cds.unistra.fr/"><img src="https://rcsed2.voxastro.org/logos/aladin.png" alt="Aladin Sky Atlas" width="175" /></a>
    <a href="https://www.adobe.com/products/photoshop.html"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/640px-Adobe_Photoshop_CC_icon.svg.png" alt="Photoshop" width="100" /></a>
</p>

<p align="center">
  <a href="https://github.com/jarvisar/senior-design/tree/main/tools"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" alt="Python" width="100" /></a>
  <a href="https://github.com/jarvisar/cors-proxy"><img src="https://i.imgur.com/ahIOnQp.png" alt="CORS Proxy" width="160" /></a>
  <a href="https://vercel.com/"><img src="https://static.wikia.nocookie.net/logopedia/images/a/a7/Vercel_favicon.svg/revision/latest/scale-to-width-down/250?cb=20221026155821" alt="Vercel" width="100" /></a>
    <a href="https://expressjs.com/"><img src="https://i.imgur.com/jv2R3CP.png" alt="Express.js" width="125" /></a>
	    <a target="_blank" href="https://developer.chrome.com/docs/devtools/"><img src="https://static-00.iconduck.com/assets.00/chrome-devtools-icon-512x512-8iaxdppx.png" alt="Chome DevTools" width="100" /></a>
</p>
