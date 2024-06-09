# GitToText-Frontend

[![GitHub issues](https://img.shields.io/github/issues/bfuerholz/GitToText-Frontend)](https://github.com/bfuerholz/GitToText-Frontend/issues)
[![GitHub forks](https://img.shields.io/github/forks/bfuerholz/GitToText-Frontend)](https://github.com/bfuerholz/GitToText-Frontend/network)
[![GitHub stars](https://img.shields.io/github/stars/bfuerholz/GitToText-Frontend)](https://github.com/bfuerholz/GitToText-Frontend/stargazers)
[![GitHub license](https://img.shields.io/github/license/bfuerholz/GitToText-Frontend)](https://github.com/bfuerholz/GitToText-Frontend/blob/main/LICENSE)

GitToText-Frontend is a React-based frontend application for the GitToText project. It provides a user-friendly interface to interact with the backend and fetch repository data in text format.

## Features

- **GitHub Repository URL Input**: Enter the URL of the GitHub repository you want to fetch files from.
- **File Types Selection**: Specify the types of files you want to include.
- **Dark Mode**: Toggle between light and dark themes.
- **Output Display and Copy**: View and copy the fetched repository content.

## How to Use

- Visit the live application URL.
- Enter the GitHub repository URL.
- Select the file types you want to include.
- Click on the fetch button to retrieve and display the content.

## Deployment

The frontend is deployed on Vercel. The backend URL in the `App.js` file is set to the deployed backend URL on Vercel.

For detailed deployment steps, refer to the Vercel documentation.

## Screenshots

![Main Interface](screenshots/screenshot1.png)
![Dark Mode](screenshots/screenshot2.png)

## TODOs

1. **Optimize Performance**: 
    - Implement code splitting and lazy loading for components to improve performance.
    - Use a state management library like Redux to handle state more efficiently.
    - Optimize image and asset loading by using a CDN.

2. **Improve Error Handling**:
    - Enhance error messages to provide more detailed information to the user.
    - Implement retries for network requests to handle transient errors.
    - Add a global error boundary to catch and display errors gracefully.

3. **Enhance User Experience**:
    - Improve the design and layout for better user experience.
    - Add animations and transitions for smoother interactions.
    - Implement accessibility improvements to make the app usable for all users.

4. **Add Unit and Integration Tests**:
    - Use testing libraries like Jest and React Testing Library to write unit and integration tests.
    - Ensure that all critical paths in the application are covered by tests.

5. **Implement Internationalization (i18n)**:
    - Add support for multiple languages.
    - Use a library like `react-i18next` to manage translations.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
