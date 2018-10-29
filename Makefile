#                                 __                 __
#    __  ______  ____ ___  ____ _/ /____  ____  ____/ /
#   / / / / __ \/ __ `__ \/ __ `/ __/ _ \/ __ \/ __  /
#  / /_/ / /_/ / / / / / / /_/ / /_/  __/ /_/ / /_/ /
#  \__, /\____/_/ /_/ /_/\__,_/\__/\___/\____/\__,_/
# /____                     matthewdavis.io, holla!
#
include .make/Makefile.inc

NS		?= default
VERSION ?= $(shell git rev-parse HEAD)
APP     ?= k8-generator-ui
IMAGE   ?= gcr.io/matthewdavis-devops/$(APP):$(VERSION)

.PHONY: build

all: build push

build: 		; docker build -t $(IMAGE) .
run: 		; docker run -p 81:80 $(IMAGE)
push:		; docker push $(IMAGE)
test-local:	; curl -XPOST -vv -d '["{{company.companyName}} ({{internet.email}})"]' -H 'Content-type: application/json' 'http://localhost:8080/pattern?n=10&unique=true'
test-prod:	; curl -XPOST -vv -d '["{{company.companyName}} ({{internet.email}})","{{image.avatar}}"]' -H 'Content-type: application/json' 'https://api.faker.ai/pattern?n=10&unique=true'
