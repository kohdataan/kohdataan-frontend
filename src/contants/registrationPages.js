const pages = {
  info: {
    current: 'info',
    next: 'add-nickname',
  },
  'add-nickname': {
    current: 'add-nickname',
    next: 'add-show-age',
    previous: 'info',
  },
  'add-show-age': {
    current: 'add-show-age',
    next: 'add-location',
    previous: 'add-nickname',
  },
  'add-location': {
    current: 'add-location',
    next: 'add-description',
    previous: 'add-show-age',
  },
  'add-description': {
    current: 'add-description',
    next: 'add-image',
    previous: 'add-location',
  },
  'add-image': {
    current: 'add-image',
    next: 'add-interests',
    previous: 'add-description',
  },
  'add-interests': {
    current: 'add-interests',
    previous: 'add-image',
    last: true,
  },
}

export default pages
