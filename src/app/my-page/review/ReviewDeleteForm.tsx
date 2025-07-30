import { deleteReview } from '@/data/actions/review';
import useUserStore from '@/stores/useUserStore';
import { Dispatch, SetStateAction, useActionState } from 'react';

function ReviewDeleteForm({ _id, setRefreshKey }: { _id: number; setRefreshKey?: Dispatch<SetStateAction<number>> }) {
  const { user } = useUserStore();
  const [state, formAction, isLoading] = useActionState(deleteReview, null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!window.confirm('작성하신 리뷰를 삭제하시겠습니까?')) event.preventDefault();
    else if (setRefreshKey) setRefreshKey((prev) => prev + 1);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <input type="hidden" name="_id" value={_id} />
      <input type="hidden" name="accessToken" value={user?.token?.accessToken} />
      <button type="submit" className="hover:underline cursor-pointer">
        삭제
      </button>
    </form>
  );
}

export default ReviewDeleteForm;
