import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/stores';

export function useTypedDispatch(): AppDispatch {
    return useDispatch<AppDispatch>();
}
