import 'tinymce'
import { onCleanup, onMount, Component } from "solid-js"
import 'tinymce/icons/default/icons'
import 'tinymce/themes/silver/theme'
import 'tinymce/models/dom/model'

// Any plugins you want to use has to be imported
import { TinyMCE } from 'tinymce'

declare const tinymce: TinyMCE

export type TinyMCEProps = {
    onEnter: (text: string, color?: string) => void,
    onEscape: () => void,
    content: string | undefined,
    color?: string,
    top: number,
    left: number,
    width?: number,
    height?: number
}

export const SolidTinyMCE: Component<TinyMCEProps> = (props) => {
    let targetRef: HTMLDivElement

    onMount(() => {
        tinymce.init({
            target: targetRef,
            auto_focus: 'editor',
            content_css: false,
            skin: false,
            toolbar: "styles | bold italic  forecolor backcolor removeformat | fontfamily fontsize  ",
            toolbar_mode: "wrap",
            width: 500,
            statusbar: false,
            menubar: false,
            inline: true,
        })
        tinymce.activeEditor?.show()
    })

    onCleanup(() => {
        tinymce.remove()
    })

    return (
        <div ref={targetRef!}
            id="editor"
            innerHTML={props.content}
            style={{
                display: 'inline',
                position: 'absolute',
                "z-index": 100,
                top: `100px`,
                left: `100px`,
                width: `300px`,
                height: `300px`,
            }} />
    )
}