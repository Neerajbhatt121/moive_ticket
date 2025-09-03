const HomepageSkeleton = () => {
  return (
    <div className="w-[12rem] h-[10rem] sm:w-[18rem] sm:h-[14rem] animate-pulse flex flex-col justify-between p-1">
      {/* Poster placeholder */}
      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-[4px]"></div>

      {/* Title placeholder */}
      <div className="mt-2 w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
};

export default HomepageSkeleton