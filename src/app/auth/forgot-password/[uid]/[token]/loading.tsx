function Loading() {
  return (
    <div className="flex flex-col h-screen  items-center justify-center">
      <p className="text-sub-heading-1-bold text-primary-lm animate-bounce ">.</p>
      <p className=" sm:text-body-3-medium text-text-2-medium text-primary-lm text-center animate-pulse duration-[4000]">
        Just a moment, making sure everything is secure...
      </p>
    </div>
  );
}

export default Loading;
