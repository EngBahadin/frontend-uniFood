import OrderedFoodCart from '@/app/_components/OrderedFoodCart';
function PreparingPage() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      <OrderedFoodCart preparationTime="10:00-10:30 PM" cartType="preparing" />
      <OrderedFoodCart preparationTime="10:00-10:30 PM" cartType="preparing" />
      <OrderedFoodCart preparationTime="10:00-10:30 PM" cartType="preparing" />
    </div>
  );
}

export default PreparingPage