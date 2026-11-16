import {Component} from "vue";

export interface StepButon {
    text: string
    icon: Component
    iconSize: number
}

export interface Step {
    id: number
    text: () => string
    btn: StepButon
    onClick: () => void
}