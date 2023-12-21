import Header from "../components/Header"
import CardView from "../components/Home/CardView";
import ImageCompressor from "../components/ImageCompressor"

const Home = () => {
    const pages = [{
        title: "PDF Converter",
        url: "/pdf-converter"
    }, {
        title: "Resume Builder AI",
        url: "/resume-builder-ai"
    }, {
        title: "Merge PDF",
        url: "/merge-pdf"
    }];

    const formats = ["jpeg", "png", "jpg", "webp", "gif", "avif", "jpe", "tile", "dz", "tif", "heic", "heif"];
    const createImageConverter = () => {

        return formats.flatMap((sourceFormat, i) =>
            formats
                .filter((_, j) => i !== j)
                .map((targetFormat, index) => <CardView key={`${sourceFormat}-to-${targetFormat}`} title={`${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()}`} url={`/${sourceFormat}-to-${targetFormat}`} />)
        )
    }
    const createPDFConverter = () => {
        return formats
            .map((sourceFormat, i) => <CardView key={i} title={`${sourceFormat.toUpperCase()} to PDF Converter`} url={`${sourceFormat}-to-pdf-converter`} />)
    }

    return (
        <div className="w-full px-2">
            <h3 className="font-bold text-2xl tracking-wide">PDF Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                    pages.map(({ title, url }, i) => (<CardView key={i} title={title} url={url} />))

                }
                {createPDFConverter()
                }
            </div>
            <h3 className="font-bold text-2xl tracking-wide">SEO Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <CardView title="Plagiarism Checker AI" url="/plagiarism-checker" />

            </div>
            <h3 className="font-bold text-2xl tracking-wide">Image Converter</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                    createImageConverter()
                }
            </div>
        </div>)
}
export default Home;