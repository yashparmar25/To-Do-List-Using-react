pipeline {
    agent any

    environment {
        // Customize this as per your DockerHub repo if needed
        REPO_URL = 'https://github.com/yashparmar25/To-Do-List-Using-react.git'
        BRANCH = 'main'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Build and Run with Docker Compose') {
            steps {
                script {
                    // Stop any running containers
                    //sh 'docker-compose down'

                    // Build and start the container
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
