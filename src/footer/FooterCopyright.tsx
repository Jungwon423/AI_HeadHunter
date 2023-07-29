import React from 'react';

// 원래의 CSS 클래스 이름이 있던 곳에 직접 Tailwindcss 클래스를 추가합니다.
const FooterCopyright = () => (
  <div className="footer-copyright">
    &copy; Copyright {new Date().getFullYear()} Trippy. Made with{' '}
    <a
      href="#"
      className="text-primary-500 hover:underline" // Tailwindcss 클래스를 추가
    >
      jungwon jungmo donggeun
    </a>
  </div>
);

export {FooterCopyright};
