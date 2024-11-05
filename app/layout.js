import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata = {
  title: "QuickHacks",
  description:
    "The place to share programming hacks as developers",
  icons: {
    icon: "/favicon/favicon.png",
  },
  keywords: "QuickHacks, open source, Programming hacks, product building, free tools",
  openGraph: {
    title: "QuickHacks",
    description:
      "The place to share programming hacks as developers",
    image: "/landing/quickhacks.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gray-100'>
        <Header />
        <main className='grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}