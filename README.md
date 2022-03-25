# cnn-dashboard

# Installation

Please install the following packages for the required operating system before continuing.

1. [yarn](https://yarnpkg.com/): A package and project manager for Node.js applications.
2. [node](https://nodejs.org/en/): The JavaScript needed for the frontend.
3. [Python](): A recent Python 3 interpreter to run the Flask backend.

## Environment Setup

1. Clone the project

    ```python3
    git clone https://github.com/
    ```

2. Create a virtualenv in `/server` directory

    ```python3
    python3 -m venv venv
    ```

3. Activate the virtualenv

    ```python3
    source venv/bin/activate
    ```

4. Now install all the dependencies in requirements.txt using the following command:

    ```python3
    pip intsall -r requirements.txt
    ```

5. Navigate back to root and install dependencies for React app:

    ```python3
    yarn install
    ```

## Running the project locally

This command will run a temprorary local flask server on port `5000`:

```python
yarn start-server
```

To run the frontend React app on port `3000`, open a new terminal and run the following:

```python
yarn start
```
