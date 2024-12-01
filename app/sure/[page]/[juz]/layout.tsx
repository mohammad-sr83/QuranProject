
// import localFont from '@next/font/local'
// const myFont = localFont({ src: '@/public/font/QuranTaha.ttf' })

export  const metadata = {
    title: "Quaran-Play",
    description: "Quaran Play page ",
    icons: {
      icon: '/image/quran-logo-light.svg',
    },
  };

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div >
      {children}
    </div>
  )
}
