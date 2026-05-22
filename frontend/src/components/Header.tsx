import { useTranslation } from 'react-i18next'

export default function Header() {
  const { t } = useTranslation()
  return (
    <header className="app-header">
      <h1>{t('header.title')}</h1>
      <p>{t('header.subtitle')}</p>
    </header>
  )
}
