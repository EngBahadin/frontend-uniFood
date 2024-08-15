import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="py-[146px] bg-white flex flex-col">
      <Image
        src="/unifood-logo.png"
        alt="uni food logo"
        width={95}
        height={88}
        className="object-contain absolute left-0 top-0 ml-[40px] mt-[40px]"
      />
      <div className="m-auto relative">
        <section className="absolute top-[-45px] right-[-50px] z-20">
          <Image
            src="/burger.png"
            width={118}
            height={118}
            alt="burger image"
            className="object-contain"
          />
        </section>
        <div className="w-[608px] h-[668px] bg-pure-white rounded-[32px] border-primary-lm border-[3px] relative">
          {children}
        </div>
      </div>
    </main>
  );
}
