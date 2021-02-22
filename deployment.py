f = open("deployment.config", "r")
target = int(f.read())
f.close()

import subprocess
import sys

if target == 0:
    folder_client = '../client_0'
else:
    folder_client = '../client_1'


npm_install_client = subprocess.Popen(['sudo', 'npm', 'install'],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = npm_install_client.communicate()

if stderr:
    print("Error while client npm_install")
    sys.exit(0)
else:
    print("Client Node modules installed")

build = subprocess.Popen(['sudo', 'npm', 'run', 'build'],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = build.communicate()

if stderr:
    print("Error while building client project")
    sys.exit(0)
else:
    print("Client Build successful")

clean = subprocess.Popen(['rm', '-rf', folder_client],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = clean.communicate()

if stderr:
    print("Error while removing folder")
    sys.exit(0)
else:
    print("Client Folder removed")

make_dir = subprocess.Popen(['mkdir', folder_client],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = make_dir.communicate()

if stderr:
    print("Error while creating folder")
    sys.exit(0)
else:
    print("Client Folder created")

copy_nuxt = subprocess.Popen(['cp', '-R', '.nuxt' , folder_client],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = copy_nuxt.communicate()

if stderr:
    print("Error while copying client nuxt")
    sys.exit(0)
else:
    print("Client Nuxt copied")


copy_static = subprocess.Popen(['cp', '-R', 'static' , folder_client],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = copy_static.communicate()

if stderr:
    print("Error while copying client static")
    sys.exit(0)
else:
    print("Client Static copied")

copy_package = subprocess.Popen(['cp', 'package.json' , folder_client],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = copy_package.communicate()

if stderr:
    print("Error while copying client package.json")
    sys.exit(0)
else:
    print("Client Package.json copied")


copy_nuxt_config = subprocess.Popen(['cp', 'nuxt.config.js' , folder_client],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = copy_nuxt_config.communicate()

if stderr:
    print("Error while copying client nuxt.config.js")
    sys.exit(0)
else:
    print("Client Nuxt config copied")

copy_node = subprocess.Popen(['cp', '-R', 'node_modules' , folder_client],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT)

stdout,stderr = copy_node.communicate()

if stderr:
    print("Error while copying client node_modules")
    sys.exit(0)
else:
    print("Client Node modules copied")


if target == 0:
    stop_client = subprocess.Popen(['pm2', 'stop', 'client_1'],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT)

    stdout,stderr = stop_client.communicate()

    if stderr:
        print("Error stopping the client")
        sys.exit(0)
    else:
        print("Stopping the client successful")


    start_client = subprocess.Popen(['pm2', 'start', 'client_0'],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT)

    stdout,stderr = start_client.communicate()

    if stderr:
        print("Error starting the client")
        sys.exit(0)
    else:
        print("Starting the client successful")

    f = open("deployment.config", "w")
    f.write("1")
    f.close()

else:
    stop_client = subprocess.Popen(['pm2', 'stop', 'client_0'],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT)

    stdout,stderr = stop_client.communicate()

    if stderr:
        print("Error stopping the client")
        sys.exit(0)
    else:
        print("Stopping the client successful")


    start_client = subprocess.Popen(['pm2', 'start', 'client_1'],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT)

    stdout,stderr = start_client.communicate()

    if stderr:
        print("Error starting the client")
        sys.exit(0)
    else:
        print("Starting the client successful")

    f = open("deployment.config", "w")
    f.write("0")
    f.close()
