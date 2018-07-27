var input = document.getElementById('id-input-address')

try {
  input.value = neuron.getAccount()
} catch (err) {
  console.error(err)
}