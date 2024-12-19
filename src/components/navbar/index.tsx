import { Container } from "@/components/ui/container";
import { WalletButton } from "../wallet-button";

export const NavBar = () => {
  return (
    <nav className="w-full h-fit py-4">
      <Container>
        <div className="w-full flex items-center justify-end">
          <WalletButton />
        </div>
      </Container>
    </nav>
  );
};
