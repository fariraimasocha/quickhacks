import Hero from "@/components/Hero";
import Main from "@/components/Main";

export default function Home() {
  return (
    <section className='py-24 flex justify-center'>
      <div className='container max-w-3xl'>
        <Hero />
        <Main />
      </div>
    </section>
  );
}
