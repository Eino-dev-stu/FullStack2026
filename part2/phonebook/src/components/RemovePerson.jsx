const RemoveForm = ({ id, remove }) => {
  return (
    <div>
      <button id="windowButton" onClick={() => remove(id)}>
        remove
      </button>
      <pre id="log"></pre>
    </div>
  )
}
export default RemoveForm
