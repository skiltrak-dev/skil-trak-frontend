import { isBrowser } from 'utils/browser-supported'

// Store audio instances globally to manage playback
const audioInstances = new Map<string, HTMLAudioElement>()

export const playAudioSound = (audioPath: string): HTMLAudioElement | null => {
    if (isBrowser()) {
        // Stop any existing audio for this path
        stopAudioSound(audioPath)

        const audio = new Audio(audioPath)
        audioInstances.set(audioPath, audio)

        // Remove from instances when ended
        audio.addEventListener('ended', () => {
            audioInstances.delete(audioPath)
        })

        audio.play().catch((error) => {
            audioInstances.delete(audioPath)
        })

        return audio
    }
    return null
}

export const stopAudioSound = (audioPath: string): void => {
    if (isBrowser()) {
        const audio = audioInstances.get(audioPath)
        if (audio) {
            audio.pause()
            audio.currentTime = 0
            audioInstances.delete(audioPath)
        }
    }
}

export const pauseAudioSound = (audioPath: string): void => {
    if (isBrowser()) {
        const audio = audioInstances.get(audioPath)
        if (audio) {
            audio.pause()
        }
    }
}

export const resumeAudioSound = (audioPath: string): void => {
    if (isBrowser()) {
        const audio = audioInstances.get(audioPath)
        if (audio) {
            audio.play().catch((error) => {})
        }
    }
}

export const isAudioPlaying = (audioPath: string): boolean => {
    if (isBrowser()) {
        const audio = audioInstances.get(audioPath)
        return audio ? !audio.paused : false
    }
    return false
}

// Stop all audio instances
export const stopAllAudio = (): void => {
    if (isBrowser()) {
        audioInstances.forEach((audio) => {
            audio.pause()
            audio.currentTime = 0
        })
        audioInstances.clear()
    }
}
