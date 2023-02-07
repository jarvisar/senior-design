import sys
import math

def toRadians(degrees):
    return degrees * math.pi / 180

if __name__ == '__main__':
    exoplanet_ra = float(sys.argv[1])
    exoplanet_dec = float(sys.argv[2])

	angular_distance_degrees = 10

    planet_dec_rad = toRadians(exoplanet_dec)

    north_corner_dec = exoplanet_dec + angular_distance_degrees
    south_corner_dec = exoplanet_dec - angular_distance_degrees
    east_corner_ra = exoplanet_ra + angular_distance_degrees / math.cos(planet_dec_rad)
    west_corner_ra = exoplanet_ra - angular_distance_degrees / math.cos(planet_dec_rad)

    print("North corner Dec:", north_corner_dec)
    print("South corner Dec:", south_corner_dec)
    print("East corner RA:", east_corner_ra)
    print("West corner RA:", west_corner_ra)
