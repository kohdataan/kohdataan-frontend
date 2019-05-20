import icons from '../contants/interestIcons'

const getIcon = name => {
  const iconObject = icons.find(item => item.key === name)
  return iconObject.icon
}

export default getIcon
