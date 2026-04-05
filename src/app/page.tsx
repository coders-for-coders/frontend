import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex-grow flex items-center justify-center py-20">
        <Hero />
      </div>
    </div>
  );
}
