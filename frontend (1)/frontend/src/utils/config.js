import process from "process";

// Development mode configuration
const devConfig = {
  apiUrl: "http://localhost:3000",
  debugMode: true,
};
//  export const apiUrl = "https://goldfish-app-chy6z.ondigitalocean.app";
export const apiUrl = "http://localhost:8081";
// Production mode configuration
const prodConfig = {
  // apiUrl: "https://goldfish-app-chy6z.ondigitalocean.app",
  apiUrl: "http://localhost:8081",

  debugMode: false,
};

// Export the appropriate configuration based on the environment
const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;
  