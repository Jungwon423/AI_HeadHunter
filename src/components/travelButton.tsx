import { ReactNode } from 'react'
import classNames from 'classnames'

interface IButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

const TravelButton = ({ children, onClick, className }: IButtonProps) => (
  <button
    type="button"
    className={classNames(
      'inline-flex items-center justify-center px-4 py-2 border rounded-full text-base font-medium',
      className,
      'text-lg md:text-lg lg:text-xl xl:text-2xl',
    )}
    onClick={onClick}
  >
    {children}
  </button>
)

export default TravelButton
