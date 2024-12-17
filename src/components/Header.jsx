import { MenuIcon} from 'lucide-react'

export default function Header(props) {
  const { handleToggleMenu } = props
  return (
      <header>
          <button onClick={handleToggleMenu} className="open-nav-button">
              <MenuIcon />
          </button>
          <h1 className="text-gradient">Pokédex</h1>
      </header>
  )
}