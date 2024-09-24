import { Audio } from 'expo-av';

export async function playSound() {
    await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
    });

    const { sound } = await Audio.Sound.createAsync(require('../assets/audio.mp3'));
    await sound.playAsync();
}
