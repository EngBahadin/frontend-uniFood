import Image from "next/image";

const About = () => {
  return (
    <div className="p-10 flex flex-col bg-pure-white min-h-screen gap-y-14 ">
      <div>
        <h1 className="md:text-sub-heading-1-semiBold text-sub-heading-2-semiBold text-primary border-l-8 p-2 mb-4">
          About
        </h1>
        <p className="md:text-body-3-regular text-text-1-regular text-black md:max-w-[70%]">
          Unifood in an online ordering food website that serve students in
          college and allows them to order food in class and eat it in their
          college cafeteria without waiting to prepare the food
        </p>
      </div>
      <Image
        src="/bro.png"
        width={412}
        height={390}
        alt="Bro is ordering food"
        className="object-contain md:w-[412px] md:h-96 w-96 h-80 self-end"
      />
    </div>
  );
};

export default About;
