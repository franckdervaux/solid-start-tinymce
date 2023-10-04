import { createSignal, Show } from "solid-js"
import { SolidTinyMCE } from "./TinyMCE"

export const [open, setOpen] = createSignal(false)

const Container = () => {
    return (
        <Show when={open()}>
            <SolidTinyMCE
                width={300}
                height={300}
                top={150}
                left={150}
                content={"Test Content"}
                color={"white"}
                onEnter={(text: string) => console.log(text)}
                onEscape={() => setOpen(false)} />
        </Show>
    )
}

export default Container