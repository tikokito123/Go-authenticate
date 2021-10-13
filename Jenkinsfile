pipeline{
    agent any

    stages {

        stage("build") {
            steps {
                echo "building stage"
                sh docker build -t go_auth . --file Dockerfile
            }
        }
    }
}