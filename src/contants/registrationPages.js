const pages = {
  info: {
    current: 'info',
    next: 'add-nickname',
    skippable: false,
  },
  'add-nickname': {
    current: 'add-nickname',
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
    last: true,
  },
}

export default pages
