**Step 0: Clean up existing container (if any previous is running)**

&nbsp;   docker stop myubuntu

&nbsp;   docker rm myubuntu

&nbsp;   Old container removed to start from scratch.

**Step 1: Start a fresh Ubuntu container and enter bash**

&nbsp;   docker run -it --name myubuntu ubuntu bash

&nbsp;   Entered Ubuntu container shell.

**Step 2: Work inside the container**

&nbsp;   apt update

&nbsp;   apt install -y curl vim

&nbsp;   echo "This file is created inside the container" > /tmp/test.txt

&nbsp;   cat /tmp/test.txt

**Step 3: Exit and restart the same container**

&nbsp;   exit

&nbsp;   docker stop myubuntu

&nbsp;   docker start myubuntu

&nbsp;   docker exec -it myubuntu bash

**Step 4: Check file after restart**

&nbsp;   cat /tmp/test.txt

&nbsp;   Result: File is still present (can see in documentation)

**Step 5: Exit, delete, and recreate the container**

&nbsp;   exit

&nbsp;   docker rm myubuntu

&nbsp;   docker run -it --name myubuntu ubuntu bash

**Step 6: Check file after recreation**

&nbsp;   cat /tmp/test.txt

&nbsp;   Result: File is not found (can see in documentation)



