export const cursor = async () => {
    const cursor = document.querySelector<HTMLElement>('.cursor')!
    let onElement: any

    const updateProperties = (elem: HTMLElement, state: any) => {
        elem?.style.setProperty('--x', `${state.x}px`)
        elem?.style.setProperty('--y', `${state.y}px`)
        elem?.style.setProperty('--width', `${state.width}px`)
        elem?.style.setProperty('--height', `${state.height}px`)
        elem?.style.setProperty('--radius', state.radius)
        elem?.style.setProperty('--scale', state.scale)
    }

    const createState = (e: any) => {
        const defaultState = {
            x: e.clientX,
            y: e.clientY,
            width: 30,
            height: 30,
            radius: '12px',
            scale: 1,
        }
        const computedState: any = {}

        if (onElement != null) {
            const { top, left, width, height } = onElement.getBoundingClientRect()
            const radius = window.getComputedStyle(onElement).borderTopLeftRadius

            computedState.x = left + width / 2
            computedState.y = top + height / 2
            computedState.width = width
            computedState.height = height
            computedState.radius = radius
        }
        return {
            ...defaultState,
            ...computedState,
        }
    }
    window.removeEventListener('mousemove', () => { })
    document.querySelectorAll('.btn').forEach((elem) => {
        elem.removeEventListener('mouseenter', () => { })
        elem.removeEventListener('mouseleave', () => { })
    })
    nextTick(() => {
        window.addEventListener('mousemove', (e) => {
            updateProperties(cursor, createState(e))
        })
        // class 有btn的,滑鼠移上去有效果
        document.querySelectorAll('.btn').forEach((elem) => {
            elem.addEventListener('mouseenter', () => (onElement = elem))
            elem.addEventListener('mouseleave', () => (onElement = undefined))
        })
    })
}