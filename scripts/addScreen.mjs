import fs from "fs";
import path from "path";
import inquirer from "inquirer";

// Prompt user for screen name using inquirer
async function promptUserInput() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "screenName",
      message: "Enter new Screen name: ",
      validate: (input) => {
        if (!input) {
          return "Please provide a valid screen name.";
        }
        if (input[0] !== input[0].toUpperCase()) {
          return "Screen name must start with an uppercase letter.";
        }
        return true;
      }
    }
  ]);
  return answers.screenName;
}

async function createScreen() {
  const screenName = await promptUserInput();

  if (!screenName) {
    console.error("Please provide a valid screen name.");
    process.exit(1);
  }

  const currentModuleUrl = import.meta.url;
  const currentModuleDir = path.dirname(new URL(currentModuleUrl).pathname);

  const projectRootDir = path.resolve(currentModuleDir, "..");
  const screensDirectory = path.join(projectRootDir, "app", "screens");

  if (!fs.existsSync(screensDirectory)) {
    console.error("Screens directory does not exist.");
    process.exit(1);
  }

  const screenDir = path.join(screensDirectory, screenName);

  if (fs.existsSync(screenDir)) {
    console.error(`Screen folder "${screenName}" already exists.`);
    process.exit(1);
  }

  // Step 1: Create the screen folder
  fs.mkdirSync(screenDir);

  // Step 2: Create the index.tsx file inside the new screen folder
  const indexFilePath = path.join(screenDir, "index.tsx");
  const indexFileContent = `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScreenHeader from "@/components/ScreenHeader";

const ${screenName} = () => {
  return (
    <>
      <ScreenHeader title="${screenName}" />
    </>
  );
};

export default ${screenName};

const styles = StyleSheet.create({});
`;

  fs.writeFileSync(indexFilePath, indexFileContent);
  console.log(`Created ${indexFilePath}`);

  // Step 3: Create the test file (ScreenName.test.tsx) inside the new screen folder
  const testFilePath = path.join(screenDir, `${screenName}.test.tsx`);
  const testFileContent = `import React from "react";
import { render, screen } from "@testing-library/react-native";
import ${screenName} from ".";

describe("${screenName}", () => {
    it("should render the screen and show the code", () => {
      render(<${screenName} />);
      screen.debug(); // This will print the screen's rendered output in the console
    });
});
`;

  fs.writeFileSync(testFilePath, testFileContent);
  console.log(`Created ${testFilePath}`);

  console.log(`Screen "${screenName}" has been created successfully!`);

  // Step 4: Modify the `Screens.ts` in the types directory
  const navTypeDirectory = path.join(projectRootDir, "app", "types", "Navigation");
  const screensFilePath = path.join(navTypeDirectory, "Screens.ts");

  if (!fs.existsSync(screensFilePath)) {
    console.error("Screens.ts file does not exist in the navigation types directory.");
    process.exit(1);
  }

  const screensFileContent = fs.readFileSync(screensFilePath, "utf-8");

  // Check if the screen is already present in SCREENS_PARAMS
  const screenExists = new RegExp(`\\b${screenName}\\b`).test(screensFileContent);
  if (screenExists) {
    console.log(`Screen "${screenName}" is already defined in the SCREENS_PARAMS.`);
    return;
  }

  // Prepend the new screen at the beginning of SCREENS_PARAMS
  const newScreenParam = `  ${screenName}?: undefined;`;

  const updatedScreensFileContent = screensFileContent.replace(
    /export type SCREENS_PARAMS = \{/,
    (match) => {
      return `export type SCREENS_PARAMS = {\n  ${newScreenParam}`;
    }
  );

  // Write the updated content back to `Screens.ts`
  fs.writeFileSync(screensFilePath, updatedScreensFileContent);
  console.log(`Added "${screenName}" to SCREENS_PARAMS in Screens.ts.`);
}

// Run the script
createScreen().catch((err) => {
  console.error("Error creating the screen:", err);
  process.exit(1);
});
