const pages = {
  info: {
    current: 'info',
    next: 'add-nickname',
    skippable: false,
  },
  'add-nickname': {
    current: 'add-nickname',
    next: 'add-show-age',
    previous: 'info',
    skippable: false,
  },
  'add-show-age': {
    current: 'add-show-age',
    next: 'add-location',
    previous: 'add-nickname',
    skippable: false,
  },
  'add-location': {
    current: 'add-location',
    next: 'add-description',
    previous: 'add-show-age',
    skippable: false,
  },
  'add-description': {
    current: 'add-description',
    next: 'add-image',
    previous: 'add-location',
    skippable: true,
  },
  'add-image': {
    current: 'add-image',
    next: 'add-interests',
    previous: 'add-description',
    skippable: true,
  },
  'add-interests': {
    current: 'add-interests',
    previous: 'add-image',
    last: true,
    skippable: false,
  },
}

export default pages
