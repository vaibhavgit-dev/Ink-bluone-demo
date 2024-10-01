import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Head from "next/head";
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BluOne ink",
  description: "",
  icons: {
    icon: ["/assests/image/favicon.ico?v=4"],
    apple: ["/assests/image/apple-touch-icon.png?v=4"],
    shortcut: ["/assests/image/apple-touch-icon.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
      </Head>
      <body className="flex flex-col min-h-screen">
       <Header/>
       <NavBar />
        <div className="">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
