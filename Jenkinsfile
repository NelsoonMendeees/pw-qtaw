pipeline {
    agent any

    stages {
        stage('Node Dependenciess') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
