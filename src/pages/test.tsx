import Image from 'next/image'
import DelayedImage from '../components/DelayedImage'

const PreferencePage = () => {
  const prefix = 'https://search.pstatic.net/common?src='
  const suffix = '&type=m1500_travelsearch'
  const suffix2 = '&type=w800_travelsearch'
  const encodingFirst = (url: string) => {
    let encodedUrl = encodeURIComponent(url)
    let firstImage = prefix + encodedUrl + suffix
    let firstImage2 = prefix + encodedUrl + suffix2
    return [firstImage, firstImage2]
  }
  const encodingSecond = (url: string) => {
    let encodedUrl = encodeURIComponent(url)
    let secondImage = prefix + encodedUrl + suffix
    let secondImage2 = prefix + encodedUrl + suffix2
    return [secondImage, secondImage2]
  }
  const originalUrl =
    'http://media-cdn.tripadvisor.com/media/photo-o/1a/83/dc/77/photo2jpg.jpg'
  const originalUrl2 =
    'http://media-cdn.tripadvisor.com/media/photo-o/1b/8a/06/b7/pitogyros-oia-santorini.jpg'
  let firstImage = encodingFirst(originalUrl)[0]
  let firstImage2 = encodingFirst(originalUrl)[1]
  let secondImage = encodingSecond(originalUrl2)[0]
  let secondImage2 = encodingSecond(originalUrl2)[1]
  //  'http://media-cdn.tripadvisor.com/media/photo-o/1b/e8/69/70/img-20200831-102616-largejpg.jpg'
  // 'https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229162607724_DFELFUSQ6.jpg/fb344_33_i1.jpg?type=w540_fst'
  // 'http://media-cdn.tripadvisor.com/media/photo-o/17/50/77/f1/entrapped-fish.jpg'
  //    'http://media-cdn.tripadvisor.com/media/photo-o/0c/b5/92/9e/stabilimento-di-gran.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/19/be/f1/f4/photo0jpg.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/0c/b5/92/9e/stabilimento-di-gran.jpg'
  //'https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229163310416_XJEW55SNU.jpg/fb345_37_i1.jpg?type=w540_fst'
  //'http://media-cdn.tripadvisor.com/media/photo-o/18/f7/5d/9e/photo1jpg.jpg'
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <Image src={apiUrl} alt="대체_텍스트" width={1500} height={1500} /> */}
      <div>
        <DelayedImage
          src={firstImage}
          alt="Image 1"
          width={400}
          height={300}
          delay={0}
        />
        <DelayedImage
          src={secondImage}
          alt="Image 2"
          width={400}
          height={300}
          delay={1000} // 1초 지연
        />
      </div>
    </div>
  )
}

export default PreferencePage
