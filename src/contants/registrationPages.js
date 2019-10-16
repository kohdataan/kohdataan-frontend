const pages = {
  info: {
    current: 'info',
    next: 'add-nickname',
    skippable: false,
  },
  'add-nickname': {
    current: 'add-nickname',
    next: 'add-show-age',
    skippable: false,
  },
  'add-show-age': {
    current: 'add-show-age',
    next: 'add-location',
    skippable: false,
  },
  'add-location': {
    current: 'add-location',
    next: 'add-description',
    skippable: true,
  },
  'add-description': {
    current: 'add-description',
    next: 'add-image',
    skippable: true,
  },
  'add-image': {
    current: 'add-image',
    next: 'add-interests',
    skippable: true,
  },
  'add-interests': {
    current: 'add-interests',
    last: true,
    skippable: true,
  },
}

export default pages
