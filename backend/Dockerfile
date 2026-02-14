# backend/Dockerfile

# Stage 1: Build
FROM maven:3.9.3-eclipse-temurin-20 AS build
WORKDIR /app
COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:20-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
