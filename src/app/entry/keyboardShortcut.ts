export const keyboardShortcut = () => {
  const allInput = Array.from(document.querySelectorAll("[data-key='tab']")) as [HTMLElement]
  allInput.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        if (allInput.length > index + 1) {
          allInput[index + 1].focus();
        }
      }
    })
  })
}
export const keyDownDataSelect = (event: React.KeyboardEvent<HTMLElement>) => {
  const target = event.target as HTMLElement
  const dataAttribute = target.dataset.item;
  if (dataAttribute) {
    const selectInput = document.querySelector(`[data-input='${dataAttribute}']`) as HTMLElement | null;
    if (selectInput && event.key === 'Enter') {
      setTimeout(() => {
        selectInput.focus();
      }, 100)
    }
  }
}
