import type { CartItem } from '@/stores/useCartStore';
import CartItemCard from '@/components/cart/CartItemCard';

interface CartListItemProps {
  cartItem: CartItem;
  selected?: boolean;
  isLast?: boolean;
}

function CartListItem({ cartItem, selected = true, isLast = false }: CartListItemProps) {
  return (
    <li>
      <CartItemCard cartItem={cartItem} selected={selected} />
      {!isLast && <hr className="border-gray-200 border-1" />}
    </li>
  );
}

export default CartListItem;
