import { FunctionComponent } from 'react'
import { Link } from 'remix'

import { Logo } from './logo'
import { Search } from './search'

export const Header: FunctionComponent = () => (
  <header className="flex flex-col p-6 bg-primary-100 lg:justify-between lg:flex-row lg:items-center">
    <Link className="flex items-center" to="/">
      <Logo />

      <div className="flex-1 ml-4">
        <div className="text-2xl font-bold">Who Died When?</div>
        <div className="text-sm font-medium text-gray-600">
          Find out if someone died on a TV show
        </div>
      </div>
    </Link>

    <Search className="w-full mt-4 lg:mt-0 lg:max-w-xs" />
  </header>
)
