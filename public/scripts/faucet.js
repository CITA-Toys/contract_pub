var input = document.getElementById('id-input-address')

try {
  input.value = neuronAccount.getAccount()
} catch (err) {
  console.error(err)
}