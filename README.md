<p align="center">
  <img src="https://github.com/jarvisar/senior-design/blob/master/src/assets/icon.png" width="200px" style="float: right; margin-left: 10px;"/>

# Exoplanet Archive Search

Search for exoplanets using data from [NASA's Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars)!

This project is built using [Angular 14](https://angular.io/) and is a Progressive Web App (PWA) that can be installed on your device like a regular app. To install, visit the website on a device with a modern browser and look for the "install" button in your browser's menu or address bar.
  
 All of the required documentation for CS5001/2 can be found on the [main](https://GitHub.com/jarvisar/senior-design) branch.
  
 ## How to Use
 
 Visit the [GitHub Pages](https://jarvisar.github.io/senior-design) site to access the latest deployment.
      
 #### Initiating a Search
 
 To search NASA's exoplanet database, enter a valid query using the available inputs. 
      Each input allows for specific information to be entered, such as the hostname of a star, the discovery 
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

All data is pulled directly from [NASA's Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars) operated by the [California Institute of Technology](https://www.ipac.caltech.edu/). After submitting a search, the results will be displayed in a table format with four additional buttons for enhanced functionality. Easily configure your columns with the column configuration button, revisit previous searches with the previous search button, quickly copy the search parameters to the clipboard with the copy button, and even export the data as a CSV file for local storage with the simple click of the download button.

Easily sort the exoplanet data by clicking on a column header, switching between descending and ascending order. In-depth information about a specific exoplanet is available by simply clicking on its row, such as planet type, orbit information, and its position in the sky. Searchable terms within the expanded row are highlighted in cyan and can search for similar exoplanets by clicking on them.
        
#### Understanding the Results

The results returned from the search will include columns with information such as the exoplanet's name, host name, discovery method, discovery year, discovery facility, and academic reference.

  * The density column is measured in g/cm<sup>3</sup>
  * The radius column is measured in units of radius of the Earth (ER)
  * The mass column is measured in units of mass of the Earth (EM)
  * Orbital period is measured in days; refers to how long it takes for exoplanet to fully orbit its host star
  * Semi-major axis is measured in astronomical units (AU); refers to distance between planet and host star

For example, an exoplanet with a radius of 0.5 ER has half the radius of the Earth and an exoplanet with 0.5 EM has half the mass of the Earth. For reference, the Earth's radius is 6,371km, its mass is 5.972 x 10<sup>24</sup> kg, and its density is 5.5 g/cm<sup>3</sup>. The Earth's orbital period is 365.25 days, and its distance from the Sun is exactly 1 AU.

## Installation
  
These instructions will help get a copy of the web app up and running on a local machine.

#### Prerequisites
Node.js and npm are required for this web app to run. They can downloaded from the [official website](https://nodejs.org/en/) or can be installed with a package manager like [Homebrew](https://brew.sh/) (for macOS) or [Chocolatey](https://chocolatey.org/) (for Windows).

#### Installation
1. Clone or download the master branch of this repository.
2. Open a terminal and navigate to the /senior-design/ directory.
3. Run `npm install` to install the required dependencies.
4. Run `npm install -g @angular/cli` to install Angular CLI

#### Running the Web Application

Run the following command to start the proxy server:

` ng serve `

The development server will start on port 4200 by default. The server is accessed at

` http://localhost:4200 `

#### Query Parameter Support

The web app also supports query parameters. For example, if the query is `localhost:4200/?disc_year=2011`, it automatically searches for exoplanets discovered in 2011.


## FAQ

#### What is an exoplanet?

Exoplanets, or [extrasolar planets](https://exoplanets.nasa.gov/what-is-an-exoplanet/overview/), are planets that orbit stars outside of our solar system.

#### How often is the data updated?

The list of planets is routinely updated bi-weekly, but may be updated more frequently depending on new significant exoplanet discoveries.

#### Why are there no results after searching?

Either no exoplanets match the given input or data was not returned properly. Try searching again or changing the input.

#### How is data accessed from NASA's Exoplanet Archive?

This web application utilizes Table Access Protocol ([TAP](https://www.ivoa.net/documents/TAP/)) to request and return data from the Exoplanet Archive. TAP is a protocol developed by IVOA that allows access and querying of table data on remote servers, including astronomical data. This web application also uses my CORS-Proxy, which can be found [here](https://github.com/jarvisar/cors-proxy).


###### Hint: entering the Konami code will show secret exoplanets!
