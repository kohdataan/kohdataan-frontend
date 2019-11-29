const pages = {
  info: {
    current: 'info',
    next: 'add-nickname',
    skippable: false,
    valid: true,
  },
  'add-nickname': {
    current: 'add-nickname',
    next: 'add-show-age',
    previous: 'info',
    skippable: false,
    valid: false,
  },
  'add-show-age': {
    current: 'add-show-age',
    next: 'add-location',
    previous: 'add-nickname',
    skippable: false,
    valid: false,
  },
  'add-location': {
    current: 'add-location',
    next: 'add-description',
    previous: 'add-show-age',
    skippable: false,
    valid: false,
  },
  'add-description': {
    current: 'add-description',
    next: 'add-image',
    previous: 'add-location',
    skippable: true,
    valid: true,
  },
  'add-image': {
    current: 'add-image',
    next: 'add-interests',
    previous: 'add-description',
    skippable: true,
    valid: true,
  },
  'add-interests': {
    current: 'add-interests',
    previous: 'add-image',
    last: true,
    skippable: false,
    valid: false,
  },
}

export default pages
