import React from 'react'
import { useSelector } from 'react-redux';
import { decrement, increment, selectCount } from '../../store/post/counter.slice';
import { useAppDispatch } from '../../hooks/hooks';

function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useAppDispatch();

    const handleIncrement = () => {
        dispatch(increment())
    }
    const handleDecrement = () => {
        dispatch(decrement())
    }
    return (
        <div className='w-full flex flex-column justify-center items-center'>
            {
                count
            }
            <div className='border-2 my-4 w-1/5 p-4 flex items-center justify-evenly'>
                <button onClick={handleDecrement}>-</button>
                <button onClick={handleIncrement}>+</button>
            </div>
        </div>
    )
}

export default Counter