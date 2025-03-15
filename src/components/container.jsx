export default function Container({ children }) {
  return (
    <div className="w-full mx-auto bg-white min-h-screen flex flex-col border-l border-r">{children}</div>
  )
}