pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        GITHUB_CREDENTIALS = credentials('github-creds')
        APP_NAME = 'nextgen-ai'
        IMAGE_REPO = "syed048/${APP_NAME}"
        BACKEND_ENV_SECRET = credentials('nextgen-backend-env')
    }
    
    stages{
        stage('Checkout') {
            steps{
                git(
                    url: 'https://github.com/abrarsyedd/nextgen-ai.git',
                    credentialsId: "github-creds"
                )
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_REPO}:backend-${BUILD_NUMBER} -t ${IMAGE_REPO}:backend-latest ./backend"
                    sh "docker build -t ${IMAGE_REPO}:frontend-${BUILD_NUMBER} -t ${IMAGE_REPO}:frontend-latest ./frontend"
                    sh "docker build -t ${IMAGE_REPO}:db-${BUILD_NUMBER} -t ${IMAGE_REPO}:db-latest -f ./db/Dockerfile-db ./db"
            }
        }
    }

        stage('Push to DockerHub') {
            steps {
                script {
                    sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    sh "docker push ${IMAGE_REPO}:backend-${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_REPO}:frontend-${BUILD_NUMBER}"

                    sh "docker push ${IMAGE_REPO}:backend-latest"
                    sh "docker push ${IMAGE_REPO}:frontend-latest"

                    sh "docker push ${IMAGE_REPO}:db-${BUILD_NUMBER}"
                    sh "docker push ${IMAGE_REPO}:db-latest"
            }
        }
    }

        stage('Deploy') {
            steps {
                script {
                    sh 'cp $BACKEND_ENV_SECRET backend/.env'
                    sh "docker compose down --remove-orphans"
                    sh "docker compose -p nextgen-ai pull"
                    sh "docker compose -p nextgen-ai up -d"
                }
            }
        }
    }

    post {
        always {
            sh 'rm -f backend/.env'
            echo 'Pipeline Finished'
        }
    }
}