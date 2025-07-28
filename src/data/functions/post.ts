import { ApiResPromise, Post, PostReply } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

/**
 * 게시판 타입에 해당하는 게시글 목록을 가져옵니다.
 * @param {string} boardType - 게시판 타입(예: notice, free 등)
 * @param {string} keyword - 검색 키워드(에: 배송, 반품, 상품, 기타 등)
 * @returns {Promise<ApiRes<Post[]>>} - 게시글 목록 응답 객체
 */
export async function getPosts(boardType: string, keyword: string = ''): ApiResPromise<Post[]> {
  try {
    const query = new URLSearchParams();

    //keyword가 공백이 아니라면 query에 keyword 값 추가
    if (keyword.trim() !== '') {
      query.set('keyword', keyword);
    }

    const res = await fetch(`${API_URL}/posts?type=${boardType}&${query.toString()}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'no-store', // force-cache에서 no-store로 바꿔서 게시글 작성 후 목록으로 돌아왔을 때 바로 보이게 가능
      next: {
        tags: [`posts?type=${boardType}`],
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 특정 게시글의 상세 정보를 가져옵니다.
 * @param {number} _id - 게시글의 고유 ID
 * @returns {Promise<ApiRes<Post>>} - 게시글 상세 정보 응답 객체
 */
export async function getPost(_id: number): ApiResPromise<Post> {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
      next: {
        tags: [`posts/${_id}`],
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}

/**
 * 특정 게시글의 댓글 목록을 가져옵니다.
 * @param {number} _id - 게시글의 고유 ID
 * @returns {Promise<ApiRes<PostReply[]>>} - 댓글 목록 응답 객체
 */
export async function getReplies(_id: number): ApiResPromise<PostReply[]> {
  try {
    const res = await fetch(`${API_URL}/posts/${_id}/replies`, {
      headers: {
        'Client-Id': CLIENT_ID,
      },
      cache: 'force-cache',
      next: {
        tags: [`posts/${_id}/replies`],
      },
    });
    return res.json();
  } catch (error) {
    // 네트워크 오류 처리
    console.error(error);
    return { ok: 0, message: '일시적인 네트워크 문제로 등록에 실패했습니다.' };
  }
}
