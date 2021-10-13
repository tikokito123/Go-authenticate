pipeline{
    agent any

    stages {

        stage("build") {
            steps {
                echo "building docker"
                sh """
                docker build -t go_auth . --file Dockerfile
                """
            }
        }
    }
}