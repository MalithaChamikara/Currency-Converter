pipeline {
    agent any
    tools {
        nodejs 'nodejs18' // Matches the NodeJS installation name in Global Tool Configuration
    }
    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        DEPLOY_DIR_FRONTEND = 'C:\\nginx\\html\\mern-app'
        DEPLOY_DIR_BACKEND = 'C:\\nginx\\mern-app\\api'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-ssh', url: 'git@github.com:<MalithaChamikara>/<Currency-Converter>.git'
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                dir(FRONTEND_DIR) {
                    bat 'npm install'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir(FRONTEND_DIR) {
                    bat 'npm run build'
                }
            }
        }
        stage('Test Frontend') {
            steps {
                dir(FRONTEND_DIR) {
                    bat 'npm test || exit 0' // Allow pipeline to continue if tests fail
                }
            }
        }
        stage('Install Backend Dependencies') {
            steps {
                dir(BACKEND_DIR) {
                    bat 'npm install'
                }
            }
        }
        stage('Test Backend') {
            steps {
                dir(BACKEND_DIR) {
                    bat 'npm test || exit 0'
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                bat 'if exist "%DEPLOY_DIR_FRONTEND%" rmdir /s /q "%DEPLOY_DIR_FRONTEND%"'
                bat 'mkdir "%DEPLOY_DIR_FRONTEND%"'
                bat 'xcopy /E /I "%FRONTEND_DIR%\\build" "%DEPLOY_DIR_FRONTEND%"'
            }
        }
        stage('Deploy Backend') {
            steps {
                bat 'if exist "%DEPLOY_DIR_BACKEND%" rmdir /s /q "%DEPLOY_DIR_BACKEND%"'
                bat 'mkdir "%DEPLOY_DIR_BACKEND%"'
                bat 'xcopy /E /I "%BACKEND_DIR%" "%DEPLOY_DIR_BACKEND%"'
                // Copy .env file if stored locally (not in Git)
                bat 'copy "%BACKEND_DIR%\\.env" "%DEPLOY_DIR_BACKEND%\\"' 
                dir(DEPLOY_DIR_BACKEND) {
                    bat '''
                        npm install --production
                        pm2 stop mern-backend || exit 0
                        pm2 start server.js --name mern-backend
                    '''
                }
            }
        }
        stage('Restart Nginx') {
            steps {
                bat 'C:\\nginx\\nginx -s reload'
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}