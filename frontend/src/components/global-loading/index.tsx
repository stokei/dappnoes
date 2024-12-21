import { Loader } from 'lucide-react';

export const GlobalLoading = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Loader className='animate-spin' />
    </div>
  );
};
