#!/usr/bin/make

SHELL:=/usr/bin/bash
.DEFAULT_GOAL:=run
.ONESHELL:
.SECONDEXPANSION:

run:
	set -a; source ./.env && node $(file)
