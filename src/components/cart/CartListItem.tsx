import { Cart } from '@/types/cart';
import CartItemCard from '@/components/cart/CartItemCard';

interface CartListItemProps {
  cartItem: Cart;
  selected?: boolean;
  onCheckBoxChange?: (checked: boolean) => void;
  onDelete?: (key: string) => void;
  isLast?: boolean;
}

function CartListItem({ cartItem, selected = true, onCheckBoxChange, onDelete, isLast = false }: CartListItemProps) {
  return (
    <li>
      <CartItemCard cartItem={cartItem} selected={selected} onCheckBoxChange={onCheckBoxChange} onDelete={onDelete} />
      {!isLast && <hr className="border-gray-200 border-1" />}
    </li>
  );
}

export default CartListItem;
