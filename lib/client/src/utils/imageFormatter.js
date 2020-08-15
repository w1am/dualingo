export const loadImage = (parent, image, isLogo, isCover, session) => {
  const getType = () => {
    if (isLogo) {
      return 'logo/'
    } else if (isCover) {
      return 'cover/'
    } else {
      if (session) {
        return `${session.toString()}/`
      } else {
        return session
      }
    }
  }
  return `${window.location.origin}/uploads/${parent}/${getType()}${image}`
}

export const loadIcon = (file) => {
  return `${window.location.origin}/icons/${file}`
}
