import fs from "fs";
import path from "path";
import inquirer from "inquirer";

async function promptUserInput() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "componentName",
      message: "Enter component name: ",
      validate: (input) => {
        if (!input) {
          return "Please provide a valid component name.";
        }
        if (input[0] !== input[0].toUpperCase()) {
          return "Component name must start with an uppercase letter.";
        }
        return true;
      }
    }
  ]);
  return answers.componentName;
}

async function createComponent() {
  const fileName = await promptUserInput();

  if (!fileName) {
    console.error("Please provide a valid component name.");
    process.exit(1);
  }

  const currentModuleUrl = import.meta.url;
  const currentModuleDir = path.dirname(new URL(currentModuleUrl).pathname);

  const projectRootDir = path.resolve(currentModuleDir, "..");
  const componentsDirectory = path.join(projectRootDir, "app", "components");

  if (!fs.existsSync(componentsDirectory)) {
    console.error("Components directory does not exist.");
    process.exit(1);
  }

  const componentDir = path.join(componentsDirectory, fileName);

  if (fs.existsSync(componentDir)) {
    console.error(`Component folder "${fileName}" already exists.`);
    process.exit(1);
  }

  // Step 1: Create the component folder
  fs.mkdirSync(componentDir);

  // Step 2: Create the index.tsx file inside the new component folder
  const indexFilePath = path.join(componentDir, "index.tsx");
  const indexFileContent = `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ${fileName} = () => {
  return (
    <View>
      <Text>${fileName}</Text>
    </View>
  );
};

export default ${fileName};

const styles = StyleSheet.create({});
`;

  fs.writeFileSync(indexFilePath, indexFileContent);
  console.log(`Created ${indexFilePath}`);

  // Step 3: Create the test file (ComponentName.test.tsx) inside the new component folder
  const testFilePath = path.join(componentDir, `${fileName}.test.tsx`);
  const testFileContent = `import React from "react";
import { render, screen } from "@testing-library/react-native";
import ${fileName} from ".";

describe("${fileName}", () => {
    it("should render the component and show the code", () => {
      render(<${fileName} />);
      screen.debug(); // This will print the component's rendered output in the console
    });
});
`;

  fs.writeFileSync(testFilePath, testFileContent);
  console.log(`Created ${testFilePath}`);

  console.log(`Component "${fileName}" has been created successfully!`);
}

createComponent().catch((err) => {
  console.error("Error creating the component:", err);
  process.exit(1);
});
