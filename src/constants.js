import { Howl } from 'howler'
import tone1 from "./assets/tones/tone1.mp3";
import tone2 from "./assets/tones/tone2.mp3";
import tone3 from "./assets/tones/tone3.mp3";
import tone4 from "./assets/tones/tone4.mp3";

export const howl1 = new Howl({
    src:tone1,
    preload: true
})

export const howl2 = new Howl({
    src:tone2,
    preload: true
})

export const howl3 = new Howl({
    src:tone3,
    preload: true
})

export const howl4 = new Howl({
    src:tone4,
    preload: true
})


export const cells = [
    'rgb(255,0,90)', 'rgb(255,205,60)', 'rgb(120,0,255)','seagreen'
  ]

export const info = {
    title:'Welcome!',
    body:'Memo Ring is a short term memory game based on the classic "Simon", but with a disorienting twist. The rules are simple: Watch and listen to the sequence of flashing colors and repeat them back in the order that they appear.',
}

export const stats = {
    title: 'Stats',
}

export const settings = {
    title: 'Settings',
}