import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Utmel DEV WEB'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
