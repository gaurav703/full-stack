type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number | string => {
  switch (op) {
    case "multiply":
      return a * b;
    case "add":
      return a + b;
    case "divide":
      if (b === 0) return "can't divide by 0!";
      return a / b;
    default:
      return "Invalid operation";
  }
};

// Example Usage:
console.log(calculator(10, 5, "add")); // 15
console.log(calculator(10, 5, "multiply")); // 50
console.log(calculator(10, 0, "divide")); // "can't divide by 0!"






//// tsconfig.json that works for TypeScript projects that use ES modules with ts-node


// {
//   "compilerOptions": {
//     "target": "ESNext",                  // Use the latest ECMAScript features
//     "module": "ESNext",                  // Use ES modules
//     "moduleResolution": "Node",          // Resolve modules using Node.js module resolution
//     "esModuleInterop": true,             // Enable compatibility with CommonJS modules
//     "skipLibCheck": true,                // Skip type checking of declaration files
//     "forceConsistentCasingInFileNames": true, // Ensure consistent casing for file imports
//     "outDir": "./dist",                  // Output directory for compiled JS files
//     "strict": true,                      // Enable all strict type-checking options
//     "resolveJsonModule": true,           // Allow importing JSON files
//     "allowJs": true,                     // Allow JavaScript files to be compiled
//     "experimentalDecorators": true,      // Enable support for decorators
//     "useDefineForClassFields": true      // Ensure class fields are defined in ESNext manner
//   },
//   "include": [
//     "src/**/*.ts"                        // Include all TypeScript files in the "src" folder
//   ],
//   "exclude": [
//     "node_modules"                       // Exclude node_modules folder
//   ]
// }

// "noUnusedParameters": true,           // Enable error reporting for unused parameters


