<p align="center">
	<img src="https://github.com/jarvisar/senior-design/blob/master/src/favicon.ico" width="200px"/>
</p>

## NASA Exoplanet Archive Search

This branch of the repository contains the source code for the site built with Angular. 
The [main branch](https://github.com/jarvisar/senior-design) contains all the required documentation.

To visit the latest deployment, visit the [GitHub Pages](http://jarvisar.github.io/senior-design) site.

#### What is an Exoplanet?

An exoplanet, also known as an extrasolar planet, is a planet that orbits a star (or stars) outside of our solar system. 
      These planets are detected using a variety of methods, such as radial velocity, transit, and direct imaging. 
      The study of exoplanets is a rapidly growing field in astronomy and has led to the discovery of thousands of planets 
      orbiting stars in our galaxy. The discovery of exoplanets has also led to the possibility of finding potentially 
      habitable planets and the search for extraterrestrial life. [NASA](https://exoplanets.nasa.gov/what-is-an-exoplanet/overview/)
      
 #### Initiating a Search
 
 To search NASA's exoplanet database, select a valid query using one of the four available drop-down boxes. 
      Each drop-down box allows for specific information to be entered, such as the hostname of a star, the discovery 
      method used, and the discovery year and facility. To learn more about each option, refer to the input help section. 
      Once a query has been entered, click the search button to retrieve data from NASA's database. Note that large searches
      can take up to 20 seconds to process. Some example large searches include exoplanets discovered using transit, exoplanets 
      discovered in 2014 and 2016, and exoplanets first observed by Kepler.
      
 #### Understanding the Input
 
 When searching, the input options allow for specific information to be entered. Here's what each option represents:
 
 * Hostname refers to the name of the star an exoplanet orbits
 * Discovery method refers to how the exoplanet was first discovered
 * Discovery year refers to the year the exoplanet was first found
 * Discovery facility refers to the facility or observatory that first discovered the exoplanet

#### Receiving Results

All data is pulled directly from [NASA's Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars) operated by the California Institute of Technology. After submitting a search, the results will be displayed in a table format. Additionally, a download button will appear, allowing the results to be exported to a CSV file on the local disk. 
        To sort the data, click on a column header to toggle between descending and ascending order. 
        By clicking on an individual exoplanet's row, specific data about that exoplanet can be viewed such as its position 
        in the sky and other additional resources. Clicking on a card's title will search for exoplanets with similar data.
        
#### Understanding the Results

The results returned from the search will include columns with information such as the exoplanet's name, host name, discovery method, discovery year, discovery facility, and academic reference.

* The orbital period column is the time (in days) for exoplanet to orbit host star
* The radius column is measured in units of radius of the Earth (ER)
* The mass column is measured in units of mass of the Earth (EM)

For example, an exoplanet with a radius of 0.5 ER has half the radius of the Earth and an exoplanet with 0.5 EM has half the mass of the Earth. For reference, the Earth's radius is 6,371km and 
      it's mass is 5.972 x 10<sup>24</sup> kg.
      
#### Development

This web application was developed using Angular for a senior design project. 
###### Hint: entering the Konami code will show secret exoplanets!
