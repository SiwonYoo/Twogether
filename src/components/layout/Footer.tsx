'use client';

import Dialog from '@/components/common/Dialog';
import { Judson } from 'next/font/google';
import { useState } from 'react';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

function Footer() {
  const [isPolicyOpen, setPolicyOpen] = useState<boolean>(false);
  const [isTermsOpen, setTermsOpen] = useState<boolean>(false);

  const handleClickPolicy = () => {
    setPolicyOpen(true);
  };
  const handleClickTermsOpen = () => {
    setTermsOpen(true);
  };

  return (
    <>
      <footer className="px-5 h-44 w-full bg-gray-550 text-gray-250 pb-20">
        <p className={`${JudsonFont.className}`}>Twogether</p>
        <div className="text-xs">
          <button onClick={handleClickPolicy}>개인정보 처리 방침</button> |{' '}
          <button onClick={handleClickTermsOpen}>사이트 이용 약관</button>
        </div>
        <small className="text-xs">© 2025 Twogether. All rights reserved.</small>
      </footer>
      <Dialog isOpen={isPolicyOpen} setOpen={setPolicyOpen} title="개인정보 처리 방침">
        <div className="flex flex-col gap-2 text-xs">
          <p>본 웹사이트는 포트폴리오 목적으로 제작된 개인 프로젝트입니다.</p>
          <p>사용자의 이름, 이메일, 비밀번호, 휴대폰 번호 등을 수집하며, 해당 정보는 DB에 저장됩니다.</p>
          <p>수집된 정보는 실제 서비스 운영을 위한 것이 아니며, 데모용으로만 사용됩니다.</p>
          <p>방문자 추적, 쿠키 수집 등은 하지 않습니다.</p>
          <p>이 웹사이트는 상업적 서비스가 아닌 개인 포트폴리오 데모용으로 제작되었습니다.</p>
          <p>본 사이트와 관련된 문의 사항은 GitHub 또는 개인 이메일을 통해 연락 주시기 바랍니다.</p>
        </div>
      </Dialog>
      <Dialog isOpen={isTermsOpen} setOpen={setTermsOpen} title="사이트 이용 약관">
        <div className="flex flex-col gap-2 text-xs">
          <p>
            본 웹사이트는 프론트엔드 개발자 포트폴리오 목적으로 제작된 비상업적 사이트입니다. 본 약관은 본 사이트의
            이용에 관한 기본적인 사항을 규정합니다.
          </p>
          <strong>1. 목적</strong>
          <p>
            본 사이트는 프론트엔드 개발 기술 시연과 디자인 포트폴리오 제공을 위해 제작되었습니다. 상업적 목적이나 실제
            상품 판매는 이루어지지 않습니다.
          </p>
          <strong>2. 서비스 내용</strong>
          <p>
            - 사이트 내 콘텐츠는 예시를 위한 목적으로 제공됩니다. <br />- 일부 기능은 모의로 구성되어 있으며, 실제로
            동작하지 않을 수 있습니다.
          </p>
          <strong>3. 저작권</strong>
          <p>- 본 사이트에 포함된 디자인, 코드, 콘텐츠의 저작권은 제작자에게 있으며, 무단 복제 및 배포를 금지합니다.</p>
          <strong>4. 개인정보 보호</strong>
          <p>- 본 사이트는 개인정보를 수집하지 않으며, 관련 내용은 [개인정보 처리방침]을 따릅니다.</p>
          <strong>5. 책임의 한계</strong>
          <p>
            - 본 사이트는 포트폴리오용으로 운영되며, 콘텐츠의 정확성이나 신뢰성을 보장하지 않습니다. <br />- 사이트
            이용으로 발생한 손해에 대해 일체의 법적 책임을 지지 않습니다.
          </p>
          <strong>6. 약관 변경</strong>
          <p>- 본 약관은 사전 고지 없이 변경될 수 있으며, 변경 시 본 페이지에 게시합니다.</p>
          <br />
          <p className="text-right">시행일: 2025년 8월 8일</p>
        </div>
      </Dialog>
    </>
  );
}

export default Footer;
