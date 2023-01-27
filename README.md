<p align="center">
    <img src="https://github.com/jarvisar/senior-design/blob/master/src/assets/icon.png" width="200px" style="float: left; margin-right: 10px;"/>
    Search for exoplanets using data from NASA's Exoplanet Archive...
</p>

# Exoplanet Archive Search

 Search for exoplanets using data from NASA's Exoplanet Archive
      
 ### Initiating a Search
 
 To search NASA's exoplanet database, select a valid query using four available drop-down boxes. 
      Each drop-down box allows for specific information to be entered, such as the hostname of a star, the discovery 
      method used, and the discovery year and facility. To learn more about each option, refer to the input help section. 
      Once a query has been entered, click the search button to retrieve data from NASA's database. Note that large searches
      can take up to 20 seconds to process. Some example large searches include exoplanets discovered using transit, exoplanets 
      discovered in 2014 and 2016, and exoplanets first observed by Kepler.
      
 ### Understanding the Input
 
 When searching, the input options allow for specific information to be entered. Here's what each option represents:
 
 * Hostname refers to the name of the star an exoplanet orbits
 * Discovery method refers to how the exoplanet was first discovered
 * Discovery year refers to the year the exoplanet was first found
 * Discovery facility refers to the facility or observatory that first discovered the exoplanet

### Receiving Results

All data is pulled directly from [NASA's Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars) operated by the California Institute of Technology. After submitting a search, the results will be displayed in a table format. Additionally, a download button will appear, allowing the results to be exported to a CSV file on the local disk. 
        To sort the data, click on a column header to toggle between descending and ascending order. 
        By clicking on an individual exoplanet's row, specific data about that exoplanet can be viewed such as its position 
        in the sky and other additional resources. Clicking on a card's title will search for exoplanets with similar data.
        
### Understanding the Results

The results returned from the search will include columns with information such as the exoplanet's name, host name, discovery method, discovery year, discovery facility, and academic reference.

* The orbital period column is the time (in days) for the exoplanet to orbit host star
* The radius column is measured in units of radius of the Earth (ER)
* The mass column is measured in units of mass of the Earth (EM)

For example, an exoplanet with a radius of 0.5 ER has half the radius of the Earth and an exoplanet with 0.5 EM has half the mass of the Earth. For reference, the Earth's radius is 6,371km and 
      it's mass is 5.972 x 10<sup>24</sup> kg.

## FAQ

#### What is an exoplanet?

Exoplanets, or extrasolar planets, are planets that orbit stars outside of our solar system.

#### How often is the data updated?

The list of planets is routinely updated bi-weekly, but may be updated more frequently depending on new significant exoplanet discoveries.

#### Why are there no results show up after searching?

Either no exoplanets match the given input or data was not returned properly. Try searching again or changing the input.

#### How is data accessed from NASA's Exoplanet Archive?

This web application utilizes Table Access Protocol (TAP) to request and return data from the Exoplanet Archive. TAP is a protocol developed by IVOA that allows access and querying of table data on remote servers, primarily for astronomical data.

###### Hint: entering the Konami code will show secret exoplanets!
