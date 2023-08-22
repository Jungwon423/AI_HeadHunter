import Lottie from 'react-lottie-player'
import loadingJson_2 from '../../public/assets/lottie/loading_2.json'

const Loading2 = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie
        loop
        animationData={loadingJson_2}
        play
        style={{ width: 300, height: 500 }}
      ></Lottie>
    </div>
  )
}

export default Loading2
