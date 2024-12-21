# React Native Project Template

This is a React Native project template built using **Expo**. It leverages Expo's managed workflow for ease of development and has been customized using the `expo prebuild` command to support native modules and configurations.

---

## Features

- **Built with Expo:** A fast and flexible development experience using Expo.
- **Supports Native Modules:** Includes a prebuild step to generate native iOS and Android code.
- **Customizable Package Name:** Easily change the app's package name for both platforms.

---

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server:**
   ```bash
   expo start
   ```

---

## Prebuild Process

This project uses Expo's `prebuild` feature to generate the native iOS and Android project files. These files are required for adding native dependencies or custom configurations.

### Steps to Use `expo prebuild`

1. Run the following command to generate native files:

   ```bash
   npx expo prebuild
   ```

2. If you need to clean the prebuild and regenerate files (e.g., to update the package name), follow these steps:

   - Update the app's name in **`package.json`**:

     ```json
     {
       "name": "YourAppName"
     }
     ```

   - Update the **`app.json`** file with the following fields:

     ```json
     {
       "expo": {
         "name": "YourAppName",
         "slug": "your-app-slug",
         "ios": {
           "bundleIdentifier": "com.yourcompany.yourapp"
         },
         "android": {
           "package": "com.yourcompany.yourapp"
         }
       }
     }
     ```

   - Run the clean prebuild command:
     ```bash
     npx expo prebuild --clean
     ```

3. **Important Notes:**

   - The `--clean` flag removes all previously generated native files and regenerates them. Any custom modifications to these files will be lost.
   - Save any scripts or custom changes before running `--clean`.

   For more details, refer to the [Expo documentation](https://docs.expo.dev/workflow/continuous-native-generation/#:~:text=Side%20effects-,npx%20expo%20prebuild).

---

## Running on Devices

- **iOS Simulator:**

  ```bash
  expo run:ios
  ```

- **Android Emulator:**
  ```bash
  expo run:android
  ```

---

## Additional Notes

- Ensure that you commit all changes to the repository before running `expo prebuild --clean` to avoid losing modifications.
- After regenerating native files, verify any required configurations or dependencies have been reapplied.

---

## Scripts

Here are some useful scripts for the project:

- **Start Development Server:**

  ```bash
  npm start
  ```

- **Run on iOS:**

  ```bash
  npm run ios
  ```

- **Run on Android:**

  ```bash
  npm run android
  ```

- **Build for Production:**
  ```bash
  expo build
  ```

---

Feel free to contribute or raise issues in the repository. Happy coding!
