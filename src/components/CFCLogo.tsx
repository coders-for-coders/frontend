import Image from "next/image";

export default function CFCLogo() {
  return (
    <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
      <Image
        src="/logo1.png"
        alt="CFC Logo"
        fill
        className="object-cover"
        sizes="(max-width: 640px) 40px, 48px"
        priority
      />
    </div>
  );
}
