#!/bin/bash

# Define function to stop the server gracefully
stop_server() {
    echo "Stopping the server..."
    kill $server_pid
    exit 0
}

# Trap SIGTERM signal and run stop_server function
trap 'stop_server' SIGTERM

# We use gunicorn to run Flask in production
.venv/bin/gunicorn -b 0.0.0.0:5000 -w 1 app:app &
server_pid=$!  # Save the PID of  server process

wait "$server_pid"  # Wait for server