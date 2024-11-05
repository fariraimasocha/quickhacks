import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon.png" />
        <meta property="og:title" content="QuickHacks" />
        <meta property="og:description" content="The place to share programming hacks as developers" />
        <meta property="og:image" content="/landing/quickhacks.png" />
      </head>
      <body
        className='bg-gray-100'
      >
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </body>
    </html >
  );
}
