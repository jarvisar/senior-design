import sys

if len(sys.argv) != 7:
    print("Incorrect number of arguments. Usage: sexagesimal_to_decimal.py RA_hours RA_minutes RA_seconds Dec_degrees Dec_minutes Dec_seconds")
    sys.exit(1)

ra_h = float(sys.argv[1])
ra_m = float(sys.argv[2])
ra_s = float(sys.argv[3])
dec_d = float(sys.argv[4])
dec_m = float(sys.argv[5])
dec_s = float(sys.argv[6])

ra = 15*(ra_h + (ra_m / 60) + (ra_s / 3600))
dec = dec_d + (dec_m / 60) + (dec_s / 3600) if dec_d >= 0 else dec_d - (dec_m / 60) - (dec_s / 3600)

print("'{:.6f}', '{:.6f}'".format(ra, dec))
