import { Link } from "react-router-dom"
import { useState } from "react"
export default function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const pages = [{
    title: "Home",
    url: "/"
  }, {
    title: "Merge PDF",
    url: "/merge-pdf"
  }, {
    title: "About",
    url: "/about"
  }, {
    title: "Privacy",
    url: "/privacy"
  }];
  const anchorTags = pages.map(page => {
    return <li key={page.url}>
      <Link to={page.url} className="block py-2 px-3  rounded md:p-0 " >{page.title}</Link>
    </li>
  })

  const toggleMenu = () => {
    setMenuVisible(preValue => !preValue);
  }
  return (<header>
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap">Image Compressor</span>
        </Link>

        <button onClick={toggleMenu} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={isMenuVisible ? "w-full md:block md:w-auto" : "hidden w-full md:block md:w-auto"} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            {anchorTags}
          </ul>
        </div>
      </div>
    </nav>

  </header>
  )
}