import { FunctionComponent } from 'react'
import { Link } from 'remix'

export const Footer: FunctionComponent = () => {
  const links = [
    {
      links: [
        {
          href: '/popular',
          label: 'Popular shows'
        },
        {
          href: '/recent',
          label: 'Recent deaths'
        }
      ],
      title: 'Browse'
    },
    {
      links: [
        {
          href: '/edit/show',
          label: 'Add show'
        },
        {
          href: '/edit/character',
          label: 'Add character'
        },
        {
          href: '/edit/death',
          label: 'Add death'
        }
      ],
      title: 'Edit'
    },
    {
      links: [
        {
          href: '/about',
          label: 'About'
        },
        {
          href: 'https://github.com/alizahid/who-died-when',
          label: 'GitHub'
        },
        {
          href: 'https://twitter.com/whodiedwhen',
          label: 'Twitter'
        }
      ],
      title: 'About'
    }
  ]

  return (
    <footer className="flex flex-col p-6 text-sm text-gray-600 bg-white lg:flex-row lg:justify-between">
      <p>&#169; {new Date().getFullYear()} / Who Died When?</p>

      <div className="flex mt-4 lg:mt-0">
        {links.map(({ links, title }) => (
          <nav className="ml-8 first:ml-0" key={title}>
            <div className="font-medium">{title}</div>

            <div className="flex flex-col">
              {links.map(({ href, label }) =>
                href.startsWith('http') ? (
                  <a className="mt-1 text-gray-600" href={href} key={href}>
                    {label}
                  </a>
                ) : (
                  <Link className="mt-1 text-gray-600" key={href} to={href}>
                    {label}
                  </Link>
                )
              )}
            </div>
          </nav>
        ))}
      </div>
    </footer>
  )
}
