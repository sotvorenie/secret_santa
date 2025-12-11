import { useSound } from '../composables/useSound'
const { play } = useSound()

export const soundDirective = {
    mounted(el, binding) {
        const sound = binding.value || 'click'
        const volume = binding.arg || 1

        el.addEventListener('click', () => play(sound, volume))

        if (binding.modifiers.hover) {
            el.addEventListener('mouseenter', () => play(sound, volume * 0.5))
        }
    }
}
