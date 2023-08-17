import Image from 'next/image'

const PreferencePage = () => {
  const originalUrl =
    'http://media-cdn.tripadvisor.com/media/photo-o/1a/83/dc/77/photo2jpg.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/1b/8a/06/b7/pitogyros-oia-santorini.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/1b/e8/69/70/img-20200831-102616-largejpg.jpg'
  // 'https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229162607724_DFELFUSQ6.jpg/fb344_33_i1.jpg?type=w540_fst'
  // 'http://media-cdn.tripadvisor.com/media/photo-o/17/50/77/f1/entrapped-fish.jpg'
  //    'http://media-cdn.tripadvisor.com/media/photo-o/0c/b5/92/9e/stabilimento-di-gran.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/19/be/f1/f4/photo0jpg.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/0c/b5/92/9e/stabilimento-di-gran.jpg'
  //'https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229163310416_XJEW55SNU.jpg/fb345_37_i1.jpg?type=w540_fst'
  //'http://media-cdn.tripadvisor.com/media/photo-o/18/f7/5d/9e/photo1jpg.jpg'
  let encodedUrl = encodeURIComponent(originalUrl)
  console.log(encodedUrl)
  // encodedUrl =
  //   'http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F19%2F90%2F03%2F15%2Fmuseum-apartment-with.jpg'
  const prefix = 'https://search.pstatic.net/common?src='
  const suffix = '&type=w800_travelsearch'

  const apiUrl = prefix + encodedUrl + suffix
  console.log(apiUrl)
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={apiUrl} alt="대체_텍스트" width={1500} height={1500} />
    </div>
  )
}

export default PreferencePage
