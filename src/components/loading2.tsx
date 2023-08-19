import Lottie from 'react-lottie-player'
import loadingJson_2 from '../../public/assets/lottie/loading_2.json'

const Loading2 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie
        loop
        animationData={loadingJson_2}
        play
        style={{ width: 150, height: 150 }}
      ></Lottie>
    </div>
  )
}

export default Loading2
