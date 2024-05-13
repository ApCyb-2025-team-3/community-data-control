if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Start-Process PowerShell -Verb RunAs "-NoProfile -ExecutionPolicy Bypass -Command `"cd '$pwd'; & '$PSCommandPath';`"";
    exit;
}

cd ../web/cdc
docker build -t data-control-app-frontend:latest ./
minikube image load data-control-app-frontend:latest --daemon

cd ../..
docker build -t data-control-app-base:latest ./

# cd commons
# docker build -t data-control-app-commons:latest ./

cd event-service
docker build -t data-control-app-event-service:latest ./
minikube image load data-control-app-event-service:latest --daemon

cd ../user-service
docker build -t data-control-app-user-service:latest ./
minikube image load data-control-app-user-service:latest --daemon

echo "All images built!"
Read-Host -Prompt "Press any key to continue"