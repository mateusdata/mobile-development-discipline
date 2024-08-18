import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { styleGradient } from '../style/styleGradient'

export const Gradient = () => {
    return <LinearGradient
        colors={[
            'hsla(205, 100%, 95%, 1)',
            'hsla(320, 100%, 99%, 1)',
            'hsla(3200, 100%, 97%, 1)',
            'hsla(205, 100%, 95%, 1)',
            'hsla(313, 100%, 98%, 1)'
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styleGradient.background}
    />
}