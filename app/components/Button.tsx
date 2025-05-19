// components/Button.tsx
type Props = {
    href: string
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
  }
  
  export default function Button({ href, children, variant = 'primary' }: Props) {
    const base = 'inline-block px-6 py-3 rounded-md text-sm font-medium transition'
    const styles = {
      primary: `${base} bg-indigo-600 text-white hover:bg-indigo-700`,
      secondary: `${base} border border-indigo-600 text-indigo-600 hover:bg-indigo-50`
    }
  
    return <a href={href} className={styles[variant]}>{children}</a>
  }
  