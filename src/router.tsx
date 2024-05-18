import { createBrowserRouter } from 'react-router-dom'
import {Home} from "./pages/home"
import {NotFound} from "./pages/notfound"
import {Detail} from "./pages/detail"

const router = createBrowserRouter([
    {
        children: [
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/detail/:cripto",
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