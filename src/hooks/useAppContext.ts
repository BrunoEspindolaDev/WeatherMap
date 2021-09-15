// Packages
import {useContext} from 'react';
import {Context} from 'context/app';

export default function useAppContext() {
  const appContext = useContext(Context);
  return appContext;
}
