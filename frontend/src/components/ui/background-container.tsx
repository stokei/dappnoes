import { PropsWithChildren } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

export const BackgroundContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-float absolute top-10 left-10">
          <Dice1 className="w-12 h-12 text-white/20" />
        </div>
        <div className="animate-float-delayed absolute top-20 right-20">
          <Dice2 className="w-16 h-16 text-white/20" />
        </div>
        <div className="animate-float absolute bottom-20 left-20">
          <Dice3 className="w-14 h-14 text-white/20" />
        </div>
        <div className="animate-float-delayed absolute bottom-10 right-10">
          <Dice4 className="w-10 h-10 text-white/20" />
        </div>
        <div className="animate-float absolute top-1/2 left-1/3">
          <Dice5 className="w-12 h-12 text-white/20" />
        </div>
        <div className="animate-float-delayed absolute bottom-1/3 right-1/4">
          <Dice6 className="w-16 h-16 text-white/20" />
        </div>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};
