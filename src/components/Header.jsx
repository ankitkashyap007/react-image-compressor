import {Link} from "react-router-dom"

export default function Header(){
  
  console.log("Header")
  
    return(<header className="border-b-2 flex items-center justify-between py-4 font-medium">
        <h1 className="font-bold px-4 tracking-wide text-xl">Image Compressor</h1>
        <nav >
          <ul className="flex font-bold tracking-wide">
            <li className="px-4 py-2"><Link to="/">Home</Link ></li>
            <li className="px-4 py-2"><Link to="about">About</Link ></li>
            <li className="px-4 py-2"><Link to="privacy">Privacy</Link ></li>
          </ul>
        </nav>
      </header>
      )
}