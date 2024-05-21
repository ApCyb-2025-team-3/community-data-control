FROM openjdk:17-jdk-alpine
WORKDIR /usr/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY commons commons
COPY event-service event-service
COPY user-service user-service
COPY group-service group-service

RUN ./mvnw install -DskipTests