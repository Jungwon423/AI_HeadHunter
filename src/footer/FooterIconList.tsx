import type { ReactNode } from 'react';
import React from 'react';

type IFooterIconListProps = {
  children: ReactNode;
};

const FooterIconList = (props: IFooterIconListProps) => (
  <div className="footer-icon-list flex flex-row flex-wrap space-x-3">
    {React.Children.map(props.children, (child, idx) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          className: `${child.props.className ?? ''} text-gray-500 hover:text-gray-700`,
        });
      }
      return child;
    })}
  </div>
);

export { FooterIconList };