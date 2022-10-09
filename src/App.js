import Home from "./components/Home.js";

function App() {
  const time = new Date().getHours();
  console.log(time);

  return (
    <div className={time > 18 ? "App night-image" : "App day-image"}>
      <Home></Home>
    </div>
  );
}

export default App;
