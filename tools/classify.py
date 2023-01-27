import sys

def classify_exoplanet(radius, temperature, density):
    if radius > 10 and density < 0.1:
        return "Gas Giant"
    elif radius > 4 and radius < 10 and density < 0.1:
        return "Neptune-like"
    elif radius > 1.5 and radius < 2 and density > 5:
        return "Super-Earth"
    elif radius < 1.5 and density > 5:
        return "Terrestrial"
    else:
        return "Unclassified"

if __name__ == "__main__":
    # Get command line arguments
    radius = float(sys.argv[1])
    temperature = float(sys.argv[2])
    density = float(sys.argv[3])

    # Call the classify_exoplanet function
    classification = classify_exoplanet(radius, temperature, density)

    # Print the classification
    print(classification)