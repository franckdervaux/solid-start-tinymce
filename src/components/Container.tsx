import { createSignal, Show } from "solid-js"
import { SolidTinyMCE } from "./TinyMCE"

export const [open, setOpen] = createSignal(false)

const Container = () => {
    return (
        <Show when={open()}>
            <SolidTinyMCE
                width={300}
                height={300}
                content={"text to be edited"}
                top={150}
                left={150}
                color={"white"}
                onEnter={(text: string) => console.log(text)}
                onEscape={() => setOpen(false)} />
        </Show>
    )
}

export default Container