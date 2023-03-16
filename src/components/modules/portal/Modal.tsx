interface ModalInterface {
    className?: string
    children: React.ReactNode
}
export const ModalList: React.FC<ModalInterface> = ({className, children}) => {
    return <div className={className ? className : ""}>{children}</div>
}