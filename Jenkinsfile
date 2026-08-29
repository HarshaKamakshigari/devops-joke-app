pipeline {

    agent any

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
                    docker build -t devops-backend:latest ./backend
                    docker build -t devops-frontend:latest ./frontend
                '''
            }
        }

    }

    post {
        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'CI pipeline failed!'
        }
    }
}