# x1, y1, z1 are coordinates for racket 1 and xr1, yr1, zr1 is rotation angle for racket1.
#similarly for racket 2

import time
x1=300
y1=450
z1=-200
xr1=90
yr1=0
zr1=0
x2=800
y2=450
z2=-200
xr2=90
yr2=0
zr2=0
while True:
	f = open('data.xml','w')
	
	xr1 = xr1+5
	xr2 = xr2 +5
	f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
	f.write('<note>\n')
	f.write('<x1>'+str(x1)+'</x1>\n')
	f.write('<y1>'+str(y1)+'</y1>\n')
	f.write('<z1>'+str(z1)+'</z1>\n')
	f.write('<xr1>'+str(xr1)+'</xr1>\n')
	f.write('<yr1>'+str(yr1)+'</yr1>\n')
	f.write('<zr1>'+str(zr1)+'</zr1>\n')
	f.write('<x2>'+str(x2)+'</x2>\n')
	f.write('<y2>'+str(y2)+'</y2>\n')
	f.write('<z2>'+str(z2)+'</z2>\n')
	f.write('<xr2>'+str(xr2)+'</xr2>\n')
	f.write('<yr2>'+str(yr2)+'</yr2>\n')
	f.write('<zr2>'+str(zr2)+'</zr2>\n')
	f.write('<xpos>0</xpos>\n')
	f.write('<ypos>0</ypos>\n')
	f.write('<zpos>0</zpos>\n')
	f.write('</note>\n')
	time.sleep(0.04)
