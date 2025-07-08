# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/target/ngo-backend-0.0.1-SNAPSHOT.jar ngo-backend-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENV DATASOURCE_URL=jdbc:mysql://localhost:3306/streetlife
ENV DATASOURCE_USERNAME=root

ENV FRONTEND_URL=http://localhost:3000

ENTRYPOINT ["java", "-jar", "ngo-backend-0.0.1-SNAPSHOT.jar"]
