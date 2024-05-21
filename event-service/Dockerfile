FROM data-control-app-base:latest as build
WORKDIR /usr/app/event-service

ARG VERSION=0.0.2-SNAPSHOT
RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../eventservice-${VERSION}-exec.jar)

FROM openjdk:17-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/usr/app/event-service/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
EXPOSE 5001
ENTRYPOINT ["java","-cp","app:app/lib/*","edu.spbu.datacontrol.eventservice.EventServiceApplication"]