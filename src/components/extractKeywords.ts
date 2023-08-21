import nlp from 'compromise'

export const extractKeywords = (text: string): string[] => {
  const doc = nlp(text)
  const keywords = doc.nouns().out('array').concat(doc.verbs().out('array'))
  return keywords
}

const PIXABAY_API_KEY = '38902135-0e3389f4d3bcd2f13d8061be7'

export const fetchImage = async (keyword: string): Promise<string> => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
      keyword,
    )}&image_type=photo&pretty=true&per_page=3`,
  )
  const data = await response.json()
  if (data.hits && data.hits.length > 0) {
    return data.hits[0].largeImageURL
  } else {
    return ''
  }
}
