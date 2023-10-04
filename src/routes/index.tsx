import { Title } from "solid-start"

import Container, { setOpen } from "~/components/Container"
export default function Home() {
  return (
    <main>
      <Title>SolidStart Tinymce</Title>
      <h1>Test TinyMCE!</h1>
      <Container />
      <button onClick={() => setOpen(true)}>Click to edit</button>
    </main>
  )
}
