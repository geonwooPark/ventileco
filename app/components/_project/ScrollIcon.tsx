export default function ScrollIcon() {
  return (
    <div className="fixed bottom-4 left-[50%] z-[100] translate-x-[-50%] overflow-hidden">
      <div className="flex h-8 w-5 justify-center rounded-full border-2 border-dashed border-beige-light">
        <div className="mt-1 size-2 animate-wheelDown rounded-full bg-beige-light"></div>
      </div>
    </div>
  )
}
