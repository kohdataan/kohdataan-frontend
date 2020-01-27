const iconColors = [
  'orange',
  'darkblue',
  'maroon',
  '#ffe9d9',
  'green',
  'red',
  'lightblue',
  'gray',
  'black',
]

export default (userId, members) => {
  const index = members.findIndex(
    member => member.user_id === userId || member.id === userId
  )
  return iconColors[index] || ''
}
