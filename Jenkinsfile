pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        BUILD_DIR = 'frontend/build'
        NGINX_HTML_DIR = 'C:/nginx-1.26.3/html'
        BACKEND_PORT = '5000'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/MalithaChamikara/Currency-Converter.git', branch: 'main'
            }
        }

        stage('Install and Build Frontend') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Install Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Deploy Frontend to NGINX') {
            steps {
                bat 'xcopy /E /I /Y "frontend\\build\\*" "C:\\nginx-1.26.3\\html\\"'

            }
        }

        stage('Start Backend') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    bat 'pm2 delete all || echo "No existing process"'
                    bat 'pm2 start server.js --name mern-backend'
                }
            }
        }
    }
}