import Header from "../components/Header"
import CardView from "../components/Home/CardView";
import ImageCompressor from "../components/ImageCompressor"

const Home = () => {
    const pages = [ {
        title: "PDF Converter",
        url: "/pdf-converter"
      }, {
        title: "Resume Builder AI",
        url: "/resume-builder-ai"
      },{
        title: "Merge PDF",
        url: "/merge-pdf"
      }];

    const formats = ["heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz", "png", "tif", "webp", "gif"];
    const createImageConverter = () => {

        return formats.flatMap((sourceFormat, i) =>
            formats
                .filter((_, j) => i !== j)
                .map((targetFormat, index) => <CardView key={`${sourceFormat}-to-${targetFormat}`} title={`${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()}`} url={`/${sourceFormat}-to-${targetFormat}`} />)
        )
    }

    return (
        <div className="w-full px-2">
            <h3 className="font-bold text-2xl tracking-wide">Image Converter</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                    createImageConverter()
                }
            </div>
            <h3 className="font-bold text-2xl tracking-wide">PDF Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {
                    pages.map(({title,url},i) => (  <CardView key={i} title={title} url={url} />))
                }
            </div>
        </div>)
}
export default Home;