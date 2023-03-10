#!/bin/bash
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common 
curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add - 
sudo add-apt-repository \
    "deb https://apt.dockerproject.org/repo/ \
    ubuntu-$(lsb_release -cs) \
    main" 
sudo apt-get update
sudo apt-get -y install docker.io
sudo service docker start
sudo systemctl enable docker
sudo usermod -a -G docker ubuntu
sudo chmod 777 /var/run/docker.sock

# start the container to test the image 
docker run -d -p 85:3000 ananddocker18/terraform:updateversion

# references
# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html
# https://docs.docker.com/get-started/02_our_app/