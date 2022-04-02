# cnn-dashboard

# Installation

Please install the following packages for the required operating system before continuing.

1. [yarn](https://yarnpkg.com/): A package and project manager for Node.js applications.
2. [node](https://nodejs.org/en/): The JavaScript needed for the frontend.
3. [Python](): A recent Python 3 interpreter to run the Flask backend.

## Environment Setup

1. Clone the project

    ```python3
    git clone https://github.com/nicovandenhooff/cnn-dashboard.git
    cd cnn-dashboard
    ```

2. Create a python virtual environment in `/api` directory

    ```python3
    cd api
    python3 -m venv venv
    ```

3. Activate the virtual environment

    ```python3
    source venv/bin/activate
    ```

4. Install dependencies for Flask server:

    ```python3
    pip install -r requirements.txt
    ```

5. Navigate to the client directory and install dependencies for React app:

    ```python3
    cd ..
    cd client
    yarn install
    ```

## Running the project locally

Open two terminals, and ensure that you are in the `client` directory within both and then run the following commands:

To run a temprorary local flask server on port `5000`:

```python
yarn start-api
```

To run the frontend React app on port `3000`:

```python
yarn start
```

## Run dockerized containers

Run in project root:

```python
docker-compose up
```
