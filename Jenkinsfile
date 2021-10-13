pipeline{
    agent any

    stages {

        stage("build") {
            steps {
                sh """
                docker build -t go_auth . --file Dockerfile
                """
            }
        }
    }
}