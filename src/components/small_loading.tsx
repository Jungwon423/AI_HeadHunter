import Lottie from 'react-lottie-player'
import loadingJson_2 from '../../public/assets/lottie/loading_2.json'

const SmallLoading = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <Lottie
        loop
        animationData={loadingJson_2}
        play
        style={{ width: 30, height: 30, color: '#FBBF24' }}
      ></Lottie>
    </div>
  )
}

export default SmallLoading
