import clickSnd from '../assets/sounds/click.mp3'
import clickSndTwo from '../assets/sounds/click2.mp3'
import cardSnd from '../assets/sounds/card.mp3'
import closeSnd from '../assets/sounds/close.mp3'
import applePay from '../assets/sounds/apple-pay.mp3'

const sounds = {
    click: clickSnd,
    click2: clickSndTwo,
    card: cardSnd,
    close: closeSnd,
    applePay: applePay,
}

const cache = {}

const load = (name) => {
    if (!cache[name]) {
        cache[name] = new Audio(sounds[name])
    }
    return cache[name]
}

const play = (name, volume = 1) => {
    try {
        const source = load(name)
        const clone = source.cloneNode()
        clone.volume = volume
        clone.currentTime = 0
        clone.play().catch(() => {})
        return clone
    } catch (e) {
        console.error('Sound error:', e)
    }
}

export const useSound = () => {
    return {
        play,
        click: (v = 0.4) => play('click', v),
        hover: (v = 0.2) => play('hover', v),
        success: (v = 0.5) => play('success', v),
        error: (v = 0.5) => play('error', v),
    }
}
