import { useState } from 'react';

export const useModal = () => {
    const [showModal, setIsShowing] = useState(false);

    const toggle = () => setIsShowing(!showModal)

    return {
        showModal,
        toggle,
    }
}
