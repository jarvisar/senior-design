export interface Exoplanet{
    pl_name?: string; // Exoplanet name
    hostname?: string; // Host name (star name)
    discoverymethod?: string; // Discovery method
    disc_year?: number; // Discovery year
    disc_facility?: string; // Discovery facility
    disc_refname?: HTMLElement; // Anchor HTML element to discovery publication
    pl_controv_flag?: number; // 1 = controversial, 0 = non-controversial
    sy_snum?: number; // Number of stars in system
    sy_pnum?: number; // Number of planets in system
    sy_mnum?: number; // Number of moons in system
    st_spectype?: string; // Spectral Type of host star
    cb_flag?: number; // Indicates if exoplanet orbits binary system: 1 = yes, 0 = no
    rastr?: number; // Right Ascension of the planetary system in sexagesimal format
    decstr?: number; // Declination of the planetary system in sexagesimal format
    ra?: number; // Right Ascension of the planetary system in decimal format
    dec?: number; // Declination of the planetary system in decimal format
    pl_orbper?: number; // Orbital period in days
    pl_rade?: number; // Planet radius in units of radius of the Earth
    pl_bmasse?: number; // Planet's Mass measured in units of masses of the Earth
    sy_dist?: number; // Distance from Earth in parsecs
}