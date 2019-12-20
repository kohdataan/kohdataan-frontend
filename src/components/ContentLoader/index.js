import React from 'react'
import ContentLoader from 'react-content-loader'

export const MyLoader = () => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="69" y="10" rx="4" ry="4" width="170" height="15" />
    <rect x="70" y="42" rx="3" ry="3" width="100" height="13" />
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>
)

export const TextLine = () => (
  <ContentLoader
    height={8}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="1" rx="5" ry="5" width="120" height="8" />
  </ContentLoader>
)
