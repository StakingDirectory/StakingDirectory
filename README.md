# Staking Directory

A community-maintained directory of Ethereum staking providers.

For any questions or comments please contact [@EridianAlpha](https://github.com/EridianAlpha) on [Twitter](https://twitter.com/EridianAlpha) or [Telegram](https://t.me/EridianAlpha).

# Project Development Guide

Here, you will find detailed instructions on how to set up your development environment and begin contributing to the project.

## Prerequisites

Before we begin, please ensure that you have the following software installed on your system:

1. [Node.js](https://nodejs.org/)
2. [Yarn](https://yarnpkg.com/)

If you do not have these installed, please download and install them from their respective websites.

## Setting Up the Development Environment

### Step 1: Clone the Repository

Start by cloning the project repository onto your local machine using the following command:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the URL of this repository.

### Step 2: Install Project Dependencies

Once you have cloned the repository, navigate into the project's directory:

```bash
cd <project-directory>
```

Then install the required dependencies using Yarn:

```bash
yarn
```

This command reads the `package.json` file in the project's root directory and installs the necessary dependencies for the project.

### Step 3: Run the Development Server

To start the development server, use the following command:

```bash
yarn dev
```

This will start the server, and the project will be available at `http://localhost:3000`.

### Step 4: Build the Project

If you want to create a production-ready build of the project, run:

```bash
yarn build
```

This will create an optimized build of your project.

### Step 5: Start Local Production Build

If you want to serve the production build locally to test it, you can use:

```bash
yarn start
```

This command will start the project using the optimized production build.

That's it! You should now have a functioning development environment for Staking Directory. Happy coding!

## License

[MIT](https://choosealicense.com/licenses/mit/)
