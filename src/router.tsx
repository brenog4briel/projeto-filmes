import { createBrowserRouter } from 'react-router-dom'
import {Home} from "./pages/home"
import {NotFound} from "./pages/notfound"
import {Detail} from "./pages/detail"
import { Layout } from './components/layout'

const router = createBrowserRouter([
    {
        element:<Layout/>,
        children: [
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/detail/:movieid",
                element:<Detail/>
            },
            {
                path:"*",
                element:<NotFound/>
            }
        ]
    }
])

export {router}