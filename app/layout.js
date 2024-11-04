import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='bg-gray-100'
      >
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
