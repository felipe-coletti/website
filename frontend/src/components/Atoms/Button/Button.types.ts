export interface ButtonProps {
    variant?: 'filled' | 'outline' | 'ghost'
    onClick?: () => void
    children: React.ReactNode
}
