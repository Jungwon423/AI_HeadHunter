export interface MinorCategory {
  map(
    arg0: (minorCategory: MinorCategory) => import('react').JSX.Element,
  ): import('react').ReactNode
  name: string
  checked: boolean
}

export interface MajorCategoriesWithMinorCategories {
  [majorCategory: string]: MinorCategory[]
}
