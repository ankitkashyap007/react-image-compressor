import Header from "../components/Header"
import ImageCompressor from "../components/ImageCompressor"
const Home = () => {
    return (
        <div>
            <ImageCompressor />
            <div className="p-5">
                <h2 className="pt-2 font-bold text-xl">Effortlessly Convert and Compress Your Images</h2>
                <p className="pt-2">In today&#39;s digital world, images are an essential part of sharing your ideas and experiences with others. However, large image files can quickly consume valuable storage space and slow down your online activities. That&#39;s where Tech2radar comes in. Our powerful yet easy-to-use image conversion and compression tool allows you to seamlessly transform your images into various formats while reducing their file size without compromising quality.</p>
                <p className="pt-2">With Tech2radar, you can effortlessly:</p>
                <ul>
                    <li>Convert images between popular formats like JPEG, PNG, and GIF.</li>
                    <li>Resize images to fit specific dimensions or maintain aspect ratios.</li>
                    <li>Compress images to significantly reduce their file size without sacrificing visual quality.</li>
                </ul>
                <p className="pt-2">Our intuitive interface makes it simple to upload, convert, and download your images in just a few clicks. Plus, we never store your images on our servers, ensuring your privacy and security.</p>
                <p className="pt-2">Whether you&#39;re a professional designer, a social media enthusiast, or simply someone who wants to manage their digital photos effectively, Tech2radar is the perfect solution for all your image conversion and compression needs. Experience the convenience and efficiency of our free service today!</p>
            </div>
        </div>)
}
export default Home;