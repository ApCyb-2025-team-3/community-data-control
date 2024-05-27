FROM data-control-app-base:latest as build
WORKDIR /usr/app/group-service

ARG VERSION=0.0.2-SNAPSHOT
RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../groupservice-${VERSION}.jar)

FROM openjdk:17-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/usr/app/group-service/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
EXPOSE 5003
ENTRYPOINT ["java","-cp","app:app/lib/*","edu.spbu.datacontrol.groupservice.GroupServiceApplication"]