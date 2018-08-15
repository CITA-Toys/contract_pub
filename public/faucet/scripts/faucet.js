var setAddress = function() {
  var input = document.getElementById('id-input-address')

  try {
    input.value = neuron.getAccount()
  } catch (err) {
    console.error(err)
  }
}

var init = function() {
  setAddress()
}

var main = function() {
  window.addEventListener('DOMContentLoaded', init)
}

main()
