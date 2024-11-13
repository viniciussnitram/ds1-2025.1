export default function Container({ children }) {
  return (
    <div className="max-w-[1800px] mx-auto bg-white min-h-screen flex flex-col border-l border-r">{children}</div>
  )
}