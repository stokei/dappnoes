import { PropsWithChildren } from "react"

export const Content = ({ children }: PropsWithChildren) => {
  return <main className="w-full flex flex-1">{children}</main>
}
