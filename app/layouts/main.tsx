import { FunctionComponent } from 'react'
import { twMerge } from 'tailwind-merge'

import { Footer } from '~/components/common/footer'
import { Header } from '~/components/common/header'

type Props = {
  className?: string
}

export const Layout: FunctionComponent<Props> = ({ children, className }) => (
  <div className="flex flex-col max-w-5xl mx-auto min-h-[calc(100vh-4rem)] lg:my-8 bg-primary-50 lg:rounded-2xl lg:overflow-hidden lg:shadow-lg">
    <Header />

    <main className={twMerge('m-8 flex-1', className)}>{children}</main>

    <Footer />
  </div>
)
