import Link from 'next/link'

const links = [
  { href: 'website-terms-of-use', label: 'Website terms of use' },
  { href: 'important-disclosures', label: 'Important disclosures' },
  { href: 'privacy-policy', label: 'Privacy policy' },
]

export const Footer = () => {
  return (
    <footer className="bg-white">
      <section className="container-sm border-t-2 pb-4 pt-2">
        <div className="flex justify-between">
          {links.map((link, index) => (
            <Link key={index} href={link.href} className="text-sm1">
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </footer>
  )
}
