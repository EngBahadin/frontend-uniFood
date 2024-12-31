import OrderedFoodCart from "@/app/_components/OrderedFoodCart";

function PreparedPage() {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      <OrderedFoodCart preparationStatus="Re-Order" cartType="delivered" />
      <OrderedFoodCart preparationStatus="Re-Order" cartType="delivered" />
      <OrderedFoodCart preparationStatus="Re-Order" cartType="delivered" />
    </div>
  );
}

export default PreparedPage;