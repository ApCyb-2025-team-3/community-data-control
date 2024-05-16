FROM openjdk:17-jdk-alpine as build
WORKDIR /usr/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN ./mvnw package -DskipTests

COPY ./target/*.jar /app/jars/