import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function OrderedFoodCartSkeleton() {
  return (
    <article className="p-4 border bg-pure-white rounded-lg shadow">
      <div className="mb-4">
        <Skeleton width={120} height={20} />
        <Skeleton width={200} height={16} className="mt-2" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton circle={true} width={40} height={40} />
        <div className="flex flex-col items-center">
          <Skeleton width={100} height={100} circle={true} />
          <Skeleton width={80} height={20} className="mt-2" />
          <Skeleton width={50} height={16} />
        </div>
        <Skeleton circle={true} width={40} height={40} />
      </div>
      <div className="flex justify-center mt-2 space-x-1">
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <Skeleton
              key={idx}
              width={8}
              height={8}
              circle={true}
              className="mx-1"
            />
          ))}
      </div>
    </article>
  );
}

export default OrderedFoodCartSkeleton;
