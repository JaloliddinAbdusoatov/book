# Build stage
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Copy gradle wrapper and config
COPY gradlew gradlew.bat settings.gradle.kts build.gradle.kts ./
COPY gradle gradle

# Grant execution rights and download dependencies (cache)
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon || true

# Copy source code and build jar
COPY src src
RUN ./gradlew bootJar --no-daemon -x test

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S bookstore && adduser -S bookstore -G bookstore
USER bookstore

# Copy built artifact
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
