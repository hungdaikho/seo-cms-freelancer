"use client"
import ModalComponent from '@/components/ui/modal/modal'
import store from '@/stores/store'
import React from 'react'
import { Provider } from 'react-redux'

type Props = {
    children: React.ReactNode
}

const ReduxProvider = (props: Props) => {
    return (
        <Provider store={store}>
            <ModalComponent />
            {props.children}
        </Provider>
    )
}

export default ReduxProvider