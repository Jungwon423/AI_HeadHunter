import type { ReactNode } from 'react'

import { FooterCopyright } from './FooterCopyright'
import { FooterIconList } from './FooterIconList'

type ICenteredFooterProps = {
  iconList: ReactNode
  children: ReactNode
}

const CenteredFooter = (props: ICenteredFooterProps) => (
  <div className="text-center">
    <nav>
      <ul className="navbar mt-5 flex flex-row justify-center text-xl font-medium text-gray-800">
        {props.children}
      </ul>
    </nav>

    {/* <div className="w-8 flex-col mt-8 justify-center">
      <FooterIconList>{props.iconList}</FooterIconList>
    </div> */}

    <div className="mt-8 text-sm">
      <FooterCopyright />
    </div>

    <style jsx>
      {`
        .navbar :global(li) {
          @apply mx-4;
        }
      `}
    </style>
  </div>
)

export { CenteredFooter }
