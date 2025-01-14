function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <>
        <p className="md:text-body-3-medium sm:text-body-4-medium text-text-1-medium text-primary">
          Just a moment, making sure everything is secure .
        </p>
        <div className="lds-ellipsis text-primary">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    </div>
  );
}

export default Loading;
