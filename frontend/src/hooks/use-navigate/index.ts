import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const { push } = useRouter();
  return {
    push
  }
}
