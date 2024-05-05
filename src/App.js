import JobList from './components/cardlist';
import store from './redux/store';
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
    <div className="App">
     <JobList/>
    </div>
    </Provider>
  );
}

export default App;
