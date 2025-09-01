pipeline {
    agent {
        docker {
            image 'neelson/playwright:v1.55.0-noble'
            args '--network pw-qatw_skynet'
        }
    }

    stages {
        stage('Node Dependenciess') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Tests') {
            steps {
                sh 'npx playwright test'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
