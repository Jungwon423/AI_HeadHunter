import { useSprings } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

const pages = [
  // 여기에 페이지 데이터 추가 (예: 이미지 URL)
]

export default function Carousel() {
  const [props, api] = useSprings(
    pages.length,
    (i) => ({ x: i * window.innerWidth, scale: 1 }),
    [pages.length],
  )

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (active && distance > window.innerWidth / 2)
        cancel(api.start((i) => ({ x: (i - active) * window.innerWidth })))
      else
        api.start((i) => {
          if (i < pages.length - 1 || mx < 0)
            return { x: i * window.innerWidth - mx }
          else return { x: i * window.innerWidth }
        })
    },
  )

  return props.map(({ x }, i) => (
    <animated.div
      className="fixed top-0 left-0 h-full w-full"
      style={{ transform: to([x], (x) => `translate3d(${x}px,0,0)`) }}
      {...bind()}
      key={i}
    >
      <div
        style={{ backgroundImage: `url(${pages[i]})` }}
        className="h-full w-full bg-cover"
      />
    </animated.div>
  ))
}
