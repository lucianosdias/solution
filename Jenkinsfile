pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr:'10'))
        timeout(time: 10, unit: 'MINUTES')
        ansiColor('xterm')
    }

    tools {
        nodejs '16.18.0'
    }


    stages {
        stage('Teste Node 16.18.0') {
            steps {
                sh 'npm -v'
            }
        }
        stage('Buscar commits em develop') {
            steps {
                sh 'npm -v'
                // executar consulta historica dos commits em develop
                // buscar por ticket especifico (ou outra coisa*)
                // gerar arquivo de exportação (XPZ)
            }
        }
        stage('Rodar MSBuild Export') {
            steps {
                sh 'npm -v'
                // com arquivo build gerar o XPZ a partir da escolha dos objetos q estão na branch develop
            }
        }
        stage('Carregar KB Base') {
            steps {
                sh 'npm -v'
            }
        }
        stage('Importar XPZ na KB Base') {
            steps {
                sh 'npm -v'
                // rodar msbuild para importação
            }
        }
        stage('Buildar KB atualizada usando Docker') {
            steps {
                sh 'npm -v'
                // rodar msbuild para importação
            }
        }
    }
}
