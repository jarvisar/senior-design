<br>
<p align="center">
  <img src="https://github.com/jarvisar/senior-design/blob/master/src/assets/reflection_card.png"/>
</p>

Search for exoplanets using data from [NASA's Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars)!

This web app was built using [Angular 14](https://angular.io/) and is a Progressive Web App (PWA) that can be installed on most devices like a regular app. To install, visit the [latest deployment](https://jarvisar.github.io/senior-design/) on a device with a modern browser and look for the "install" button in the browser's menu or address bar.
  
 All of the required documentation for CS5001/2 can be found in the [main](https://github.com/jarvisar/senior-design/tree/main) branch.
  
 ## How to Use
 
 Visit the [GitHub Pages](https://jarvisar.github.io/senior-design) site to access the latest deployment.
      
 #### Initiating a Search
 
 To search NASA's exoplanet database, enter a valid query using the available inputs. 
      Each input allows for specific information to be entered, such as the name of a host star, the discovery 
      method used, and the discovery year and facility. To learn more about each option, refer to the input help section. 
      
Once a query has been entered, click the search button to retrieve data from NASA's database. Note that large searches
      can take up to 15 seconds to process before exoplanet data has been cached. Some example large searches include exoplanets discovered using transit, exoplanets 
      discovered in 2014 and 2016, and exoplanets first observed by the [Kepler space telescope](https://www.nasa.gov/mission_pages/kepler/overview/index.html).
      
 #### Understanding the Input
 
When searching, the input options allow for specific information to be entered. Here's what each option represents:
 
 * Host name refers to the name of the star the exoplanet orbits
 * Discovery method refers to how the exoplanet was first discovered
 * Discovery year refers to the year the exoplanet was first found
 * Discovery facility refers to the facility or observatory that first discovered the exoplanet
 
Selecting the checkbox next to the help button will display additional inputs:
  
  * Min Mass and Max Mass refer to the minimum and maximum allowed planet mass in units of Earth's mass (EM)
  * Min Radius and Max Radius refer to the minimum and maximum allowed planet radius in units of Earth's Radius (ER)
  * Min Density and Max Density refer to the minimum and maximum allowed planet density in g/cm<sup>3</sup>
  * Star Type refers to the stellar classification of the host star
  * \# of Stars and \# of Planets refers to the number of stars and planets in the host system respectively
  * Selecting the controversial checkbox will filter controversial exoplanets

#### Receiving Results

After submitting a search, the results are displayed in a table format with five additional buttons for enhanced functionality. Configure the table columns with the column configuration button, revisit previous searches with the previous search button, copy the search parameters to the clipboard with the copy button, close all currently expanded rows, and export the data as a CSV file to the local disk.

Sort the exoplanet data by clicking on a column header and switch between descending and ascending order. In-depth information about a specific exoplanet is available by clicking on its row, such as planet type, orbit information, and its position in the sky. Searchable terms within the expanded row are highlighted in cyan and can search for similar exoplanets by clicking on them.
        
#### Understanding the Results

The results returned from the search will include columns with information such as the exoplanet's name, host name, discovery method, discovery year, discovery facility, and academic reference.

  * The density column is measured in g/cm<sup>3</sup>
  * The radius column is measured in either units of radius of the Earth (Re) or Jupiter (Rj)
  * The mass column is measured in either units of mass of the Earth (Me) or Jupiter (Mj)
  * Orbital period is measured in days; refers to how long it takes for exoplanet to fully orbit its host star
  * Semi-major axis is measured in astronomical units (AU); refers to distance between planet and host star

For example, an exoplanet with a radius of 0.5 ER and a mass of 2 EM has half the radius and twice the mass of the Earth. For reference, the Earth's radius is 6,371km, its mass is 5.972 x 10<sup>24</sup> kg, and its density is 5.5 g/cm<sup>3</sup>. Jupiter's radius is 71,492km and its mass is 1.899 x 10<sup>27</sup> kg. The Earth's orbital period is 365.25 days, and its distance from the Sun is exactly 1 AU.

## Local Installation
  
These instructions will help get a copy of the web app up and running on a local machine.

#### Prerequisites
Node.js and npm are required for this web app to run. They can downloaded from the [official website](https://nodejs.org/en/) or can be installed with a package manager like [Homebrew](https://brew.sh/) (for macOS) or [Chocolatey](https://chocolatey.org/) (for Windows).

#### Installation
1. Clone or download the `master` branch of this repository.
2. Open a terminal and navigate to the /senior-design/ directory.
3. Run `npm install` to install the required dependencies.
4. Run `npm install -g @angular/cli` to install Angular CLI.

#### Running the Web Application

Run the following command to start the proxy server:

` ng serve `

The development server will start on port 4200 by default:

` http://localhost:4200 `

#### Query Parameter Support

The web app also supports query parameters using exoplanet archive column names. For example, if the query is `localhost:4200/?disc_year=2011`, it automatically searches for exoplanets discovered in 2011.

Current column definitions can be found in the [Exoplanet Archive docs](https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html).

## FAQ

#### What is an exoplanet?

Exoplanets, or [extrasolar planets](https://exoplanets.nasa.gov/what-is-an-exoplanet/overview/), are planets that orbit stars outside of our solar system.

#### How often is the data updated?

The list of planets on [IPAC's website](https://www.ipac.caltech.edu/) is routinely updated bi-weekly, but may be updated more frequently depending on new significant exoplanet discoveries.
  
Exoplanet data is cached in the background to significantly decrease load times. Cached data is updated every other day. Clear cache to manually refresh the data.

#### Why are there no results after searching?

Either no exoplanets match the given input or data was not returned properly. Try searching again or changing the input.

#### How is data accessed from NASA's Exoplanet Archive?

This web application utilizes Table Access Protocol ([TAP](https://www.ivoa.net/documents/TAP/)) to request and return data from the Exoplanet Archive. TAP is a protocol developed by IVOA that allows access and querying of table data on remote servers, including astronomical data. This web application also uses my CORS-Proxy, which can be found [here](https://github.com/jarvisar/cors-proxy).


###### Hint: entering the Konami code will show secret exoplanets!

If you found this project interesting, also be sure to check out my [Out of this World](http://jarvisar.github.io/datavis-project1) project for CS5124 and my PyTorch [Exoplanet Classifier](https://github.com/jarvisar/exoplanet-classifier), both of which use the same exoplanet data. 

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
  <a href="https://www.python.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" alt="Python" width="100" /></a>
   <a href="https://expressjs.com/"><img src="https://i.imgur.com/u5SJAj4.png" alt="Express.js" width="125" /></a>
  <a href="https://github.com/jarvisar/cors-proxy"><img src="https://i.imgur.com/ahIOnQp.png" alt="CORS Proxy" width="160" /></a>
  <a href="https://vercel.com/"><img src="https://static.wikia.nocookie.net/logopedia/images/a/a7/Vercel_favicon.svg/revision/latest/scale-to-width-down/250?cb=20221026155821" alt="Vercel" width="100" /></a>
</p>



