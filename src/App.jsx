import "./App.css";
import config from "./config/config"

function App() {
  console.log("test", config?.appwriteUrl );

  return (
    <>
      <h1>A Blog App with Appwrite</h1>
    </>
  );
}

export default App;
