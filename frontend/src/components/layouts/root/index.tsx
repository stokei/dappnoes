import { PropsWithChildren } from "react"

export const Root = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-row">{children}</div>
}
