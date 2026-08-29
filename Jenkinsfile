pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'harshak07/devops-joke-backend'
        FRONTEND_IMAGE = 'harshak07/devops-joke-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Tests') {
            steps {
                sh '''
                    docker build -t devops-backend-test ./backend
                    docker run --rm devops-backend-test python -m pytest
                '''
            }
        }

        stage('Frontend Build') {
            steps {
                sh '''
                    docker build -t devops-frontend-test ./frontend
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    docker build -t ${BACKEND_IMAGE}:latest ./backend
                    docker build -t ${FRONTEND_IMAGE}:latest ./frontend
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin

                        docker push ${BACKEND_IMAGE}:latest
                        docker push ${FRONTEND_IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "Pulling latest images..."

                    docker pull ${BACKEND_IMAGE}:latest
                    docker pull ${FRONTEND_IMAGE}:latest

                    echo "Stopping current application..."

                    docker compose down || true

                    echo "Starting application with latest images..."

                    docker compose up -d

                    echo "Checking containers..."

                    docker compose ps

                    echo "Deployment completed successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD pipeline failed!'
        }
    }
}