import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import {Toaster} from 'react-hot-toast'
function App() {
  return (
   <>
   <div>
    <Toaster  position = "top-right"
           toastOptions={{
            success:{
              theme:{
                primary:'#4aed88',

              },
            },
           }}>
          
    </Toaster>
   </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
      
          {/* : is a  identifier here : in a route indicate that the room id in a path is dynamic to make it changing in route : is used */}
          <Route path='/editor/:roomId' element={<EditorPage/>}></Route>
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
