
MK_DIR=../33-webapp
SRC_DIR=.
include ${MK_DIR}/header.mk

all : app.ico app.png

clean :
	rm -f app.ico app.png

include ${MK_DIR}/rules.mk

