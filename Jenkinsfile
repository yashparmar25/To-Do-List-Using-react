pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "myapp"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/your-username/your-repo.git', branch: 'main'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Start Services') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Test (Optional)') {
            steps {
                echo 'Running Tests...'
                // Add your test commands here
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Deploying Application...'
                // Add deployment logic (e.g., push to registry, deploy to server, etc.)
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose down'
        }
    }
}
