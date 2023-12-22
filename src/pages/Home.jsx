import Header from "../components/Header"
import CardView from "../components/Home/CardView";
import Search from "../components/Home/Search";
import ImageCompressor from "../components/ImageCompressor"

const Home = ({ imagePages, pdfPages }) => {
    const pages = [{
        title: "Resume Builder AI",
        url: "/resume-builder-ai"
    }, {
        title: "Merge PDF",
        url: "/merge-pdf"
    }];
    const webPages = [{
        title: "WordPress Detector",
        url: "/wp-detector"
    }, {
        title: "Web Auditor AI",
        url: "/web-auditor-ai"
    },]


    return (
        <div className="w-full px-5">

            <Search pageUrls={[...pages, ...webPages, ...pdfPages, ...imagePages]} />
            <h3 className="font-bold text-2xl tracking-wide">PDF Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                    pages.map(({ title, url }, i) => (<CardView key={i} title={title} url={url} />))

                }
                {pdfPages.map(({ title, url }, i) => (<CardView key={i} title={title} url={url} />))

                }
            </div>
            <h3 className="font-bold text-2xl tracking-wide">SEO Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                    webPages.map(({ title, url }, i) => (<CardView key={i} title={title} url={url} />))

                }

            </div>
            <h3 className="font-bold text-2xl tracking-wide">Image Converter</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                        imagePages.map(({ title, url }, i) => (<CardView key={i} title={title} url={url} />))

                }
            </div>
        </div>)
}
export default Home;