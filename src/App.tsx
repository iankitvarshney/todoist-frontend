import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
