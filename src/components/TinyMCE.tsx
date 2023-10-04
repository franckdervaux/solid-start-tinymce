import 'tinymce'
import { onCleanup, onMount, Component } from "solid-js"
import 'tinymce/themes/silver'

// Any plugins you want to use has to be imported
import 'tinymce/plugins/emoticons'
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
    let initialized: boolean = false
    let color: string | undefined = undefined

    onMount(() => {
        if (initialized) {
            tinymce.activeEditor?.show()
            return
        }

        const dialogConfig = {
            title: 'Choose Background Color',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'colorpicker',
                        name: 'colorpicker',
                        label: 'choose a color'
                    }
                ]
            },
            buttons: [
                {
                    type: 'cancel',
                    name: 'closeButton',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'submitButton',
                    text: 'Set Color',
                    buttonType: 'primary'
                }
            ],
            initialData: {
                colorpicker: ''
            },
            onSubmit: (api: any) => {
                const data = api.getData()
                color = data.colorpicker
                document.getElementById('editor')!.style.background = data.colorpicker
                api.close()
            }
        }

        tinymce.init({
            target: targetRef,
            auto_focus: 'editor',
            setup: (editor) => {
                editor.on('init', (e) => {
                    initialized = true
                    editor.selection.select(editor.getBody(), true)
                })
                editor.on('keydown', (e) => {
                    if ((e.key === 'Enter') && !e.shiftKey) {
                        e.preventDefault()
                        props.onEnter(editor.getContent(), color)
                    }
                    if (e.key === 'Escape') props.onEscape()
                })
                editor.on('blur', (e) => {
                    props.onEnter(editor.getContent({ format: 'raw' }))
                })
                editor.ui.registry.addButton('backcolor-btn', {
                    icon: 'fill',
                    // @ts-ignore
                    onAction: () => editor.windowManager.open(dialogConfig)
                })

            },
            plugins: ["emoticons"],
            toolbar: "styles | bold italic  forecolor backcolor removeformat | fontfamily fontsize | emoticons | backcolor-btn",
            toolbar_mode: "wrap",
            width: 500,
            statusbar: false,
            menubar: false,
            inline: true,
            forced_root_block: 'div'
        })
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
                "background-color": `${props.color ?? 'white'}`,
                "z-index": 100,
                top: `${props.top}px`,
                left: `${props.left}px`,
                width: `${Math.max(props.width ?? 0, 300)}px`,
                height: `${Math.max(props.height ?? 0, 200)}px`,
            }} />
    )
}